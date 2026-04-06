import * as THREE from 'three'
import gsap from 'gsap'

export function initHolographicHead() {
  const canvas = document.getElementById('holo-canvas')
  if (!canvas) return

  const container = canvas.parentElement

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.01, 100)
  camera.position.z = 2.2

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const setSize = () => {
    renderer.setSize(container.clientWidth, container.clientHeight)
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
  }
  setSize()

  const mouse = { x: 0, y: 0 }
  const targetRot = { x: 0, y: 0 }
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  })

  const headGroup = new THREE.Group()
  scene.add(headGroup)

  fetch(`${import.meta.env.BASE_URL}will_head.obj`)
    .then(r => r.text())
    .then(text => {
      const raw = []
      for (const line of text.split('\n')) {
        if (!line.startsWith('v ')) continue
        const p = line.trim().split(/\s+/)
        raw.push(parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3]))
      }
      if (raw.length === 0) return

      // Compute center and Z range
      let minZ = Infinity, maxZ = -Infinity
      let minX = Infinity, maxX = -Infinity
      let minY = Infinity, maxY = -Infinity
      for (let i = 0; i < raw.length; i += 3) {
        if (raw[i]   < minX) minX = raw[i];   if (raw[i]   > maxX) maxX = raw[i]
        if (raw[i+1] < minY) minY = raw[i+1]; if (raw[i+1] > maxY) maxY = raw[i+1]
        if (raw[i+2] < minZ) minZ = raw[i+2]; if (raw[i+2] > maxZ) maxZ = raw[i+2]
      }
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      const cz = (minZ + maxZ) / 2
      const zRange = maxZ - minZ
      const zCutoff = cz - zRange * 0.18  // discard back-of-head

      const totalVerts = raw.length / 3
      // ~4000 points — sparse and luminous
      const step = Math.max(1, Math.floor(totalVerts / 4000))

      const positions = []
      const colors    = []

      for (let i = 0; i < totalVerts; i += step) {
        const idx = i * 3
        if (raw[idx+2] < zCutoff) continue

        positions.push(raw[idx] - cx, raw[idx+1] - cy, raw[idx+2] - cz)

        // Verde limão: R=0.8, G=1.0, B=0.0 com variação
        const g = 0.85 + Math.random() * 0.15
        const r = 0.55 + Math.random() * 0.25
        colors.push(r, g, 0)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color',    new THREE.Float32BufferAttribute(colors,    3))

      const material = new THREE.PointsMaterial({
        size:            0.007,
        vertexColors:    true,
        transparent:     true,
        opacity:         0,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
        sizeAttenuation: true,
      })

      const points = new THREE.Points(geometry, material)
      headGroup.add(points)

      gsap.to(material, { opacity: 1, duration: 2.5, ease: 'power2.out', delay: 0.2 })
      gsap.from(headGroup.scale, {
        x: 0.01, y: 0.01, z: 0.01,
        duration: 2.2,
        ease: 'elastic.out(1, 0.55)',
        delay: 0.2,
      })

      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.65) {
          gsap.to(material, {
            opacity:    0.3,
            duration:   0.04,
            yoyo:       true,
            repeat:     Math.floor(Math.random() * 4) + 1,
            ease:       'none',
            onComplete: () => { material.opacity = 1 },
          })
        }
      }, 3500)

      window.addEventListener('beforeunload', () => clearInterval(glitchInterval))
    })
    .catch(err => console.warn('WILL.EXE: OBJ load failed —', err))

  const clock = new THREE.Clock()
  const tick = () => {
    const elapsed = clock.getElapsedTime()
    targetRot.x += (mouse.y * 0.42 - targetRot.x) * 0.04
    targetRot.y += (mouse.x * 0.65 - targetRot.y) * 0.04
    headGroup.rotation.x = targetRot.x
    headGroup.rotation.y = targetRot.y
    headGroup.position.y = Math.sin(elapsed * 0.75) * 0.045
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  tick()

  window.addEventListener('resize', setSize)
}
