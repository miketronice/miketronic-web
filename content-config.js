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

// Imagen del proyecto Electromecánikos manteniendo el tratamiento circular y desvanecido.
const electromecanikosProjectArt = document.querySelector('.project-art-one');
if (electromecanikosProjectArt) {
  const mark = electromecanikosProjectArt.querySelector('span');
  if (mark) {
    mark.textContent = '';
    mark.style.width = 'clamp(125px, 15vw, 185px)';
    mark.style.aspectRatio = '1';
    mark.style.borderRadius = '50%';
    mark.style.display = 'block';
    mark.style.backgroundImage = "radial-gradient(circle, transparent 54%, rgba(11,22,32,.18) 70%, #0b1620 100%), url('assets/about/logo_electromecanikos.es_2.jpg')";
    mark.style.backgroundSize = 'cover';
    mark.style.backgroundPosition = 'center';
    mark.style.boxShadow = '0 0 42px rgba(24,168,255,.16)';
  }
}
