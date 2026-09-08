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

const aboutPills = document.querySelector('.about-copy .pill-row');
aboutPills?.remove();

document.querySelectorAll('.contact-group-label').forEach(label => label.remove());

const responsiveRefinements = document.createElement('style');
responsiveRefinements.textContent = `
.contact-methods{margin-top:24px}
@media (max-width:620px){
  .project-card{display:block !important}
  .project-content{min-height:0 !important;padding:26px 24px 28px !important}
  .project-content .project-art{
    min-height:0 !important;
    height:auto !important;
    padding:0 !important;
    margin:14px 0 18px !important;
    display:flex !important;
    justify-content:flex-start !important;
    align-items:center !important;
    background:none !important;
    overflow:visible !important;
  }
  .project-content .project-art::before{display:none !important}
  .project-content .project-art span{
    width:118px !important;
    max-width:34vw !important;
    box-shadow:0 0 18px rgba(24,168,255,.18) !important;
  }
  .project-content p{margin-top:0 !important}
  .contact-methods{
    margin-top:28px;
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    width:100%;
    gap:8px;
  }
  .contact-methods .social-card{
    width:100% !important;
    min-width:0;
    min-height:50px;
    padding:0 8px;
    gap:7px;
    justify-content:center;
  }
  .contact-methods .social-card i{width:auto;font-size:1.05rem}
  .contact-methods .social-card strong{font-size:clamp(.68rem,3vw,.82rem);white-space:nowrap}
}
`;
document.head.appendChild(responsiveRefinements);

const projectCards = [...document.querySelectorAll('.project-card')].map(card => {
  const content = card.querySelector('.project-content');
  const art = card.querySelector('.project-art');
  const title = content?.querySelector('h3');
  return { card, content, art, title };
});

const placeProjectArtwork = () => {
  const mobile = window.matchMedia('(max-width:620px)').matches;
  projectCards.forEach(({ card, content, art, title }) => {
    if (!content || !art || !title) return;
    if (mobile) {
      if (art.parentElement !== content) title.insertAdjacentElement('afterend', art);
    } else if (art.parentElement !== card) {
      card.appendChild(art);
    }
  });
};
placeProjectArtwork();
window.addEventListener('resize', placeProjectArtwork, { passive: true });

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
      const visual = `<div style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;overflow:hidden;color:#f5f8fb;background:#05090d"><div style="position:absolute;inset:0;background-image:linear-gradient(rgba(3,8,12,.72),rgba(3,8,12,.78)),url('assets/about/logo_electromecanikos.es.jpg');background-size:cover;background-position:center;filter:saturate(.85) contrast(1.05);transform:scale(1.02)"></div><div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(24,168,255,.08),rgba(3,8,12,.34) 72%)"></div><div style="position:relative;z-index:1;font:700 2.15rem 'Space Grotesk',sans-serif;letter-spacing:-.04em;text-shadow:0 2px 18px rgba(0,0,0,.95)">ELECTROMECÁNIKOS</div><div style="position:relative;z-index:1;font-size:.72rem;letter-spacing:.18em;color:#5cc8ff;text-shadow:0 2px 12px rgba(0,0,0,.95)">BY MIKETRONIC</div></div>`;
      return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb article-thumb">${visual}</div></a><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description ? `<p>${description}</p>` : ''}<a class="electromecanikos-more" href="${moreUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-bolt"></i> Ver más en Electromecánikos</a></div></article>`;
    }

    const title = escapeHtml(item.title || 'Contenido destacado');
    const description = escapeHtml(item.description || '');
    const image = item.image ? `<img src="${escapeHtml(item.image)}" alt="${title}" loading="lazy">` : `<div style="width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at 50% 45%,rgba(24,168,255,.12),rgba(5,9,13,.98) 68%);color:#547184;font-size:.72rem;letter-spacing:.12em">CONTENIDO</div>`;
    return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb article-thumb">${image}</div></a><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description ? `<p>${description}</p>` : ''}<a class="electromecanikos-more" href="${url}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-right"></i> Ver contenido</a></div></article>`;
  }).join('');

  document.querySelectorAll('.content-grid .reveal').forEach(el => observer.observe(el));
}
