(() => {
  const root = document.querySelector('[data-work-browser]');
  if (!root) return;

  const cards = [...root.querySelectorAll('[data-work-card]')];
  const filters = [...root.querySelectorAll('[data-work-filter]')];
  const search = root.querySelector('[data-work-search]');
  const counter = root.querySelector('[data-work-count]');
  const empty = root.querySelector('[data-work-empty]');

  const normalize = value => (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  const aliases = {
    'ar-condicionado': 'ar-condicionado',
    'ar condicionado': 'ar-condicionado',
    climatizacao: 'ar-condicionado',
    injecao: 'injecao',
    'injecao-eletronica': 'injecao',
    modulo: 'modulos',
    modulos: 'modulos',
    ecu: 'modulos',
    pld: 'modulos',
    caminhao: 'linha-pesada',
    caminhoes: 'linha-pesada',
    pesada: 'linha-pesada',
    agro: 'agricola',
    agricola: 'agricola',
    remap: 'remap',
    programacao: 'programacao',
    diagnostico: 'diagnostico',
    eletrica: 'auto-eletrica',
    'auto-eletrica': 'auto-eletrica'
  };

  const resolveCategory = raw => {
    const value = normalize(raw).replace(/\s+/g, '-');
    return aliases[value] || value || 'todos';
  };

  let activeCategory = 'todos';

  const setUrl = category => {
    const url = new URL(window.location.href);
    if (category === 'todos') url.searchParams.delete('categoria');
    else url.searchParams.set('categoria', category);
    url.searchParams.delete('q');
    history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  const apply = ({ updateUrl = true } = {}) => {
    const term = normalize(search?.value);
    let visible = 0;

    cards.forEach(card => {
      const categories = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
      const matchesCategory = activeCategory === 'todos' || categories.includes(activeCategory);
      const matchesSearch = !term || normalize(card.textContent).includes(term);
      const show = matchesCategory && matchesSearch;
      card.hidden = !show;
      card.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (show) visible += 1;
    });

    filters.forEach(filter => {
      const selected = filter.dataset.workFilter === activeCategory;
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    if (counter) counter.textContent = `${visible} ${visible === 1 ? 'trabalho encontrado' : 'trabalhos encontrados'}`;
    if (empty) empty.hidden = visible !== 0;
    if (updateUrl) setUrl(activeCategory);
  };

  filters.forEach(filter => {
    filter.addEventListener('click', event => {
      event.preventDefault();
      activeCategory = filter.dataset.workFilter || 'todos';
      apply();
      root.querySelector('.work-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  search?.addEventListener('input', () => apply({ updateUrl: false }));

  const urlCategory = resolveCategory(new URL(window.location.href).searchParams.get('categoria'));
  if (filters.some(filter => filter.dataset.workFilter === urlCategory)) activeCategory = urlCategory;

  apply({ updateUrl: false });
})();
