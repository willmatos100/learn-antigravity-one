import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Scroll 
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});

let scrollObj = { current: 0, target: 0, last: 0, velocity: 0 };

lenis.on('scroll', (e) => {
  scrollObj.target = window.scrollY;
  scrollObj.velocity = e.velocity;
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Fade Up animations natively synced with Lenis
const fadeElements = document.querySelectorAll('.fade-up');
fadeElements.forEach(el => {
  gsap.fromTo(el, 
    { y: 60, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    }
  );
});


// 2. WebGL Curtain distortions with THREE.js

// Setup Canvas spanning full viewport exactly
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// We use an Orthographic camera or perspective mapped 1:1. 
// Perspective mapped 1:1 to CSS pixels:
let fov = 2 * Math.atan((window.innerHeight / 2) / 600) * (180 / Math.PI);
const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 10, 2000);
camera.position.z = 600;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Load all images with opacity: 0
const domImages = [...document.querySelectorAll('.webgl-img')];
const textureLoader = new THREE.TextureLoader();

// Custom Shader for "Cloth Tear / Twist" on scroll
const vertexShader = `
uniform float uScrollVelocity;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 pos = position;

  // Deformation based on scroll velocity ("Cloth/Curtain" effect)
  // Distance from center of image height
  float distanceFromCenter = uv.y - 0.5;
  
  // Parabola bend + Sine wave twist
  pos.y += sin(uv.x * 3.1415 + uScrollVelocity * 0.05) * uScrollVelocity * 0.8;
  pos.z += sin(uv.x * 3.1415) * uScrollVelocity * 1.5 * distanceFromCenter;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
varying vec2 vUv;
void main() {
  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = color;
}
`;

// Creates plane meshes for every DOM image
const imagePlanes = [];

domImages.forEach(img => {
  let bounds = img.getBoundingClientRect();
  
  // Create plane with plenty of segments to allow smooth curving/bending
  const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 32, 32);
  
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTexture: { value: null }, // loaded later
      uScrollVelocity: { value: 0 }
    },
    transparent: true,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  textureLoader.load(img.src, (texture) => {
    // Basic COVER logic via UV mapping could go here if sizes don't match exactly.
    // For simplicity, we assume aspect ratios match the CSS.
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    material.uniforms.uTexture.value = texture;
  });

  imagePlanes.push({ img, mesh });
});

// Update function syncs Three.js meshes with DOM rects
function renderWebGL() {
  // Smooth scroll interpolation logic for velocity
  scrollObj.current += (scrollObj.target - scrollObj.current) * 0.1;
  const currentVelocity = scrollObj.target - scrollObj.current;

  imagePlanes.forEach(({ img, mesh }) => {
    const { top, left, width, height } = img.getBoundingClientRect();
    
    // Resize geometry if window resizes (lazy way, better to just update uniform scale on resize, but fine here)
    mesh.scale.x = width / mesh.geometry.parameters.width;
    mesh.scale.y = height / mesh.geometry.parameters.height;

    // Position mapping: WebGL origin is center screen. DOM origin is top-left.
    const x = left - (window.innerWidth / 2) + (width / 2);
    // Y is inverted in WebGL
    const y = -top + (window.innerHeight / 2) - (height / 2);

    mesh.position.set(x, y, 0);

    // Apply scroll distortion to Shader! 
    // Damping current velocity so it smooths out.
    mesh.material.uniforms.uScrollVelocity.value = currentVelocity; 
  });

  renderer.render(scene, camera);
  requestAnimationFrame(renderWebGL);
}
requestAnimationFrame(renderWebGL);

// Handle Resize
window.addEventListener('resize', () => {
  fov = 2 * Math.atan((window.innerHeight / 2) / 600) * (180 / Math.PI);
  camera.fov = fov;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
