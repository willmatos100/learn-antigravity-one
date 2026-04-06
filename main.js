import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initHolographicHead } from './holographic-head.js';
import { initNeuralChat } from './neural-chat.js';

gsap.registerPlugin(ScrollTrigger);

/* ==============================================================
   1. LENIS SMOOTH SCROLL (AWWWARDS STANDARD)
============================================================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Tie GSAP to Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

/* ==============================================================
   2. MAGNETIC CURSOR & BLEND MODE
============================================================== */
const cursor = document.getElementById("magnetic-cursor");
let cursorXTo = gsap.quickTo(cursor, "x", {duration: 0.3, ease: "power3"});
let cursorYTo = gsap.quickTo(cursor, "y", {duration: 0.3, ease: "power3"});

window.addEventListener("mousemove", (e) => {
  cursorXTo(e.clientX);
  cursorYTo(e.clientY);
});

// Magnetic Elements Logic
const magneticItems = document.querySelectorAll('.magnetic');
magneticItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const hx = rect.left + rect.width / 2;
    const hy = rect.top + rect.height / 2;
    
    // Calculate distance from center to mouse
    const tx = (e.clientX - hx) * 0.3; // 30% pull
    const ty = (e.clientY - hy) * 0.3;
    
    gsap.to(item, {x: tx, y: ty, duration: 0.4, ease: "power3.out"});
    cursor.classList.add('active'); // Expand cursor
  });
  
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)"});
    cursor.classList.remove('active');
  });
});

/* ==============================================================
   3. KINETIC TYPOGRAPHY (SPLIT TEXT)
============================================================== */
// Simple DIY split word logic
const splitTargets = document.querySelectorAll('.split-text');
splitTargets.forEach(target => {
  const text = target.innerText;
  target.innerHTML = '';
  // Split by line breaks and words
  const words = text.split(' ');
  words.forEach(word => {
    if(word === '') return;
    const wordWrap = document.createElement('span');
    wordWrap.style.display = 'inline-block';
    wordWrap.style.overflow = 'hidden';
    wordWrap.style.verticalAlign = 'bottom';
    wordWrap.style.lineHeight = '1';
    wordWrap.style.paddingRight = '0.02em'; // space replacement
    
    const wordInner = document.createElement('span');
    wordInner.innerText = word + '\u00A0';
    wordInner.style.display = 'inline-block';
    wordWrap.appendChild(wordInner);
    target.appendChild(wordWrap);
  });
});

// Animate them on scroll
gsap.utils.toArray('.split-text').forEach(target => {
  const letters = target.querySelectorAll('span > span');
  gsap.fromTo(letters, 
    { y: '100%', rotateZ: 5 },
    { 
      y: '0%', rotateZ: 0,
      duration: 1.4, stagger: 0.05,
      ease: "power4.out",
      scrollTrigger: {
        trigger: target,
        start: "top 85%"
      }
    }
  );
});

// General Fade Ups
gsap.utils.toArray('.fade-up-item').forEach(element => {
  gsap.fromTo(element, 
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1, 
      duration: 1.2, 
      ease: 'expo.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%'
      }
    }
  );
});

/* ==============================================================
   4. SCROLL VIDEO SCRUB & FADE (Chrome Fix via Blob)
============================================================== */
const scrubVideo = document.getElementById('hero-video');
if (scrubVideo) {
  fetch(scrubVideo.getAttribute('src'))
    .then(r => r.blob())
    .then(blob => {
      scrubVideo.src = URL.createObjectURL(blob);
      scrubVideo.load();
      scrubVideo.addEventListener('loadedmetadata', function() {
        gsap.to(scrubVideo, {
          currentTime: scrubVideo.duration || 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".mega-hero",
            start: "top top",
            endTrigger: "#testimonial",
            end: "bottom top", 
            scrub: 1
          }
        });
      });
    })
    .catch(err => console.error("Hero Blob fetch failed:", err));
}

// Fade out fixed video smoothly over the Testimonial text
gsap.to('#hero-media-fixed', {
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: "#testimonial",
    start: "top 70%", // Start fading when Testimonial is 70% from top
    end: "bottom top", // Full fadeout when Testimonial leaves top
    scrub: true
  }
});

/* ==============================================================
   5. INTERACTIVE MOUSE-DRIVEN MARQUEE
============================================================== */
const marqueeContainer = document.querySelector('.marquee-container');
const skillTrack = document.getElementById('skill-track');

