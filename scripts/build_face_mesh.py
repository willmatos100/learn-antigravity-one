"""
Will Matos — 3D Face Mesh Reconstruction
Usa MediaPipe Tasks API (0.10.x) para gerar um OBJ com:
  1. Face densa (amostragem de pontos ao longo das arestas do mesh)
  2. Crânio completo (elipsoide) para rotação 360°
Output: public/will_head.obj
"""

import sys
import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks.python import vision, BaseOptions
from mediapipe.tasks.python.vision import FaceLandmarker, FaceLandmarkerOptions
from mediapipe.tasks.python.vision.face_landmarker import FaceLandmarksConnections

IMAGE_PATH  = "public/profile.jpg"
MODEL_PATH  = "public/face_landmarker.task"
OUTPUT_PATH = "public/will_head.obj"

SCALE_XY    = 2.2
SCALE_Z     = 2.4   # Profundidade ampliada — evita aparência de máscara plana
EDGE_SAMPLES = 6    # Pontos extras amostrados por aresta

def main():
    # ── Carregar imagem ─────────────────────────────────────────
    img_bgr = cv2.imread(IMAGE_PATH)
    if img_bgr is None:
        print(f"ERRO: não encontrou {IMAGE_PATH}")
        sys.exit(1)

    h, w = img_bgr.shape[:2]
    print(f"Imagem: {w}×{h}px")

    # ── Inicializar FaceLandmarker (Tasks API) ──────────────────
    options = FaceLandmarkerOptions(
        base_options=BaseOptions(model_asset_path=MODEL_PATH),
        num_faces=1,
        output_face_blendshapes=False,
        output_facial_transformation_matrixes=False,
        running_mode=vision.RunningMode.IMAGE,
    )

    img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)

    with FaceLandmarker.create_from_options(options) as landmarker:
        result = landmarker.detect(mp_image)

    if not result.face_landmarks or len(result.face_landmarks) == 0:
        print("ERRO: nenhum rosto detectado em profile.jpg")
        sys.exit(1)

    lms = result.face_landmarks[0]
    print(f"Landmarks detectados: {len(lms)}")

    # ── Converter para coordenadas 3D centradas ─────────────────
    def to3d(lm):
        return np.array([
             (lm.x - 0.5) * SCALE_XY,
            -(lm.y - 0.5) * SCALE_XY,
            -lm.z * SCALE_Z,
        ])

    face_pts = np.array([to3d(lm) for lm in lms])  # (478, 3)

    # ── Amostrar pontos densos ao longo das arestas do mesh ─────
    tesselation = FaceLandmarksConnections.FACE_LANDMARKS_TESSELATION
    extra = []
    rng = np.random.default_rng(42)

    for conn in tesselation:
        p1 = face_pts[conn.start]
        p2 = face_pts[conn.end]
        for t in np.linspace(0.1, 0.9, EDGE_SAMPLES):
            pt = p1 * (1 - t) + p2 * t
            noise = rng.normal(0, [0.005, 0.005, 0.002])
            extra.append(pt + noise)

    extra = np.array(extra)
    face_all = np.vstack([face_pts, extra])
    print(f"Pontos face (landmarks + arestas): {len(face_all)}")

    # ── Calcular bounding box para crânio ───────────────────────
    mn = face_all.min(axis=0)
    mx = face_all.max(axis=0)
    fw = mx[0] - mn[0]   # largura
    fh = mx[1] - mn[1]   # altura

    # Centro do crânio (ligeiramente acima do centro da face)
    cx = (mn[0] + mx[0]) / 2
    cy = (mn[1] + mx[1]) / 2 + fh * 0.06
    cz = (mn[2] + mx[2]) / 2

    # Raios do elipsoide (proporções humanas)
    rx = fw * 0.54
    ry = fh * 0.52
    rz = fw * 0.72   # profundidade ~72% da largura

    front_cutoff = mx[2] - rz * 0.18

    # ── Gerar crânio como superfície elipsoide ──────────────────
    skull = []
    rng2 = np.random.default_rng(7)
    target, attempts = 4000, 0

    while len(skull) < target and attempts < 300_000:
        v = rng2.standard_normal(3)
        v /= np.linalg.norm(v)
        pt = np.array([cx + rx*v[0], cy + ry*v[1], cz + rz*v[2]])

        if pt[2] > front_cutoff:
            attempts += 1
            continue

        noise = rng2.normal(0, [0.012, 0.012, 0.007])
        skull.append(pt + noise)
        attempts += 1

    skull = np.array(skull)
    print(f"Pontos crânio (costas/lados): {len(skull)}")

    # ── Exportar OBJ ────────────────────────────────────────────
    all_pts = np.vstack([face_all, skull])
    print(f"Total de vértices: {len(all_pts)}")

    with open(OUTPUT_PATH, "w") as f:
        f.write("# Will Matos — 3D Face Reconstruction\n")
        f.write(f"# vertices: {len(all_pts)}\n")
        for (x, y, z) in all_pts:
            f.write(f"v {x:.6f} {y:.6f} {z:.6f}\n")

    print(f"✓ Exportado: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
