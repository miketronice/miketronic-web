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

const heroStats = document.querySelectorAll('.hero-stats > div span');
if (heroStats.length >= 3) {
  heroStats[0].textContent = 'Años de experiencia';
  heroStats[1].textContent = 'Soluciones profesionales';
  heroStats[2].textContent = 'Mejora de servicios continua';
}

const aboutPills = document.querySelector('.about-copy .pill-row');
aboutPills?.remove();

document.querySelectorAll('.contact-group-label').forEach(label => label.remove());

const responsiveRefinements = document.createElement('style');
responsiveRefinements.textContent = `
.contact-methods{margin-top:24px}
@media (max-width:620px){
  .hero-copy,.about-copy,.section-heading,.contact-wrap>div:first-child,.content-card .youtube-card-body{
    text-align:center !important;
  }
  .hero-actions{justify-content:center !important}
  .hero-stats{
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:6px !important;
    align-items:stretch !important;
  }
  .hero-stats div{
    padding:0 5px !important;
    min-width:0 !important;
    text-align:center !important;
  }
  .hero-stats strong{
    font-size:clamp(1.15rem,5.8vw,1.55rem) !important;
    line-height:1.1 !important;
    white-space:nowrap !important;
  }
  .hero-stats span{
    font-size:clamp(.56rem,2.55vw,.72rem) !important;
    line-height:1.25 !important;
    overflow-wrap:anywhere;
  }
  .about-copy{display:flex;flex-direction:column;align-items:center}
  .section-heading>div{display:flex;flex-direction:column;align-items:center}
  .service-card{
    flex-direction:column !important;
    justify-content:center !important;
    text-align:center !important;
    gap:12px !important;
  }
  .service-copy{text-align:center !important}
  .project-card{display:block !important}
  .project-content{
    min-height:0 !important;
    padding:26px 24px 28px !important;
    text-align:center !important;
    align-items:center !important;
  }
  .project-content .project-art{
    min-height:0 !important;
    height:auto !important;
    padding:0 !important;
    margin:16px auto 20px !important;
    display:flex !important;
    justify-content:center !important;
    align-items:center !important;
    background:none !important;
    overflow:visible !important;
    width:100% !important;
  }
  .project-content .project-art::before{display:none !important}
  .project-content .project-art span{
    width:118px !important;
    max-width:34vw !important;
    box-shadow:0 0 18px rgba(24,168,255,.18) !important;
  }
  .project-content p{margin-top:0 !important;margin-left:auto !important;margin-right:auto !important}
  .project-content .project-action,.project-content .project-status{align-self:center !important}
  .content-card .youtube-card-body{align-items:center !important}
  .contact-wrap{justify-items:center !important;text-align:center !important}
  .social-area{display:flex;flex-direction:column;align-items:center}
  .network-grid{width:100%}
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

// Nueva animación principal. La animación anterior permanece intacta en index.html
// y se sustituye solo en tiempo de ejecución, por lo que queda disponible para recuperarla.
const setupHeroObdAnimation = () => {
  const stage = document.querySelector('.tech-visual');
  if (!stage) return;

  const obdStyles = document.createElement('style');
  obdStyles.textContent = `
    .obd-demo{position:relative;min-height:430px;height:100%;overflow:hidden;background:radial-gradient(circle at 50% 42%,rgba(24,168,255,.14),transparent 35%),linear-gradient(155deg,#091720,#050c12 72%);font-family:Inter,system-ui,sans-serif}
    .obd-demo:before{content:"";position:absolute;inset:0;opacity:.16;background-image:linear-gradient(rgba(92,200,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(92,200,255,.12) 1px,transparent 1px);background-size:30px 30px;mask-image:linear-gradient(to bottom,transparent,#000 18%,#000 82%,transparent)}
    .obd-head{position:absolute;left:22px;right:22px;top:18px;display:flex;justify-content:space-between;align-items:center;color:#6f91a4;font-size:.58rem;letter-spacing:.14em;z-index:3}
    .obd-head strong{color:#8bdcff;font-size:.62rem}.obd-live{display:flex;align-items:center;gap:7px}.obd-live:before{content:"";width:6px;height:6px;border-radius:50%;background:#5cc8ff;box-shadow:0 0 10px #18a8ff;animation:obdBlink 1.2s ease-in-out infinite}
    .obd-scene{position:absolute;left:7%;right:7%;top:24%;height:150px;display:grid;grid-template-columns:105px 1fr 120px;align-items:center;gap:12px;z-index:2}
    .obd-device{width:92px;height:70px;justify-self:center;position:relative;border:1px solid rgba(92,200,255,.44);border-radius:15px 15px 20px 20px;background:linear-gradient(155deg,#112430,#08131b);box-shadow:0 0 30px rgba(24,168,255,.12),inset 0 0 18px rgba(24,168,255,.05);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
    .obd-device:before{content:"";position:absolute;top:-12px;width:50px;height:17px;border:1px solid rgba(92,200,255,.35);border-bottom:0;border-radius:6px 6px 0 0;background:#0a1922}.obd-device i{color:#5cc8ff;font-size:1.35rem;filter:drop-shadow(0 0 8px rgba(92,200,255,.55))}.obd-device strong{font:700 .7rem 'Space Grotesk';letter-spacing:.1em}.obd-device small{font-size:.46rem;letter-spacing:.14em;color:#688da2}
    .obd-car{justify-self:center;text-align:center;color:#d8f3ff;position:relative}.obd-car i{font-size:4.4rem;color:#cdefff;filter:drop-shadow(0 0 16px rgba(24,168,255,.28));transition:filter .3s ease}.obd-demo.is-communicating .obd-car i{filter:drop-shadow(0 0 22px rgba(24,168,255,.5))}.obd-car span{display:block;margin-top:4px;color:#668fa6;font-size:.5rem;letter-spacing:.15em}
    .obd-link{height:54px;position:relative;overflow:visible}.obd-wire{position:absolute;left:0;right:0;top:26px;height:2px;background:linear-gradient(90deg,rgba(92,200,255,.20),#5cc8ff 35%,#18a8ff 65%,rgba(92,200,255,.20));box-shadow:0 0 10px rgba(24,168,255,.28)}
    .obd-wire:before,.obd-wire:after{content:"";position:absolute;top:-3px;width:8px;height:8px;border-radius:50%;background:#5cc8ff;box-shadow:0 0 10px #18a8ff}.obd-wire:before{left:-1px}.obd-wire:after{right:-1px}
    .data-packet{position:absolute;top:22px;width:10px;height:10px;border-radius:3px;background:#8ee2ff;box-shadow:0 0 12px #18a8ff;opacity:0}.obd-demo.is-running .data-packet{animation:packetOne 1.05s linear infinite}.obd-demo.is-running .packet-2{animation-delay:.34s}.obd-demo.is-running .packet-3{animation-delay:.68s}.obd-demo.is-communicating .packet-back{display:block;animation:packetBack 1.2s linear infinite;animation-delay:.2s}.packet-back{display:none;background:#317cff}
    .obd-panel{position:absolute;left:9%;right:9%;bottom:34px;padding:17px 18px 15px;border:1px solid rgba(92,200,255,.19);border-radius:15px;background:rgba(5,13,19,.76);backdrop-filter:blur(10px);z-index:3;box-shadow:0 12px 34px rgba(0,0,0,.22)}
    .obd-phase-row{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.obd-phase-label{color:#6c91a6;font-size:.55rem;letter-spacing:.16em;margin-bottom:3px}.obd-phase{font:700 1.03rem 'Space Grotesk';letter-spacing:.08em;color:#dff5ff;text-transform:uppercase}.obd-counter{font:700 1.45rem 'Space Grotesk';color:#5cc8ff;min-width:74px;text-align:right;text-shadow:0 0 14px rgba(24,168,255,.35)}
    .obd-progress{height:5px;border-radius:99px;margin-top:12px;background:rgba(255,255,255,.07);overflow:hidden}.obd-progress span{display:block;width:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,#157dff,#5cc8ff);box-shadow:0 0 12px rgba(24,168,255,.55);transition:width .05s linear}.obd-demo.is-communicating .obd-progress span{width:100%!important;animation:commPulse 1.35s ease-in-out infinite}
    .obd-substatus{display:flex;justify-content:space-between;gap:10px;margin-top:9px;color:#54798f;font-size:.48rem;letter-spacing:.13em}.obd-substatus .active{color:#7dd9ff}
    @keyframes packetOne{0%{left:0;opacity:0;transform:scale(.7)}10%{opacity:1}90%{opacity:1}100%{left:calc(100% - 10px);opacity:0;transform:scale(1)}}
    @keyframes packetBack{0%{left:calc(100% - 10px);opacity:0}10%{opacity:.9}90%{opacity:.9}100%{left:0;opacity:0}}
    @keyframes commPulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes obdBlink{50%{opacity:.3;transform:scale(.75)}}
    @media(max-width:620px){.obd-demo{min-height:360px}.obd-scene{left:5%;right:5%;top:22%;height:125px;grid-template-columns:78px 1fr 88px;gap:7px}.obd-device{width:70px;height:57px;border-radius:12px 12px 16px 16px}.obd-device:before{width:39px;height:13px;top:-9px}.obd-device i{font-size:1.05rem}.obd-device strong{font-size:.56rem}.obd-device small{font-size:.38rem}.obd-car i{font-size:3.25rem}.obd-car span{font-size:.4rem}.obd-panel{left:6%;right:6%;bottom:22px;padding:14px}.obd-phase{font-size:.82rem}.obd-counter{font-size:1.15rem;min-width:62px}.obd-head{left:16px;right:16px;top:14px}.obd-substatus{font-size:.4rem}}
    @media(prefers-reduced-motion:reduce){.obd-live:before,.data-packet,.obd-progress span{animation:none!important}}
  `;
  document.head.appendChild(obdStyles);

  stage.innerHTML = `
    <div class="obd-demo is-running" aria-label="Simulación de comunicación OBD con vehículo">
      <div class="obd-head"><strong>MIKETRONIC · OBD-II</strong><span class="obd-live">LINK ACTIVO</span></div>
      <div class="obd-scene">
        <div class="obd-device"><i class="fa-solid fa-plug"></i><strong>OBD-II</strong><small>INTERFACE</small></div>
        <div class="obd-link" aria-hidden="true"><div class="obd-wire"></div><span class="data-packet packet-1"></span><span class="data-packet packet-2"></span><span class="data-packet packet-3"></span><span class="data-packet packet-back"></span></div>
        <div class="obd-car"><i class="fa-solid fa-car-side"></i><span>VEHICLE ECU NETWORK</span></div>
      </div>
      <div class="obd-panel">
        <div class="obd-phase-row"><div><div class="obd-phase-label">PROCESO ACTUAL</div><div class="obd-phase">DIAGNOSTICANDO</div></div><div class="obd-counter">0%</div></div>
        <div class="obd-progress"><span></span></div>
        <div class="obd-substatus"><span class="active">CAN / UDS ONLINE</span><span>TX ↔ RX</span><span>12.4 V</span></div>
      </div>
    </div>`;

  const demo = stage.querySelector('.obd-demo');
  const phaseEl = stage.querySelector('.obd-phase');
  const counterEl = stage.querySelector('.obd-counter');
  const progressEl = stage.querySelector('.obd-progress span');
  if (!demo || !phaseEl || !counterEl || !progressEl) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    phaseEl.textContent = 'COMUNICANDO';
    counterEl.textContent = 'ONLINE';
    progressEl.style.width = '100%';
    demo.classList.add('is-communicating');
    return;
  }

  const phases = [
    { label: 'DIAGNOSTICANDO', duration: 1900 },
    { label: 'CODIFICANDO', duration: 1750 },
    { label: 'PROGRAMANDO', duration: 2100 }
  ];

  const runPhase = ({ label, duration }) => new Promise(resolve => {
    phaseEl.textContent = label;
    let start = 0;
    const tick = timestamp => {
      if (!start) start = timestamp;
      const ratio = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 2.2);
      const value = Math.min(100, Math.round(eased * 100));
      counterEl.textContent = `${value}%`;
      progressEl.style.width = `${value}%`;
      if (ratio < 1) requestAnimationFrame(tick);
      else setTimeout(resolve, 260);
    };
    requestAnimationFrame(tick);
  });

  (async () => {
    for (const phase of phases) {
      progressEl.style.width = '0%';
      counterEl.textContent = '0%';
      await runPhase(phase);
    }
    phaseEl.textContent = 'COMUNICANDO';
    counterEl.textContent = 'ONLINE';
    progressEl.style.width = '100%';
    demo.classList.remove('is-running');
    demo.classList.add('is-running','is-communicating');
  })();
};
setupHeroObdAnimation();

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
