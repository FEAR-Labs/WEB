(() => {
  'use strict';

  const root = document.documentElement;
  const copy = {
    en: {
      description: 'FEAR-Labs builds focused software with a clear purpose.',
      home: 'FEAR-Labs home', navigation: 'Main navigation', navWork: 'Work', navAbout: 'About',
      eyebrow: 'Independent software lab', heroTitle: 'Simple software.<br>By design.',
      workLabel: '01 / Work', projectKicker: 'Windows · Open source',
      projectCopy: 'Window management, simplified. Center, maximize and restore without breaking your workflow.',
      projectNote: 'Built to stay simple.',
      viewProject: 'Project', aboutLabel: '02 / About', aboutTitle: 'Small software.<br>Clear purpose.',
      aboutCopy: 'FEAR-Labs creates focused tools designed to stay out of the way and make everyday computing simpler.'
    },
    es: {
      description: 'FEAR-Labs crea software simple, enfocado y con un propósito claro.',
      home: 'Inicio de FEAR-Labs', navigation: 'Navegación principal', navWork: 'Proyectos', navAbout: 'Nosotros',
      eyebrow: 'Laboratorio independiente de software', heroTitle: 'Software simple.<br>Por diseño.',
      workLabel: '01 / Proyectos', projectKicker: 'Windows · Código abierto',
      projectCopy: 'Controla tus ventanas sin complicaciones. Centra, maximiza y restaura sin interrumpir lo que estás haciendo.',
      projectNote: 'Hecho para mantenerse simple.',
      viewProject: 'Proyecto', aboutLabel: '02 / Nosotros', aboutTitle: 'Menos ruido.<br>Más propósito.',
      aboutCopy: 'En FEAR-Labs creamos herramientas enfocadas en resolver bien una tarea: rápidas, claras y pensadas para integrarse naturalmente a tu día a día.'
    }
  };

  const spanishRegions = new Set(['AR','BO','CL','CO','CR','CU','DO','EC','SV','GQ','GT','HN','MX','NI','PA','PY','PE','PR','ES','UY','VE']);
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  const hasSpanishLanguage = browserLanguages.some(lang => /^es(?:-|$)/i.test(lang));
  const region = browserLanguages.map(lang => { try { return new Intl.Locale(lang).region; } catch { return undefined; } }).find(Boolean);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const spanishAmericaTimeZones = /^(America\/(Santiago|Argentina\/|La_Paz|Bogota|Costa_Rica|Havana|Santo_Domingo|Guayaquil|El_Salvador|Guatemala|Tegucigalpa|Mexico_City|Monterrey|Managua|Panama|Asuncion|Lima|Puerto_Rico|Montevideo|Caracas))/;
  const language = hasSpanishLanguage || spanishRegions.has(region) || spanishAmericaTimeZones.test(timeZone) ? 'es' : 'en';
  const text = copy[language];
  root.lang = language;

  document.querySelectorAll('[data-i18n]').forEach(element => { const value = text[element.dataset.i18n]; if (value) element.textContent = value; });
  document.querySelectorAll('[data-i18n-html]').forEach(element => { const value = text[element.dataset.i18nHtml]; if (value) element.innerHTML = value; });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { const value = text[element.dataset.i18nAria]; if (value) element.setAttribute('aria-label', value); });
  document.querySelectorAll('[data-i18n-content]').forEach(element => { const value = text[element.dataset.i18nContent]; if (value) element.setAttribute('content', value); });

  const projectVideo = document.querySelector('.project-video video');
  if (projectVideo) {
    const playbackRate = 0.15;
    projectVideo.playbackRate = playbackRate;
    projectVideo.defaultPlaybackRate = playbackRate;
    projectVideo.addEventListener('loadedmetadata', () => { projectVideo.playbackRate = playbackRate; }, { once: true });
  }

  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const about = document.querySelector('.about');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (header && hero) {
    const syncHeader = () => {
      const probe = Math.max(1, header.getBoundingClientRect().height / 2);
      const aboutTop = about?.getBoundingClientRect().top ?? Infinity;
      const heroBottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle('is-dark', heroBottom <= probe && aboutTop > probe);
      header.classList.toggle('is-surface', aboutTop <= probe);
      if (themeColor) themeColor.content = aboutTop <= probe ? '#111111' : heroBottom <= probe ? '#0a0a0a' : '#145cff';
    };
    syncHeader();
    addEventListener('scroll', syncHeader, { passive: true });
    addEventListener('resize', syncHeader, { passive: true });
  }
})();
