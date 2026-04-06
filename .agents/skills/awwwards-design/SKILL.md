---
name: awwwards-design
description: O manual de técnicas de desenvolvimento High-End utilizadas nos sites "Site of the Day" no Awwwards. Utilize esta skill sempre que o usuário solicitar design de alto nível, UX premium, interações magnéticas, GSAP, WebGL ou animações baseadas no scroll (Scrollytelling).
---

# 🏆 Arsenal Awwwards: Guia de Desenvolvimento de UX Premium

Como IA, quando o usuário solicitar um projeto web de alta classe ("nível Awwwards"), não basta saber os conceitos. Você deve saber **como** executá-los no código. Abaixo está o manual prático e os snippets essenciais para instanciar a "magia".

## Dependências Universais
Sempre inicie o projeto garantindo que o ecosistema de fluidez está instalado. Instale via terminal:
```bash
npm install gsap lenis three
```

---

## 1. Smooth Scroll Base (Lenis.js)
Nunca deixe uma página rodar no scroll bruto do OS. O Lenis cria a "fricção" perfeita.
No arquivo JS de entrada (ex: `main.js`), instancie imediatamente:

```javascript
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Instanciando Inércia de Roda
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
```

---

## 2. Video/Canvas Scrubbing (Scrollytelling)
A principal técnica para contar histórias. O vídeo não dá play no tempo, ele avança através do scroll.
*Requisito: O vídeo precisa estar com `playsinline` e `muted`.*

```javascript
const scrubVideo = document.getElementById('hero-video');
if (scrubVideo) {
  scrubVideo.addEventListener('loadedmetadata', function() {
    gsap.to(scrubVideo, {
      currentTime: scrubVideo.duration, // Mapeia X tempo do video..
      ease: "none", // Sempre none para scroll!
      scrollTrigger: {
        trigger: ".hero-scrub-section", // Para a sessão inteira do container
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // Adiciona 1 segundo de smoothing (Awwwards feel)
      }
    });
  });
  scrubVideo.load();
}
```

---

## 3. Cursor Customizado "Magnético" & Blend Mode
Esconda o cursor nativamente via CSS (`* { cursor: none; }`).
Crie uma bola customizada (ex: `<div class="cursor"></div>`).
A mágica da Física (Spring / QuickTo) precisa do GSAP para não gerar atrasos ruins.

```javascript
// Acompanhamento ultra rápido do cursor
const cursor = document.querySelector(".cursor");
let xTo = gsap.quickTo(cursor, "x", {duration: 0.2, ease: "power3"});
let yTo = gsap.quickTo(cursor, "y", {duration: 0.2, ease: "power3"});

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```
**Estilo CSS Opcional para Inverter Cores:**
```css
.cursor {
  position: fixed; top: 0; left: 0; width: 20px; height: 20px;
  background: white; border-radius: 50%; pointer-events: none;
  transform: translate(-50%, -50%); z-index: 9999;
  mix-blend-mode: difference; /* Inverte baseado no pixel de baixo */
}
```

---

## 4. Animações de Entrada (Fade Up Taggering)
Nunca revele elementos ao carregar. Revele-os enquanto chegam ao seu viewport.

```javascript
// Stagger (cascata) em múltiplos elementos
gsap.utils.toArray('.fade-up').forEach(element => {
  gsap.fromTo(element, 
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1, 
      duration: 1.2, 
      ease: 'expo.out', // Fim demorado que "suaviza" o pouso
      scrollTrigger: {
        trigger: element,
        start: 'top 85%' // Dispara quando elemento passa por 85% da tela
      }
    }
  );
});
```

---

## Regras de Desempenho e Qualidade
1. **Nunca use CSS `transition` se puder usar GSAP:** GSAP é otimizado via matemática para `requestAnimationFrame`, diferente das transitions perdidas do CSS que causam repaint engasgado.
2. **Só use `transform` e `opacity`:** Nunca anime propriedades layout (`width`, `margin`, `top`, `bottom`). Isso recalcula a geometria da tela. Utilize sempre translações na GPU (`translateX/Y/Z`) ou matriz geométrica 3D (`Three.js`).
3. Ao construir shaders 3D em Three.js, evite loops massivos (`for/while`) na função de Render `requestAnimationFrame`, delegando cálculos pesados em uniformes no GLSL.
