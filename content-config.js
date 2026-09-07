// CONTENIDOS DESTACADOS
// Edita este archivo para cambiar las tres cajas de "Últimos contenidos".
// YouTube: basta con cambiar la URL del vídeo.
// Electromecánikos: esta caja dirige a tus entradas con la etiqueta Miketronic.

window.MIKETRONIC_CONTENT = [
  {
    type: 'article',
    url: 'AQUI_ENLACE_CAJA_1',
    tag: 'LLAVES',
    title: 'Aquí irá un artículo o contenido destacado',
    description: 'Texto breve de ejemplo para presentar el contenido.',
    image: ''
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
  mark.style.boxShadow = '0 0 42px rgba(24,168,255,.16)';
};

applyProjectArtwork('.project-art-one', 'assets/about/logo_electromecanikos.es_2.jpg');
applyProjectArtwork('.project-art-two', 'assets/about/mtmanager_miketronic.jpg');

// Enlace directo al proyecto Electromecánikos.
const electromecanikosProjectLink = document.querySelector('.project-card:first-child .text-link');
if (electromecanikosProjectLink) {
  electromecanikosProjectLink.href = 'https://www.electromecanikos.es/';
  electromecanikosProjectLink.target = '_blank';
  electromecanikosProjectLink.rel = 'noopener noreferrer';
}