if(skillTrack && marqueeContainer) {
  let marqueeProgress = 0;
  let isHovering = false;
  let interactiveSpeed = 0;
  
  marqueeContainer.addEventListener('mouseenter', () => isHovering = true);
  marqueeContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    interactiveSpeed = 0;
  });
  
  marqueeContainer.addEventListener('mousemove', (e) => {
    // Normalizing mouse X coordinate to a -1 to +1 scale relative to center
    const center = window.innerWidth / 2;
    const delta = (e.clientX - center) / center; 
    // Set max scrub speed when hovering at pure edge (1.2 units, much slower)
    interactiveSpeed = delta * 1.2; 
  });

  function renderMarquee() {
    if (isHovering) {
      // Move left continuously if mouse right; Move right continuously if mouse left
      marqueeProgress -= interactiveSpeed;
    } else {
      // Steady auto-scroll, ignoring general window scroll
      marqueeProgress -= 0.08;
    }
    
    // Infinite Seamless Looping calculations
    if(marqueeProgress <= -50) { marqueeProgress += 50; }
    if(marqueeProgress > 0) { marqueeProgress -= 50; }
    
    gsap.set(skillTrack, {xPercent: marqueeProgress});
    requestAnimationFrame(renderMarquee);
  }
  renderMarquee();
}

/* ==============================================================
   6. THREE.JS WEBGL BACKGROUND (TIMELINE CYBER PARTICLES)
============================================================== */
const canvas = document.getElementById('webgl-canvas');
if(canvas) {
  const scene = new THREE.Scene();
  // Using an orthographic or perspective camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCnt = 1000;
  const posArray = new Float32Array(particlesCnt * 3);
  
  for(let i=0; i<particlesCnt*3; i++){
    // Spread them widely
    posArray[i] = (Math.random() - 0.5) * 500;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.8,
    color: 0xCCFF00, /* Verde Limão */
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Render Loop
  const clock = new THREE.Clock();
  
  function tick() {
    const elapsedTime = clock.getElapsedTime();
    
    // Very slow base idle movement
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();

  // GSAP Sync: When in Timeline section, explode particles via scale
  gsap.to(particlesMesh.scale, {
    x: 2.5, y: 2.5, z: 2.5,
    ease: "none",
    scrollTrigger: {
      trigger: "#experience",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });
  
  // Parallax Nodes mapping
  gsap.utils.toArray('.parallax-node').forEach(node => {
     gsap.to(node, {
       y: -100, // Move 100px up during scroll span (parallax)
       ease: "none",
       scrollTrigger: {
         trigger: node,
         start: "top bottom",
         end: "bottom top",
         scrub: true
       }
     });
  });
}

/* ==============================================================
   7. NEURAL INTERFACE (Holographic Head + Chat)
============================================================== */
/* ==============================================================
   6.8 STELLAR NAVIGATION SCRUB (Chrome Fix via Blob)
============================================================== */
const stellarVideo = document.getElementById('stellar-video');
if (stellarVideo) {
  fetch(stellarVideo.getAttribute('src'))
    .then(r => r.blob())
    .then(blob => {
      stellarVideo.src = URL.createObjectURL(blob);
      stellarVideo.load();
      stellarVideo.addEventListener('loadedmetadata', () => {
        gsap.to(stellarVideo, {
          currentTime: stellarVideo.duration || 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '#stellar-nav',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5
          }
        });
      });
    })
    .catch(err => console.error("Stellar Blob fetch failed:", err));
}

// LIME BG: Fade in when entering hard-skills
gsap.fromTo('#lime-bg-layer', 
  { opacity: 0 },
  {
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hard-skills',
      start: 'top bottom',
      end: 'top 20%',
      scrub: true
    }
  }
);

// LIME BG: Fade out when leaving soft-skills
gsap.fromTo('#lime-bg-layer', 
  { opacity: 1 },
  {
    opacity: 0,
    immediateRender: false,
    ease: 'none',
    scrollTrigger: {
      trigger: '#soft-skills',
      start: 'bottom 80%',
      end: 'bottom top',
      scrub: true
    }
  }
);

// Stagger-reveal skill tags
gsap.utils.toArray('.tag-cloud, .course-grid').forEach(cloud => {
  const tags = cloud.querySelectorAll('.skill-tag, .course-tag');
  gsap.fromTo(tags,
    { opacity: 0, y: 20, scale: 0.85 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.5,
      stagger: 0.04,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: cloud,
        start: 'top 80%'
      }
    }
  );
});

initHolographicHead();
initNeuralChat();

// Solid Header logic
ScrollTrigger.create({
  trigger: "#testimonial",
  start: "top 80px",
  onEnter: () => document.querySelector(".os-header").classList.add("scrolled"),
  onLeaveBack: () => document.querySelector(".os-header").classList.remove("scrolled")
});

/* ==============================================================
   7. THEME TOGGLE (LIGHT / DARK)
============================================================== */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Switch Text to fit context
    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerText = 'SYS.DARK()';
    } else {
      themeToggle.innerText = 'SYS.LIGHT()';
    }
  });
}
