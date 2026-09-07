const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => backToTop?.classList.toggle('visible', window.scrollY > 500);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const carousel = document.querySelector('.about-carousel');
if (carousel) {
  const allSlides = [...carousel.querySelectorAll('.carousel-slide')];
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let validSlides = [];
  let currentIndex = 0;
  let checkedImages = 0;
  let autoTimer;

  const showSlide = (index, restart = false) => {
    if (!validSlides.length) return;
    currentIndex = (index + validSlides.length) % validSlides.length;
    validSlides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    if (restart) startAuto();
  };

  const startAuto = () => {
    clearInterval(autoTimer);
    if (validSlides.length > 1) autoTimer = setInterval(() => showSlide(currentIndex + 1), 5500);
  };

  const finishSetup = () => {
    if (checkedImages < allSlides.length) return;
    validSlides = allSlides.filter(slide => !slide.classList.contains('image-missing'));
    allSlides.forEach(slide => slide.classList.remove('active'));
    dotsWrap.innerHTML = '';
    if (!validSlides.length) {
      carousel.classList.add('no-images');
      return;
    }
    carousel.classList.remove('no-images');
    validSlides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Ver foto ${index + 1}`);
      dot.addEventListener('click', () => showSlide(index, true));
      dotsWrap.appendChild(dot);
    });
    showSlide(0);
    startAuto();
  };

  prevButton?.addEventListener('click', () => showSlide(currentIndex - 1, true));
  nextButton?.addEventListener('click', () => showSlide(currentIndex + 1, true));

  allSlides.forEach(slide => {
    const image = slide.querySelector('img');
    const markChecked = missing => {
      if (slide.dataset.checked) return;
      slide.dataset.checked = 'true';
      if (missing) slide.classList.add('image-missing');
      checkedImages += 1;
      finishSetup();
    };
    if (image.complete) markChecked(!image.naturalWidth);
    else {
      image.addEventListener('load', () => markChecked(false), { once: true });
      image.addEventListener('error', () => markChecked(true), { once: true });
    }
  });
}

const contentGrid = document.querySelector('.content-grid');
if (contentGrid && Array.isArray(window.MIKETRONIC_CONTENT)) {
  const getYouTubeId = (url = '') => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/i);
    return match ? match[1] : '';
  };

  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  contentGrid.innerHTML = window.MIKETRONIC_CONTENT.slice(0, 3).map((item, index) => {
    const delay = index === 1 ? ' delay-1' : index === 2 ? ' delay-2' : '';
    const tag = escapeHtml(item.tag || 'CONTENIDO');
    const url = escapeHtml(item.url || '#');

    if (item.type === 'youtube') {
      const title = escapeHtml(item.title || 'Vídeo destacado de Miketronic');
      const description = escapeHtml(item.description || '');
      const videoId = getYouTubeId(item.url);
      const embed = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
      const channelUrl = escapeHtml(item.channelUrl || item.url || '#');
      return `<article class="content-card reveal${delay}"><div class="content-thumb youtube-thumb">${embed ? `<iframe src="${embed}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` : 'AQUÍ VÍDEO'}</div><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description ? `<p>${description}</p>` : ''}<a class="youtube-more" href="${channelUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i> Ver más en YouTube</a></div></article>`;
    }

    if (item.type === 'electromecanikos') {
      const title = escapeHtml(item.title || 'Mis entradas en Electromecánikos');
      const description = escapeHtml(item.description || '');
      const moreUrl = escapeHtml(item.moreUrl || item.url || 'https://www.electromecanikos.es/search/label/Miketronic');
      const visual = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:radial-gradient(circle at 50% 45%,rgba(24,168,255,.22),rgba(5,9,13,.98) 62%);color:#f5f8fb"><div style="font:700 2.15rem 'Space Grotesk',sans-serif;letter-spacing:-.04em">ELECTROMECÁNIKOS</div><div style="font-size:.72rem;letter-spacing:.18em;color:#5cc8ff">BY MIKETRONIC</div></div>`;
      return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb article-thumb">${visual}</div></a><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description ? `<p>${description}</p>` : ''}<a class="electromecanikos-more" href="${moreUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-bolt"></i> Ver más en Electromecánikos</a></div></article>`;
    }

    const title = escapeHtml(item.title || 'Contenido destacado');
    const description = escapeHtml(item.description || '');
    const image = item.image ? `<img src="${escapeHtml(item.image)}" alt="${title}" loading="lazy">` : 'AQUÍ IMAGEN';
    return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb">${image}</div><div><span class="content-tag">${tag}</span><h3>${title}</h3>${description ? `<p>${description}</p>` : ''}<span class="text-link">Ver contenido →</span></div></a></article>`;
  }).join('');

  document.querySelectorAll('.content-grid .reveal').forEach(el => observer.observe(el));
}
