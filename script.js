// script.js — complete, self-contained, prevents click-through to underlying cards
document.addEventListener('DOMContentLoaded', () => {
  // === GIFTS array: edit to add or remove items (price should be a string like "$79" or "79") ===
  const GIFTS = [
    { name: "Wireless Gaming Mechanical Keyboard", price: "$79", img: "assets/keyboard.png", url: "https://www.amazon.com/ZORNHER-Wireless-Mechanical-Keyboard-Hot-Swappable/dp/B0DS1SV3R1?th=1", tag: "Gaming" },
    { name: "E-Reader Slim 7\"", price: "$129", img: "assets/ereader.png", url: "https://example.com/product/ereader-slim", tag: "Reading" },
    { name: "Cozy Throw Blanket", price: "$49", img: "assets/blanket.png", url: "https://example.com/product/blanket", tag: "Home" }
  ];

  // DOM refs
  const gallery = document.getElementById('gallery');
  const sortBtn = document.getElementById('sortBtn');
  const sortMenu = document.getElementById('sortMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const sortDropdown = document.getElementById('sortDropdown');

  if(!gallery || !sortBtn || !sortMenu || !menuBackdrop) {
    console.warn('Required DOM elements missing: gallery or sort controls.');
    return;
  }

  // state
  let currentSort = 'az'; // az | za | plh | phl

  // utils
  function priceToNumber(p){
    if(p === null || p === undefined) return NaN;
    if(typeof p === 'number') return p;
    return Number(String(p).replace(/[^0-9.-]+/g,""));
  }

  // create card
  function createCard(item, index){
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role','listitem');
    card.dataset.index = index;
    card.style.setProperty('--i', index);

    const link = document.createElement('a');
    link.className = 'media';
    link.href = item.url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.alt = item.name || 'gift';
    img.src = item.img || '';
    link.appendChild(img);

    const info = document.createElement('div');
    info.className = 'info';

    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = item.name || 'Untitled';

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = item.price ? item.price : '—';

    const meta = document.createElement('div');
    meta.className = 'meta';
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = item.tag || '';

    meta.appendChild(badge);
    info.appendChild(name);
    info.appendChild(price);
    info.appendChild(meta);

    card.appendChild(link);
    card.appendChild(info);

    return card;
  }

  // render list
  function renderList(list){
    gallery.innerHTML = '';
    list.forEach((g, i) => gallery.appendChild(createCard(g, i)));
    const first = gallery.querySelector('.card');
    if(first) first.tabIndex = 0;
  }

  // sorting
  function sortedListBy(mode){
    const list = GIFTS.slice();
    if(mode === 'az') return list.sort((a,b)=> (a.name||'').localeCompare(b.name||''));
    if(mode === 'za') return list.sort((a,b)=> (b.name||'').localeCompare(a.name||''));
    if(mode === 'plh') return list.sort((a,b)=> (priceToNumber(a.price)||0) - (priceToNumber(b.price)||0));
    if(mode === 'phl') return list.sort((a,b)=> (priceToNumber(b.price)||0) - (priceToNumber(a.price)||0));
    return list;
  }

  // update UI label and render; keep chev if exists
  function updateSort(mode){
    currentSort = mode;
    const labels = { az: 'Sort: A → Z', za: 'Sort: Z → A', plh: 'Sort: Price Low → High', phl: 'Sort: Price High → Low' };
    const chev = sortBtn.querySelector('.chev');
    sortBtn.textContent = labels[mode] || 'Sort';
    if(chev) sortBtn.appendChild(chev);
    closeMenu();
    renderList(sortedListBy(mode));
    // smooth snap first card into view for polish
    requestAnimationFrame(()=> {
      const first = gallery.querySelector('.card');
      if(first) first.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  // open/close menu with robust pointer handling to prevent click-through
  function openMenu(){
    sortBtn.setAttribute('aria-expanded','true');
    sortMenu.setAttribute('aria-hidden','false');
    // show backdrop and enable pointer events so it captures taps immediately
    menuBackdrop.style.display = 'block';
    // allow a frame, then enable pointer events — prevents the opening tap from leaking
    requestAnimationFrame(() => { menuBackdrop.style.pointerEvents = 'auto'; });
    // ensure menu pointer-events enabled
    sortMenu.style.pointerEvents = 'auto';
  }
  function closeMenu(){
    sortBtn.setAttribute('aria-expanded','false');
    sortMenu.setAttribute('aria-hidden','true');
    // disable pointer events and hide backdrop after a frame for smoothness
    menuBackdrop.style.pointerEvents = 'none';
    requestAnimationFrame(() => { menuBackdrop.style.display = 'none'; });
    sortMenu.style.pointerEvents = 'none';
  }
  function toggleMenu(){
    const isOpen = sortBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  // intercept pointerdown on button to avoid immediate click-through on touch devices
  sortBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMenu();
  });

  // menu captures pointerdown for selection; use pointerdown to handle touch before click reaches cards
  sortMenu.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    // if a menu item was pressed, handle it
    const li = e.target.closest('li[data-sort]');
    if(!li) return;
    const mode = li.dataset.sort;
    if(mode) updateSort(mode);
  });

  // backdrop captures pointerdown and closes menu; prevents taps reaching cards
  menuBackdrop.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeMenu();
  });

  // fallback: clicks outside dropdown close it
  document.addEventListener('click', (e) => {
    if(!e.target.closest('#sortDropdown')) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
  });

  // initial render
  updateSort(currentSort);

  // keyboard nav for gallery (Up/Down)
  gallery.addEventListener('keydown', (e) => {
    const KEY_UP = 38, KEY_DOWN = 40;
    if(e.keyCode !== KEY_UP && e.keyCode !== KEY_DOWN) return;
    e.preventDefault();
    const cards = Array.from(gallery.querySelectorAll('.card'));
    if(cards.length === 0) return;
    const centerY = window.innerHeight / 2;
    let activeIndex = cards.findIndex(c => {
      const r = c.getBoundingClientRect();
      return r.top <= centerY && r.bottom >= centerY;
    });
    if(activeIndex === -1) activeIndex = 0;
    const nextIndex = e.keyCode === KEY_DOWN ? Math.min(cards.length - 1, activeIndex + 1) : Math.max(0, activeIndex - 1);
    cards[nextIndex].scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'});
    cards.forEach(c => c.tabIndex = -1);
    cards[nextIndex].tabIndex = 0;
    cards[nextIndex].focus({preventScroll:true});
  });

  // helper to add gifts via console and re-render sorted
  window.addGift = function(item){
    if(!item || !item.name) return;
    GIFTS.push(item);
    updateSort(currentSort);
  };
  window.GIFTS = GIFTS;
});
