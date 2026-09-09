const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

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

document.querySelector('.about-copy .pill-row')?.remove();
document.querySelectorAll('.contact-group-label').forEach(label => label.remove());

const responsiveRefinements = document.createElement('style');
responsiveRefinements.textContent = `
.contact-methods{margin-top:24px}
@media (max-width:620px){
  .hero-copy,.about-copy,.section-heading,.contact-wrap>div:first-child,.content-card .youtube-card-body{text-align:center!important}
  .hero-actions{justify-content:center!important}
  .hero-stats{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;align-items:stretch!important}
  .hero-stats div{padding:0 5px!important;min-width:0!important;text-align:center!important}
  .hero-stats strong{font-size:clamp(1.15rem,5.8vw,1.55rem)!important;line-height:1.1!important;white-space:nowrap!important}
  .hero-stats span{font-size:clamp(.56rem,2.55vw,.72rem)!important;line-height:1.25!important;overflow-wrap:anywhere}
  .about-copy{display:flex;flex-direction:column;align-items:center}.section-heading>div{display:flex;flex-direction:column;align-items:center}
  .service-card{flex-direction:column!important;justify-content:center!important;text-align:center!important;gap:12px!important}.service-copy{text-align:center!important}
  .project-card{display:block!important}.project-content{min-height:0!important;padding:26px 24px 28px!important;text-align:center!important;align-items:center!important}
  .project-content .project-art{min-height:0!important;height:auto!important;padding:0!important;margin:16px auto 20px!important;display:flex!important;justify-content:center!important;align-items:center!important;background:none!important;overflow:visible!important;width:100%!important}
  .project-content .project-art::before{display:none!important}.project-content .project-art span{width:118px!important;max-width:34vw!important;box-shadow:0 0 18px rgba(24,168,255,.18)!important}
  .project-content p{margin-top:0!important;margin-left:auto!important;margin-right:auto!important}.project-content .project-action,.project-content .project-status{align-self:center!important}
  .content-card .youtube-card-body{align-items:center!important}.contact-wrap{justify-items:center!important;text-align:center!important}.social-area{display:flex;flex-direction:column;align-items:center}.network-grid{width:100%}
  .contact-methods{margin-top:28px;grid-template-columns:repeat(3,minmax(0,1fr))!important;width:100%;gap:8px}.contact-methods .social-card{width:100%!important;min-width:0;min-height:50px;padding:0 8px;gap:7px;justify-content:center}.contact-methods .social-card i{width:auto;font-size:1.05rem}.contact-methods .social-card strong{font-size:clamp(.68rem,3vw,.82rem);white-space:nowrap}
}`;
document.head.appendChild(responsiveRefinements);

const projectCards = [...document.querySelectorAll('.project-card')].map(card => ({card,content:card.querySelector('.project-content'),art:card.querySelector('.project-art'),title:card.querySelector('.project-content h3')}));
const placeProjectArtwork = () => {
  const mobile = window.matchMedia('(max-width:620px)').matches;
  projectCards.forEach(({card,content,art,title}) => {
    if (!content || !art || !title) return;
    if (mobile) { if (art.parentElement !== content) title.insertAdjacentElement('afterend', art); }
    else if (art.parentElement !== card) card.appendChild(art);
  });
};
placeProjectArtwork();
window.addEventListener('resize', placeProjectArtwork, { passive:true });

