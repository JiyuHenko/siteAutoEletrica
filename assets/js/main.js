(() => {
  if (!document.querySelector('link[data-avelar-refinements]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'assets/css/refinements.css?v=20260818-perf3';
    css.dataset.avelarRefinements = 'true';
    document.head.appendChild(css);
  }

  const GA_ID = 'G-CNCG41V6B6';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const loadAnalytics = () => {
    if (window.__avelarGaLoaded) return;
    window.__avelarGaLoaded = true;
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(ga);
  };

  const scheduleAnalytics = () => {
    setTimeout(() => {
      if ('requestIdleCallback' in window) requestIdleCallback(loadAnalytics, { timeout: 2500 });
      else loadAnalytics();
    }, 6000);
  };
  if (document.readyState === 'complete') scheduleAnalytics();
  else addEventListener('load', scheduleAnalytics, { once: true });
  ['pointerdown','keydown','touchstart'].forEach(type => addEventListener(type, loadAnalytics, { once: true, passive: true }));

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.href); } catch { return; }
    if (url.pathname.endsWith('/servicos.html')) {
      window.gtag?.('event', 'services_navigation', { source_page: location.pathname, destination: url.pathname });
    }
  });

  const photoMap = {
    'oficina.svg':['assets/img/foto-oficina-auto-eletrica-avelar-passos.webp','Área de serviço da Auto Elétrica Avelar em Passos MG'],
    'fachada.svg':['assets/img/foto-fachada-auto-eletrica-avelar-passos.webp','Fachada da Auto Elétrica Avelar em Passos MG'],
    'equipe.svg':['assets/img/foto-equipe-auto-eletrica-avelar-passos.webp','Equipe da Auto Elétrica Avelar em Passos MG'],
    'diagnostico.svg':['assets/img/foto-diagnostico-automotivo-avelar.webp','Diagnóstico eletrônico automotivo na Auto Elétrica Avelar'],
    'central.svg':['assets/img/foto-reparo-modulo-eletronico-avelar.webp','Reparo e análise de módulo eletrônico automotivo na Auto Elétrica Avelar'],
    'clima.svg':['assets/img/foto-ar-condicionado-automotivo-avelar.webp','Serviço de ar-condicionado automotivo na Auto Elétrica Avelar'],
    'linha.svg':['assets/img/foto-linha-pesada-agricola-avelar.webp','Diagnóstico eletrônico de linha pesada e agrícola na Auto Elétrica Avelar']
  };

  document.querySelectorAll('.visual img[src*="assets/visuals/"]').forEach(img => {
    const item = photoMap[img.getAttribute('src')?.split('/').pop()];
    if (!item) return;
    const [src, alt] = item;
    const visual = img.closest('.visual');
    const versionedSrc = `${src}?v=20260818-perf3`;

    img.src = versionedSrc;
    img.alt = alt;
    img.decoding = 'async';
    ['width','height'].forEach(prop => img.style.setProperty(prop,'100%','important'));
    img.style.setProperty('object-fit','contain','important');
    img.style.setProperty('object-position','center','important');
    img.style.setProperty('padding','0','important');

    if (visual) {
      visual.style.setProperty('--photo-bg', `url("${new URL(versionedSrc, document.baseURI).href}")`);
      visual.style.setProperty('aspect-ratio','3 / 4','important');
      visual.style.setProperty('min-height','0','important');
      visual.style.setProperty('height','auto','important');
      visual.classList.add('has-photo');
    }
  });

  const deferredImages = [...document.querySelectorAll('img[data-deferred-src]')];
  const revealDeferred = img => {
    if (!img?.dataset.deferredSrc) return;
    const load = () => {
      img.src = img.dataset.deferredSrc;
      img.removeAttribute('data-deferred-src');
    };
    setTimeout(load, 1800);
  };
  if ('IntersectionObserver' in window) {
    const deferredObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        revealDeferred(entry.target);
        deferredObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px', threshold: .05 });
    deferredImages.forEach(img => deferredObserver.observe(img));
  } else {
    deferredImages.forEach(revealDeferred);
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const footer = document.querySelector('footer');
  const copy = footer?.querySelector('.copy');
  if (copy) {
    copy.classList.add('copy-with-credit');

    if (!copy.querySelector('.copy-text')) {
      const copyText = document.createElement('span');
      copyText.className = 'copy-text';
      while (copy.firstChild) copyText.appendChild(copy.firstChild);
      copy.appendChild(copyText);
    }

    if (!copy.querySelector('[data-custom-mind-credit]')) {
      const credit = document.createElement('a');
      credit.className = 'custom-mind-credit';
      credit.dataset.customMindCredit = 'true';
      credit.href = 'https://custommind.com.br/';
      credit.target = '_blank';
      credit.rel = 'noopener noreferrer';
      credit.setAttribute('aria-label', 'Site desenvolvido por Custom Mind Software Solutions');
      credit.title = 'Site desenvolvido por Custom Mind Software Solutions';
      credit.innerHTML = '<img src="assets/img/custom-mind-logo.png" alt="Custom Mind Software Solutions" width="190" height="55" loading="lazy" decoding="async">';
      copy.appendChild(credit);
    }
  }

  const proof = document.querySelector('.hero-classic .hero-copy .proof');
  if (proof && !document.querySelector('[data-bosch-partner]')) {
    const partner = document.createElement('div');
    partner.className = 'bosch-partner';
    partner.dataset.boschPartner = 'true';
    partner.setAttribute('aria-label', 'Auto Elétrica Avelar — Parceiros Bosch');
    partner.innerHTML = '<span>Parceiros</span><img data-deferred-src="assets/img/bosch-logo.png" alt="Bosch" width="400" height="91" decoding="async" fetchpriority="low">';
    proof.insertAdjacentElement('afterend', partner);
    const img = partner.querySelector('img[data-deferred-src]');
    if (img) revealDeferred(img);
  }

  const menuButton = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    let works = nav.querySelector('a[href="trabalhos.html"]');
    if (!works) {
      works = document.createElement('a');
      works.href = 'trabalhos.html';
      works.textContent = 'Trabalhos';
      const contact = nav.querySelector('a[href="contato.html"]');
      nav.insertBefore(works, contact || nav.lastElementChild);
    }
    if (location.pathname.endsWith('/trabalhos.html') || document.querySelector('.case-hero')) {
      nav.querySelectorAll('[aria-current="page"]').forEach(a => a.removeAttribute('aria-current'));
      works.setAttribute('aria-current','page');
    }
  }

  if (menuButton && nav) {
    const close = () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='Menu'; };
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Fechar' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  const header = document.querySelector('.top');
  let headerTicking = false;
  const paintHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
    headerTicking = false;
  };
  const requestHeaderPaint = () => {
    if (headerTicking) return;
    headerTicking = true;
    requestAnimationFrame(paintHeader);
  };
  paintHeader();
  addEventListener('scroll', requestHeaderPaint, { passive: true });

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('seen');
      observer.unobserve(entry.target);
    }), { threshold: .12 });
    document.querySelectorAll('.section,.card,.service').forEach(el => observer.observe(el));
  }
})();
