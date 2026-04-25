// CS 506 · Week 3 Starter · Lightbox
// A small image-overlay feature, ~40 lines of vanilla JavaScript.
// Four concepts on display: DOM, events, state, security.

// ── DOM refs (cached once at load time) ─────────────────────────────────
const lb       = document.querySelector('.lightbox');
const lbImg    = lb.querySelector('.lightbox__img');
const lbCap    = lb.querySelector('.lightbox__caption');
const thumbs   = document.querySelectorAll('.gallery__thumb');

// ── State ───────────────────────────────────────────────────────────────
const state = {
  isOpen: false,
  index: 0,
  images: [
    { src: 'images/liamnjoee.jpg', caption: 'My wife Joee and I when we got engaged in the UK.' },
    { src: 'images/liamdad.jpg', caption: 'One of the happiest moments of my life, holding my first born son.' },
    { src: 'images/jacknliam.jpg', caption: 'Our dog Jack, a black lab we rescued.' },
    { src: 'images/travel.jpg', caption: 'My wife and I traveling on the Italian Coast.' },
  ],
};

// ── Mutators ────────────────────────────────────────────────────────────
function openLightbox(i) {
  state.isOpen = true;
  state.index = i;
  render();
}

function closeLightbox() {
  state.isOpen = false;
  render();
}

// ── Render (state → DOM) ────────────────────────────────────────────────
function render() {
  if (state.isOpen) {
    const { src, caption } = state.images[state.index];
    lbImg.setAttribute('src', src);
    lbCap.textContent = caption;
    lb.classList.add('open');
  } else {
    lb.classList.remove('open');
  }
}

// ── Event listeners ─────────────────────────────────────────────────────
thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => openLightbox(i));
});

lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.isOpen) closeLightbox();
});