const setupHeroDiagnosticAnimation = () => {
  const stage = document.querySelector('.tech-visual');
  if (!stage) return;
  const style = document.createElement('style');
  style.textContent = `
  .diag-demo{position:relative;min-height:430px;height:100%;overflow:hidden;background:radial-gradient(circle at 48% 39%,rgba(24,168,255,.13),transparent 37%),linear-gradient(155deg,#091720,#050c12 72%);font-family:Inter,system-ui,sans-serif}
  .diag-demo:before{content:"";position:absolute;inset:0;opacity:.15;background-image:linear-gradient(rgba(92,200,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(92,200,255,.12) 1px,transparent 1px);background-size:30px 30px;mask-image:linear-gradient(to bottom,transparent,#000 17%,#000 82%,transparent)}
  .diag-head{position:absolute;left:22px;right:22px;top:18px;display:flex;justify-content:space-between;align-items:center;color:#6f91a4;font-size:.58rem;letter-spacing:.14em;z-index:5}.diag-head strong{color:#8bdcff;font-size:.62rem}.diag-live{display:flex;align-items:center;gap:7px}.diag-live:before{content:"";width:6px;height:6px;border-radius:50%;background:#5cc8ff;box-shadow:0 0 10px #18a8ff;animation:diagBlink 1.2s ease-in-out infinite}
  .diag-scene{position:absolute;left:5%;right:5%;top:19%;height:176px;display:grid;grid-template-columns:132px 1fr 118px;align-items:center;gap:10px;z-index:2}
  .technician{height:150px;position:relative;justify-self:center;width:126px}.desk{position:absolute;left:4px;right:2px;bottom:18px;height:5px;border-radius:4px;background:#456274;box-shadow:0 0 9px rgba(92,200,255,.18)}.desk:before,.desk:after{content:"";position:absolute;top:4px;width:4px;height:28px;background:#314957}.desk:before{left:10px}.desk:after{right:10px}
  .monitor{position:absolute;right:5px;bottom:54px;width:59px;height:43px;border:2px solid #53778b;border-radius:5px;background:#07131a;box-shadow:0 0 15px rgba(24,168,255,.16);transform:perspective(90px) rotateY(-4deg)}.monitor:after{content:"";position:absolute;left:27px;top:43px;width:4px;height:13px;background:#53778b}.screen-lines{position:absolute;inset:6px;overflow:hidden;background:linear-gradient(180deg,rgba(24,168,255,.05),rgba(24,168,255,.01))}.screen-lines:before{content:"";position:absolute;left:3px;right:9px;top:7px;height:2px;background:#5cc8ff;box-shadow:0 7px 0 #2d6d92,0 14px 0 #5cc8ff,13px 21px 0 #2d6d92;animation:screenWork 1.1s steps(2,end) infinite}
  .person-head{position:absolute;left:24px;bottom:93px;width:27px;height:30px;border-radius:50% 50% 44% 44%;background:#b7c7cf;border:1px solid #d9e8ee;animation:headWork 2.1s ease-in-out infinite;transform-origin:50% 100%}.person-body{position:absolute;left:15px;bottom:48px;width:45px;height:51px;border-radius:17px 17px 7px 7px;background:linear-gradient(145deg,#183c52,#0b2331);border:1px solid rgba(92,200,255,.25)}.person-body:after{content:"";position:absolute;left:7px;top:13px;width:25px;height:2px;background:rgba(92,200,255,.42)}
  .arm{position:absolute;left:48px;bottom:58px;width:43px;height:9px;border-radius:9px;background:#17384b;transform-origin:3px 50%;transform:rotate(15deg);animation:typeArm .62s ease-in-out infinite alternate}.hand{position:absolute;right:-5px;top:0;width:9px;height:9px;border-radius:50%;background:#b7c7cf}.keyboard{position:absolute;left:64px;bottom:42px;width:38px;height:7px;border:1px solid #4e7184;border-radius:2px;transform:skewX(-16deg);background:#0a1820}.work-label{position:absolute;left:4px;bottom:0;color:#6a91a7;font-size:.43rem;letter-spacing:.12em;white-space:nowrap}
  .vehicle{justify-self:center;text-align:center;color:#d8f3ff;position:relative}.vehicle i{font-size:4.3rem;color:#cdefff;filter:drop-shadow(0 0 16px rgba(24,168,255,.28));transition:filter .3s ease}.diag-demo.is-communicating .vehicle i{filter:drop-shadow(0 0 23px rgba(24,168,255,.5))}.vehicle span{display:block;margin-top:5px;color:#6c94aa;font-size:.54rem;letter-spacing:.14em;font-weight:700}
  .data-link{height:60px;position:relative}.data-wire{position:absolute;left:0;right:0;top:29px;height:2px;background:linear-gradient(90deg,rgba(92,200,255,.18),#5cc8ff 35%,#18a8ff 65%,rgba(92,200,255,.18));box-shadow:0 0 10px rgba(24,168,255,.28)}.data-wire:before,.data-wire:after{content:"";position:absolute;top:-3px;width:8px;height:8px;border-radius:50%;background:#5cc8ff;box-shadow:0 0 10px #18a8ff}.data-wire:before{left:-1px}.data-wire:after{right:-1px}
  .data-packet{position:absolute;top:25px;width:10px;height:10px;border-radius:3px;background:#8ee2ff;box-shadow:0 0 12px #18a8ff;opacity:0}.diag-demo.is-running .data-packet{animation:packetOut 1.05s linear infinite}.diag-demo.is-running .packet-2{animation-delay:.34s}.diag-demo.is-running .packet-3{animation-delay:.68s}.packet-back{display:none;background:#317cff}.diag-demo.is-communicating .packet-back{display:block;animation:packetBack 1.2s linear infinite;animation-delay:.2s}
  .diag-panel{position:absolute;left:9%;right:9%;bottom:30px;padding:16px 18px 14px;border:1px solid rgba(92,200,255,.19);border-radius:15px;background:rgba(5,13,19,.78);backdrop-filter:blur(10px);z-index:4;box-shadow:0 12px 34px rgba(0,0,0,.22)}.diag-phase-row{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.diag-phase-label{color:#6c91a6;font-size:.55rem;letter-spacing:.16em;margin-bottom:3px}.diag-phase{font:700 1.03rem 'Space Grotesk';letter-spacing:.08em;color:#dff5ff;text-transform:uppercase}.diag-counter{font:700 1.45rem 'Space Grotesk';color:#5cc8ff;min-width:74px;text-align:right;text-shadow:0 0 14px rgba(24,168,255,.35)}.diag-progress{height:5px;border-radius:99px;margin-top:12px;background:rgba(255,255,255,.07);overflow:hidden}.diag-progress span{display:block;width:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,#157dff,#5cc8ff);box-shadow:0 0 12px rgba(24,168,255,.55);transition:width .05s linear}.diag-demo.is-communicating .diag-progress span{width:100%!important;animation:commPulse 1.35s ease-in-out infinite}.diag-substatus{display:flex;justify-content:space-between;gap:10px;margin-top:9px;color:#54798f;font-size:.48rem;letter-spacing:.13em}.diag-substatus .active{color:#7dd9ff}
  @keyframes packetOut{0%{left:0;opacity:0;transform:scale(.7)}10%{opacity:1}90%{opacity:1}100%{left:calc(100% - 10px);opacity:0;transform:scale(1)}}@keyframes packetBack{0%{left:calc(100% - 10px);opacity:0}10%{opacity:.9}90%{opacity:.9}100%{left:0;opacity:0}}@keyframes commPulse{0%,100%{opacity:.45}50%{opacity:1}}@keyframes diagBlink{50%{opacity:.3;transform:scale(.75)}}@keyframes headWork{0%,100%{transform:rotate(0)}45%{transform:rotate(5deg)}70%{transform:rotate(-2deg)}}@keyframes typeArm{from{transform:rotate(11deg) translateY(0)}to{transform:rotate(17deg) translateY(2px)}}@keyframes screenWork{0%{transform:translateY(0);opacity:.65}50%{transform:translateY(2px);opacity:1}100%{transform:translateY(0);opacity:.75}}
  @media(max-width:620px){.diag-demo{min-height:360px}.diag-scene{left:4%;right:4%;top:18%;height:143px;grid-template-columns:96px 1fr 80px;gap:5px}.technician{width:92px;height:125px;transform:scale(.78);transform-origin:center}.vehicle i{font-size:3.1rem}.vehicle span{font-size:.44rem}.diag-panel{left:6%;right:6%;bottom:20px;padding:14px}.diag-phase{font-size:.82rem}.diag-counter{font-size:1.15rem;min-width:62px}.diag-head{left:16px;right:16px;top:14px}.diag-substatus{font-size:.4rem}}
  @media(prefers-reduced-motion:reduce){.diag-live:before,.data-packet,.diag-progress span,.person-head,.arm,.screen-lines:before{animation:none!important}}
  `;
  document.head.appendChild(style);
  stage.innerHTML = `<div class="diag-demo is-running" aria-label="Electromecánico comunicando con un vehículo mediante diagnosis">
    <div class="diag-head"><strong>MIKETRONIC</strong><span class="diag-live">LINK ACTIVO</span></div>
    <div class="diag-scene">
      <div class="technician" aria-label="Electromecánico trabajando con un ordenador"><div class="person-head"></div><div class="person-body"></div><div class="arm"><span class="hand"></span></div><div class="monitor"><span class="screen-lines"></span></div><div class="keyboard"></div><div class="desk"></div><span class="work-label">ELECTROMECÁNICO</span></div>
      <div class="data-link" aria-hidden="true"><div class="data-wire"></div><span class="data-packet packet-1"></span><span class="data-packet packet-2"></span><span class="data-packet packet-3"></span><span class="data-packet packet-back"></span></div>
      <div class="vehicle"><i class="fa-solid fa-car-side"></i><span>VEHÍCULO</span></div>
    </div>
    <div class="diag-panel"><div class="diag-phase-row"><div><div class="diag-phase-label">PROCESO ACTUAL</div><div class="diag-phase">DIAGNOSTICANDO</div></div><div class="diag-counter">0%</div></div><div class="diag-progress"><span></span></div><div class="diag-substatus"><span class="active">CAN / UDS ONLINE</span><span>TX ↔ RX</span><span>12.4 V</span></div></div>
  </div>`;
  const demo=stage.querySelector('.diag-demo'), phaseEl=stage.querySelector('.diag-phase'), counterEl=stage.querySelector('.diag-counter'), progressEl=stage.querySelector('.diag-progress span');
  if (!demo || !phaseEl || !counterEl || !progressEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { phaseEl.textContent='COMUNICANDO';counterEl.textContent='ONLINE';progressEl.style.width='100%';demo.classList.add('is-communicating');return; }
  const phases=[{label:'DIAGNOSTICANDO',duration:1900},{label:'CODIFICANDO',duration:1750},{label:'PROGRAMANDO',duration:2100}];
  const runPhase=({label,duration})=>new Promise(resolve=>{phaseEl.textContent=label;let start=0;const tick=t=>{if(!start)start=t;const ratio=Math.min((t-start)/duration,1),eased=1-Math.pow(1-ratio,2.2),value=Math.min(100,Math.round(eased*100));counterEl.textContent=`${value}%`;progressEl.style.width=`${value}%`;if(ratio<1)requestAnimationFrame(tick);else setTimeout(resolve,260)};requestAnimationFrame(tick)});
  (async()=>{for(const phase of phases){progressEl.style.width='0%';counterEl.textContent='0%';await runPhase(phase)}phaseEl.textContent='COMUNICANDO';counterEl.textContent='ONLINE';progressEl.style.width='100%';demo.classList.add('is-communicating')})();
};
setupHeroDiagnosticAnimation();

const backToTop=document.querySelector('.back-to-top');
const updateBackToTop=()=>backToTop?.classList.toggle('visible',window.scrollY>500);
window.addEventListener('scroll',updateBackToTop,{passive:true});updateBackToTop();backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const carousel=document.querySelector('.about-carousel');
if(carousel){const allSlides=[...carousel.querySelectorAll('.carousel-slide')],prevButton=carousel.querySelector('.carousel-prev'),nextButton=carousel.querySelector('.carousel-next'),dotsWrap=carousel.querySelector('.carousel-dots');let validSlides=[],currentIndex=0,checkedImages=0,autoTimer;const showSlide=(index,restart=false)=>{if(!validSlides.length)return;currentIndex=(index+validSlides.length)%validSlides.length;validSlides.forEach((slide,i)=>slide.classList.toggle('active',i===currentIndex));[...dotsWrap.children].forEach((dot,i)=>dot.classList.toggle('active',i===currentIndex));if(restart)startAuto()};const startAuto=()=>{clearInterval(autoTimer);if(validSlides.length>1)autoTimer=setInterval(()=>showSlide(currentIndex+1),5500)};const finishSetup=()=>{if(checkedImages<allSlides.length)return;validSlides=allSlides.filter(slide=>!slide.classList.contains('image-missing'));allSlides.forEach(slide=>slide.classList.remove('active'));dotsWrap.innerHTML='';if(!validSlides.length){carousel.classList.add('no-images');return}carousel.classList.remove('no-images');validSlides.forEach((slide,index)=>{const dot=document.createElement('button');dot.type='button';dot.className='carousel-dot';dot.setAttribute('aria-label',`Ver foto ${index+1}`);dot.addEventListener('click',()=>showSlide(index,true));dotsWrap.appendChild(dot)});showSlide(0);startAuto()};prevButton?.addEventListener('click',()=>showSlide(currentIndex-1,true));nextButton?.addEventListener('click',()=>showSlide(currentIndex+1,true));allSlides.forEach(slide=>{const image=slide.querySelector('img');const markChecked=missing=>{if(slide.dataset.checked)return;slide.dataset.checked='true';if(missing)slide.classList.add('image-missing');checkedImages+=1;finishSetup()};if(image.complete)markChecked(!image.naturalWidth);else{image.addEventListener('load',()=>markChecked(false),{once:true});image.addEventListener('error',()=>markChecked(true),{once:true})}})}

const contentGrid=document.querySelector('.content-grid');
if(contentGrid&&Array.isArray(window.MIKETRONIC_CONTENT)){const getYouTubeId=(url='')=>{const match=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/i);return match?match[1]:''};const escapeHtml=(value='')=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');contentGrid.innerHTML=window.MIKETRONIC_CONTENT.slice(0,3).map((item,index)=>{const delay=index===1?' delay-1':index===2?' delay-2':'',tag=escapeHtml(item.tag||'CONTENIDO'),url=escapeHtml(item.url||'#');if(item.type==='youtube'){const title=escapeHtml(item.title||'Vídeo destacado de Miketronic'),description=escapeHtml(item.description||''),videoId=getYouTubeId(item.url),embed=videoId?`https://www.youtube-nocookie.com/embed/${videoId}`:'',channelUrl=escapeHtml(item.channelUrl||item.url||'#');return `<article class="content-card reveal${delay}"><div class="content-thumb youtube-thumb">${embed?`<iframe src="${embed}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`:'AQUÍ VÍDEO'}</div><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description?`<p>${description}</p>`:''}<a class="youtube-more" href="${channelUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i> Ver más en YouTube</a></div></article>`}if(item.type==='electromecanikos'){const title=escapeHtml(item.title||'Mis entradas en Electromecánikos'),description=escapeHtml(item.description||''),moreUrl=escapeHtml(item.moreUrl||item.url||'https://www.electromecanikos.es/search/label/Miketronic'),visual=`<div style="position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;overflow:hidden;color:#f5f8fb;background:#05090d"><div style="position:absolute;inset:0;background-image:linear-gradient(rgba(3,8,12,.72),rgba(3,8,12,.78)),url('assets/about/logo_electromecanikos.es.jpg');background-size:cover;background-position:center;filter:saturate(.85) contrast(1.05);transform:scale(1.02)"></div><div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(24,168,255,.08),rgba(3,8,12,.34) 72%)"></div><div style="position:relative;z-index:1;font:700 2.15rem 'Space Grotesk',sans-serif;letter-spacing:-.04em;text-shadow:0 2px 18px rgba(0,0,0,.95)">ELECTROMECÁNIKOS</div><div style="position:relative;z-index:1;font-size:.72rem;letter-spacing:.18em;color:#5cc8ff;text-shadow:0 2px 12px rgba(0,0,0,.95)">BY MIKETRONIC</div></div>`;return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb article-thumb">${visual}</div></a><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description?`<p>${description}</p>`:''}<a class="electromecanikos-more" href="${moreUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-bolt"></i> Ver más en Electromecánikos</a></div></article>`}const title=escapeHtml(item.title||'Contenido destacado'),description=escapeHtml(item.description||''),image=item.image?`<img src="${escapeHtml(item.image)}" alt="${title}" loading="lazy">`:`<div style="width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at 50% 45%,rgba(24,168,255,.12),rgba(5,9,13,.98) 68%);color:#547184;font-size:.72rem;letter-spacing:.12em">CONTENIDO</div>`;return `<article class="content-card reveal${delay}"><a class="content-card-link" href="${url}" target="_blank" rel="noopener noreferrer"><div class="content-thumb article-thumb">${image}</div></a><div class="youtube-card-body"><span class="content-tag">${tag}</span><h3>${title}</h3>${description?`<p>${description}</p>`:''}<a class="electromecanikos-more" href="${url}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-right"></i> Ver contenido</a></div></article>`}).join('');document.querySelectorAll('.content-grid .reveal').forEach(el=>observer.observe(el))}
