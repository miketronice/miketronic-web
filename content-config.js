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
      'assets/about/foto-1.jpg',
      'assets/about/foto-2.jpg',
      'assets/about/foto-3.jpg',
      'assets/about/foto-4.jpg',
      'assets/about/foto-5.jpg'
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

// Tratamiento visual circular y desvanecido para las imágenes de los proyectos.
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

applyProjectArtwork('.project-art-one', 'assets/about/logo_electromecanikos.es_2.jpg');
applyProjectArtwork('.project-art-two', 'assets/about/mtmanager_miketronic.jpg');

const electromecanikosProjectLink = document.querySelector('.project-card:first-child .text-link');
if (electromecanikosProjectLink) {
  electromecanikosProjectLink.href = 'https://www.electromecanikos.es/';
  electromecanikosProjectLink.target = '_blank';
  electromecanikosProjectLink.rel = 'noopener noreferrer';
}
