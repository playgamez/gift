// script.js — fixed toggle behavior (click to open/close immediately; click to select)
// Fully self-contained and compatible with touch: no pointerdown preventDefault on the button.
// Menu/backdrop capture clicks so underlying links never open while menu is visible.

document.addEventListener('DOMContentLoaded', () => {
  const GIFTS = [
    { name: "Wireless Headset Model X", price: "$79", img: "assets/headset.png", url: "https://example.com/product/headset-x", tag: "Audio" },
    { name: "E-Reader Slim 7\"", price: "$129", img: "assets/ereader.png", url: "https://example.com/product/ereader-slim", tag: "Reading" },
    { name: "Cozy Throw Blanket", price: "$49", img: "assets/blanket.png", url: "https://example.com/product/blanket", tag: "Home" },
    { name: "Wireless Gaming Mechanical Keyboard", price: "$79", img: "assets/keyboard.png", url: "https://www.amazon.com/ZORNHER-Wireless-Mechanical-Keyboard-Hot-Swappable/dp/B0DS1SV3R1?th=1", tag: "Gaming" }
  ];

  // DOM refs
  const gallery = document.getElementById('gallery');
  const sortBtn = document.getElementById('sortBtn');
  const sortMenu = document.getElementById('sortMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const sortDropdown = document.getElementById('sortDropdown');

  if (!gallery || !sortBtn || !sortMenu || !menuBackdrop) {
    console.warn('Required DOM elements missing: gallery or sort controls.');
    return;
  }

  let currentSort = 'az'; // az | za | plh | phl

  // helpers
  function priceToNumber(p) {
    if (p === null || p === undefined) return NaN;
    if (typeof p === 'number') return p;
    return Number(String(p).replace(/[^0-9.-]+/g, ""));
  }

  function createCard(item, index) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('role', 'listitem');
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

  function renderList(list) {
    gallery.innerHTML = '';
    list.forEach((g, i) => gallery.appendChild(createCard(g, i)));
    const first = gallery.querySelector('.card');
    if (first) first.tabIndex = 0;
  }

  function sortedListBy(mode) {
    const list = GIFTS.slice();
    if (mode === 'az') return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (mode === 'za') return list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    if (mode === 'plh') return list.sort((a, b) => (priceToNumber(a.price) || 0) - (priceToNumber(b.price) || 0));
    if (mode === 'phl') return list.sort((a, b) => (priceToNumber(b.price) || 0) - (priceToNumber(a.price) || 0));
    return list;
  }

  function updateSort(mode) {
    currentSort = mode;
    const labels = { az: 'Sort: A → Z', za: 'Sort: Z → A', plh: 'Sort: Price Low → High', phl: 'Sort: Price High → Low' };
    const chev = sortBtn.querySelector('.chev');
    sortBtn.textContent = labels[mode] || 'Sort';
    if (chev) sortBtn.appendChild(chev);

    // visual selected mark
    [...sortMenu.querySelectorAll('li')].forEach(li => {
      li.setAttribute('aria-checked', li.dataset.sort === mode ? 'true' : 'false');
    });

    closeMenu();
    renderList(sortedListBy(mode));
    requestAnimationFrame(() => {
      const first = gallery.querySelector('.card');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Open/close menu behavior — immediate toggling on click (no hold)
  function openMenu() {
    sortBtn.setAttribute('aria-expanded', 'true');
    sortMenu.setAttribute('aria-hidden', 'false');
    // show backdrop and immediately enable pointer-events so it blocks underlying links
    menuBackdrop.style.display = 'block';
    menuBackdrop.style.pointerEvents = 'auto';
    // ensure menu can receive clicks
    sortMenu.style.pointerEvents = 'auto';
  }
  function closeMenu() {
    sortBtn.setAttribute('aria-expanded', 'false');
    sortMenu.setAttribute('aria-hidden', 'true');
    // disable menu & backdrop pointer events then hide backdrop
    sortMenu.style.pointerEvents = 'none';
    menuBackdrop.style.pointerEvents = 'none';
    requestAnimationFrame(() => { menuBackdrop.style.display = 'none'; });
  }
  function toggleMenu() {
    const isOpen = sortBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  }

  // Click to open/close dropdown (no preventDefault, so normal tap works)
  sortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Menu selection via click. Stop propagation so card links don't receive the event.
  sortMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    const li = e.target.closest('li[data-sort]');
    if (!li) return;
    const mode = li.dataset.sort;
    if (mode) updateSort(mode);
  });

  // Backdrop captures pointer events and prevents clicks from reaching cards. Close menu on backdrop interaction.
  menuBackdrop.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeMenu();
  });

  // Fallback: clicking anywhere else closes menu
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#sortDropdown')) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Initial render
  updateSort(currentSort);

  // Keyboard nav for gallery (Up/Down)
  gallery.addEventListener('keydown', (e) => {
    const KEY_UP = 38, KEY_DOWN = 40;
    if (e.keyCode !== KEY_UP && e.keyCode !== KEY_DOWN) return;
    e.preventDefault();
    const cards = Array.from(gallery.querySelectorAll('.card'));
    if (cards.length === 0) return;
    const centerY = window.innerHeight / 2;
    let activeIndex = cards.findIndex(c => {
      const r = c.getBoundingClientRect();
      return r.top <= centerY && r.bottom >= centerY;
    });
    if (activeIndex === -1) activeIndex = 0;
    const nextIndex = e.keyCode === KEY_DOWN ? Math.min(cards.length - 1, activeIndex + 1) : Math.max(0, activeIndex - 1);
    cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    cards.forEach(c => c.tabIndex = -1);
    cards[nextIndex].tabIndex = 0;
    cards[nextIndex].focus({ preventScroll: true });
  });

  // Console helper to add gifts
  window.addGift = function (item) {
    if (!item || !item.name) return;
    GIFTS.push(item);
    updateSort(currentSort);
  };
  window.GIFTS = GIFTS;
});
