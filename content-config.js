// CONTENIDOS DESTACADOS
// Edita este archivo para cambiar las tres cajas de "Últimos contenidos".
// Galería: añade o sustituye imágenes en el array "images".
// YouTube: basta con cambiar la URL del vídeo.
// Electromecánikos: esta caja dirige a tus entradas con la etiqueta Miketronic.

window.MIKETRONIC_CONTENT = [
  {
    type: 'gallery',
    tag: 'GALERÍA',
    title: 'Trabajos recientes',
    description: '',
    images: [
      'assets/about/foto-1.webp',
      'assets/about/foto-2.webp',
      'assets/about/foto-3.webp',
      'assets/about/foto-4.webp',
      'assets/about/foto-5.webp'
    ]
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=fyD93EkMyh4',
    tag: 'YOUTUBE',
    title: 'Vídeo destacado de Miketronic',
    description: '',
    channelUrl: 'https://www.youtube.com/@miketronic_'
  },
  {
    type: 'electromecanikos',
    url: 'https://www.electromecanikos.es/search/label/Miketronic',
    tag: 'ELECTROMECÁNIKOS',
    title: 'Mis entradas en Electromecánikos',
    description: '',
    moreUrl: 'https://www.electromecanikos.es/search/label/Miketronic'
  }
];

// Alineación uniforme del menú superior.
const navAlignmentStyle = document.createElement('style');
navAlignmentStyle.textContent = `.nav-links{align-items:center}.nav-links>a{display:inline-flex;align-items:center;min-height:38px}.nav-services{padding-top:0!important;padding-bottom:0!important}.specialties-services-link{display:flex;justify-content:center;margin-top:30px}.specialties-services-link .btn{min-width:210px;justify-content:center;border-color:rgba(92,200,255,.34);background:rgba(24,168,255,.07);color:#dff4ff;transition:.2s}.specialties-services-link .btn:hover{border-color:#5cc8ff;background:rgba(24,168,255,.14);box-shadow:0 8px 24px rgba(24,168,255,.12);transform:translateY(-1px)}@media(max-width:620px){.specialties-services-link{margin-top:24px}}`;
document.head.appendChild(navAlignmentStyle);

// Acceso al listado completo de servicios desde Especialidades.
const specialtiesGrid = document.querySelector('#especialidades .services-grid');
if (specialtiesGrid) {
  const servicesLinkWrap = document.createElement('div');
  servicesLinkWrap.className = 'specialties-services-link reveal';
  servicesLinkWrap.innerHTML = `<a class="btn btn-ghost" href="servicios.html">Ver todos los servicios <span>→</span></a>`;
  specialtiesGrid.insertAdjacentElement('afterend', servicesLinkWrap);
}

// Tratamiento visual circular y desvanecido para las imágenes de los proyectos.
// Se inicializa cuando la sección se aproxima al viewport para no descargar
// imágenes de proyectos durante la carga inicial de la portada.
const projectMedia = window.matchMedia('(max-width: 620px)');
const applyProjectArtwork = (selector, imageUrl) => {
  const projectArt = document.querySelector(selector);
  if (!projectArt) return;
  const mark = projectArt.querySelector('span');
  if (!mark) return;

  mark.textContent = '';
  mark.style.width = 'clamp(125px, 15vw, 185px)';
  mark.style.aspectRatio = '1';
  mark.style.borderRadius = '50%';
  mark.style.display = 'block';
  mark.style.backgroundImage = `radial-gradient(circle, transparent 54%, rgba(11,22,32,.18) 70%, #0b1620 100%), url('${imageUrl}')`;
  mark.style.backgroundSize = 'cover';
  mark.style.backgroundPosition = 'center';

  const updateProjectArtwork = () => {
    if (projectMedia.matches) {
      projectArt.style.background = 'transparent';
      mark.style.boxShadow = '0 0 16px rgba(24,168,255,.16)';
    } else {
      projectArt.style.background = '';
      mark.style.boxShadow = '0 0 42px rgba(24,168,255,.16)';
    }
  };

  updateProjectArtwork();
  projectMedia.addEventListener?.('change', updateProjectArtwork);
};

const initProjectArtwork = () => {
  applyProjectArtwork('.project-art-one', 'assets/about/logo_electromecanikos.es_2.webp');
  applyProjectArtwork('.project-art-two', 'assets/about/mtmanager_miketronic.webp');
};

const projectsSection = document.querySelector('#proyectos');
if (projectsSection && 'IntersectionObserver' in window) {
  const projectArtworkObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some(entry => entry.isIntersecting)) {
      initProjectArtwork();
      observer.disconnect();
    }
  }, { rootMargin: '500px 0px' });
  projectArtworkObserver.observe(projectsSection);
} else {
  initProjectArtwork();
}

const electromecanikosProjectLink = document.querySelector('.project-card:first-child .text-link');
if (electromecanikosProjectLink) {
  electromecanikosProjectLink.href = 'https://www.electromecanikos.es/';
  electromecanikosProjectLink.target = '_blank';
  electromecanikosProjectLink.rel = 'noopener noreferrer';
}
