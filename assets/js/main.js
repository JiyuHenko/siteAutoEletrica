(() => {
  // Shared refinement layer. Keeping this here applies the fix to every static page
  // without duplicating another stylesheet link across the whole repository.
  if (!document.querySelector('link[data-avelar-refinements]')) {
    const refinementCss = document.createElement('link');
    refinementCss.rel = 'stylesheet';
    refinementCss.href = 'assets/css/refinements.css';
    refinementCss.dataset.avelarRefinements = 'true';
    document.head.appendChild(refinementCss);
  }

  // GA4 — carregado por este arquivo compartilhado em todas as paginas do site.
  const GA_ID = 'G-CNCG41V6B6';
  if (!window.__avelarGaLoaded) {
    window.__avelarGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gaScript);
  }

  // Evento dedicado para entender de qual pagina a pessoa entrou em Servicos.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, window.location.href); } catch { return; }
    if (!url.pathname.endsWith('/servicos.html')) return;
    window.gtag?.('event', 'services_navigation', {
      source_page: window.location.pathname,
      destination: url.pathname
    });
  });

  // Fotos reais: quando voce subir estes arquivos em assets/img/, o site troca
  // automaticamente as ilustracoes atuais sem quebrar nada enquanto eles nao existem.
  const photoMap = {
    'oficina.svg': {
      src: 'assets/img/foto-oficina-auto-eletrica-avelar-passos.webp',
      alt: 'Área de serviço da Auto Elétrica Avelar em Passos MG'
    },
    'fachada.svg': {
      src: 'assets/img/foto-fachada-auto-eletrica-avelar-passos.webp',
      alt: 'Fachada da Auto Elétrica Avelar em Passos MG'
    },
    'equipe.svg': {
      src: 'assets/img/foto-equipe-auto-eletrica-avelar-passos.webp',
      alt: 'Equipe da Auto Elétrica Avelar em Passos MG'
    },
    'diagnostico.svg': {
      src: 'assets/img/foto-diagnostico-automotivo-avelar.webp',
      alt: 'Diagnóstico eletrônico automotivo na Auto Elétrica Avelar'
    },
    'central.svg': {
      src: 'assets/img/foto-reparo-modulo-eletronico-avelar.webp',
      alt: 'Reparo e análise de módulo eletrônico automotivo na Auto Elétrica Avelar'
    },
    'clima.svg': {
      src: 'assets/img/foto-ar-condicionado-automotivo-avelar.webp',
      alt: 'Serviço de ar-condicionado automotivo na Auto Elétrica Avelar'
    },
    'linha.svg': {
      src: 'assets/img/foto-linha-pesada-agricola-avelar.webp',
      alt: 'Diagnóstico eletrônico de linha pesada e agrícola na Auto Elétrica Avelar'
    }
  };

  document.querySelectorAll('.visual img[src*="assets/visuals/"]').forEach(img => {
    const file = img.getAttribute('src')?.split('/').pop();
    const photo = photoMap[file];
    if (!photo) return;

    const probe = new Image();
    probe.onload = () => {
      img.src = photo.src;
      img.alt = photo.alt;
      img.decoding = 'async';
      img.closest('.visual')?.classList.add('has-photo');
    };
    probe.src = photo.src;
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    };

    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Fechar' : 'Menu';
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const header = document.querySelector('.top');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 10);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('seen');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section,.card,.service').forEach(element => observer.observe(element));
  }
})();
