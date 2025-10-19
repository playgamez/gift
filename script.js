// === GIFTS array: edit to add or remove items (price should be a string like "$79" or "79") ===
const GIFTS = [
  { name: "Wireless Headset Model X", price: "$79", img: "assets/headset.png", url: "https://example.com/product/headset-x", tag: "Audio" },
  { name: "E-Reader Slim 7\"", price: "$129", img: "assets/ereader.png", url: "https://example.com/product/ereader-slim", tag: "Reading" },
  { name: "Cozy Throw Blanket", price: "$49", img: "assets/blanket.png", url: "https://example.com/product/blanket", tag: "Home" }
];

const gallery = document.getElementById('gallery');

// FILTER STATE
let filterState = {
  q: '',
  minPrice: null,
  maxPrice: null,
  sort: 'az' // az | za | plh | phl
};

// UTIL: parse price string into number (strip $ and commas). Returns NaN if not parseable.
function priceToNumber(p){
  if(p === null || p === undefined) return NaN;
  if(typeof p === 'number') return p;
  return Number(String(p).replace(/[^0-9.-]+/g,""));
}

// Create a card element (same as before), add index var for animation delay.
// Keep this consistent with previous markup.
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

// Render accepts an array of items to show
function renderList(list){
  gallery.innerHTML = '';
  list.forEach((g, i) => gallery.appendChild(createCard(g, i)));
  const first = gallery.querySelector('.card');
  if(first) first.tabIndex = 0;
}

// Apply filters and sorting to GIFTS and render
function applyFilters(){
  // start from original list
  let list = GIFTS.slice();

  // text search
  const q = filterState.q.trim().toLowerCase();
  if(q){
    list = list.filter(i => (i.name || '').toLowerCase().includes(q));
  }

  // price filtering
  const min = Number(filterState.minPrice);
  const max = Number(filterState.maxPrice);
  if(!isNaN(min)){
    list = list.filter(i => {
      const v = priceToNumber(i.price);
      return !isNaN(v) ? v >= min : false;
    });
  }
  if(!isNaN(max)){
    list = list.filter(i => {
      const v = priceToNumber(i.price);
      return !isNaN(v) ? v <= max : false;
    });
  }

  // sorting
  list.sort((a,b) => {
    if(filterState.sort === 'az') return (a.name||'').localeCompare(b.name||'');
    if(filterState.sort === 'za') return (b.name||'').localeCompare(a.name||'');
    if(filterState.sort === 'plh') return (priceToNumber(a.price) || 0) - (priceToNumber(b.price) || 0);
    if(filterState.sort === 'phl') return (priceToNumber(b.price) || 0) - (priceToNumber(a.price) || 0);
    return 0;
  });

  renderList(list);
}

// ===== Setup filter UI bindings =====
const searchName = document.getElementById('searchName');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const sortSelect = document.getElementById('sortSelect');
const dropdownMenu = document.querySelector('.dropdown-menu');
const clearBtn = document.getElementById('clearFilters');

searchName.addEventListener('input', (e) => {
  filterState.q = e.target.value;
  applyFilters();
});

[minPrice, maxPrice].forEach(inp => {
  inp.addEventListener('input', () => {
    const vMin = minPrice.value.trim();
    const vMax = maxPrice.value.trim();
    filterState.minPrice = vMin === '' ? null : Number(vMin);
    filterState.maxPrice = vMax === '' ? null : Number(vMax);
    applyFilters();
  });
});

// Dropdown open/close
sortSelect.addEventListener('click', () => {
  const expanded = sortSelect.getAttribute('aria-expanded') === 'true';
  sortSelect.setAttribute('aria-expanded', String(!expanded));
  dropdownMenu.setAttribute('aria-hidden', String(expanded));
});

// Choose sort option
dropdownMenu.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-sort]');
  if(!li) return;
  const sortVal = li.dataset.sort;
  filterState.sort = sortVal;
  // update button label
  const labels = { az: 'A → Z ▾', za: 'Z → A ▾', plh: 'Price Low → High ▾', phl: 'Price High → Low ▾' };
  sortSelect.textContent = labels[sortVal] || 'Sort ▾';
  // close menu
  sortSelect.setAttribute('aria-expanded', 'false');
  dropdownMenu.setAttribute('aria-hidden', 'true');
  applyFilters();
});

// Close menu if click outside or esc
document.addEventListener('click', (e) => {
  if(!e.target.closest('.dropdown')) {
    sortSelect.setAttribute('aria-expanded', 'false');
    dropdownMenu.setAttribute('aria-hidden', 'true');
  }
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    sortSelect.setAttribute('aria-expanded', 'false');
    dropdownMenu.setAttribute('aria-hidden', 'true');
  }
});

// clear filters
clearBtn.addEventListener('click', () => {
  searchName.value = '';
  minPrice.value = '';
  maxPrice.value = '';
  filterState = { q: '', minPrice: null, maxPrice: null, sort: 'az' };
  sortSelect.textContent = 'A → Z ▾';
  applyFilters();
});

// initial render
applyFilters();

// keyboard navigation for gallery (same behavior you had)
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
