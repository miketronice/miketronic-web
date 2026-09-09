/* Lightweight SVG icon renderer for Miketronic.
   Brand icon paths: Simple Icons (CC0-1.0). Generic icons are local stroke SVGs. */
(() => {
  const stroke = (body) => `<svg class="site-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const thinStroke = (body) => `<svg class="site-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  const fill = (path) => `<svg class="site-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="${path}"/></svg>`;
  const obdPort = `<svg class="site-icon obd-port-icon" viewBox="0 0 64 38" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6.5h50c1.7 0 2.7 1.35 2.35 3L55.2 32.8c-.3 1.65-1.55 2.7-3.2 2.7H12c-1.65 0-2.9-1.05-3.2-2.7L4.65 9.5c-.35-1.65.65-3 2.35-3Z"/><path d="M11 10.5h42c1.15 0 1.8.85 1.6 2L51.4 30c-.18 1-.95 1.55-2 1.55H14.6c-1.05 0-1.82-.55-2-1.55L9.4 12.5c-.2-1.15.45-2 1.6-2Z"/><g fill="none" stroke="currentColor" stroke-width="1.05"><rect x="11.7" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="17.0" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="22.3" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="27.6" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="32.9" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="38.2" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="43.5" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="48.8" y="14.3" width="4.3" height="4.5" rx=".8"/><rect x="13.4" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="18.3" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="23.2" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="28.1" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="33.0" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="37.9" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="42.8" y="22.4" width="4.3" height="4.5" rx=".8"/><rect x="47.7" y="22.4" width="4.3" height="4.5" rx=".8"/></g></svg>`;
  const icons = {
    'fa-laptop-code': stroke('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20M9 9l-2 2 2 2M15 9l2 2-2 2"/>'),
    'fa-microchip': stroke('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
    'fa-key': stroke('<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l2 2M18 5l2 2"/>'),
    'fa-car-side': thinStroke('<path d="M2.7 15.3v-2c0-.85.5-1.55 1.3-1.82l1.65-.56 2.12-3.86a2.15 2.15 0 0 1 1.88-1.11h5.72c.75 0 1.45.39 1.84 1.03l2.32 3.78 1.28.43c.9.3 1.49 1.13 1.49 2.08v2.03"/><path d="M4.8 15.3h1.05m2.95 0h6.4m2.95 0h3.05M6.05 10.78h13.25M8.35 7.55h6.55"/><circle cx="7.3" cy="15.55" r="1.65"/><circle cx="16.7" cy="15.55" r="1.65"/>'),
    'fa-car-front-custom': thinStroke('<path d="M5.2 18.7v1.1c0 .7.55 1.2 1.2 1.2h1.05c.65 0 1.2-.5 1.2-1.2v-.8h6.7v.8c0 .7.55 1.2 1.2 1.2h1.05c.65 0 1.2-.5 1.2-1.2v-1.1"/><path d="M4.2 18.7V12.6c0-1 .38-1.92 1.08-2.62l1.15-1.15 1.03-3.25A2.25 2.25 0 0 1 9.6 4h4.8c1 0 1.88.65 2.14 1.58l1.03 3.25 1.15 1.15c.7.7 1.08 1.62 1.08 2.62v6.1Z"/><path d="M7 8.85h10M4.7 14.2h14.6M7.2 17.4h9.6"/><circle cx="7.2" cy="12.4" r="1.05"/><circle cx="16.8" cy="12.4" r="1.05"/><path d="M9.25 12.4h5.5"/>'),
    'fa-headset': stroke('<path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5ZM17 20c0 1-2 2-4 2"/>'),
    'fa-file-lines': stroke('<path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/>'),
    'fa-images': stroke('<rect x="3" y="5" width="16" height="14" rx="2"/><path d="M7 15l3-3 3 3 2-2 4 4M8 9h.01M7 3h14v14"/>'),
    'fa-chevron-left': stroke('<path d="m15 18-6-6 6-6"/>'),
    'fa-chevron-right': stroke('<path d="m9 18 6-6-6-6"/>'),
    'fa-chevron-up': stroke('<path d="m18 15-6-6-6 6"/>'),
    'fa-arrow-right': stroke('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    'fa-code': stroke('<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>'),
    'fa-bolt': fill('M13.4 1 4.7 13h6.1L9.7 23 19.3 10h-6.1z'),
    'fa-envelope': stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'),
    'fa-stethoscope': stroke('<path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>'),
    'fa-car-battery': stroke('<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V4h3v3M14 7V4h3v3M7 13h4M9 11v4M15 13h3"/>'),
    'fa-screwdriver-wrench': stroke('<path d="m14 7 3-3 3 3-3 3M13 8l-9 9 3 3 9-9M5 4l4 4M3 3l3 1-2 2-1-3ZM14 14l6 6"/>'),
    'fa-facebook-f': fill('M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z'),
    'fa-instagram': stroke('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/>'),
    'fa-youtube': fill('M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'),
    'fa-tiktok': fill('M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'),
    'fa-whatsapp': fill('M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'),
    'fa-telegram': fill('M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z')
  };

  const render = (root = document) => {
    root.querySelectorAll('i[class*="fa-"]').forEach(el => {
      let key = [...el.classList].find(c => icons[c]);
      if (!key) return;
      const vehicle = el.closest('.vehicle');
      const wrap = document.createElement('span');
      wrap.innerHTML = vehicle && key === 'fa-car-side' ? obdPort : icons[key];
      const svg = wrap.firstElementChild;
      svg.classList.add(...[...el.classList].filter(c => !c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa-regular' && c !== 'fa-brands'));
      el.replaceWith(svg);
      if (vehicle && key === 'fa-car-side') {
        const label = vehicle.querySelector('span');
        if (label) {
          label.textContent = 'OBD VEHÍCULO';
          label.style.marginTop = '3px';
          label.style.color = '#9bcfe7';
          label.style.fontSize = '.62rem';
          label.style.letterSpacing = '.11em';
          label.style.textShadow = '0 0 10px rgba(24,168,255,.24)';
          label.style.whiteSpace = 'nowrap';
        }
      }
    });
  };

  render();

  const dynamicIcons = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches?.('i[class*="fa-"]')) render(node.parentElement || document);
      else if (node.querySelector?.('i[class*="fa-"]')) render(node);
    }));
  });
  dynamicIcons.observe(document.documentElement, { childList: true, subtree: true });

  window.MiketronicIcons = { render };
})();