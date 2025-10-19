// Simple GIFTS array — edit to add items. Price strings accepted like "$79" or "79".
const GIFTS = [
  { name: "Wireless Headset Model X", price: "$79", img: "assets/headset.png", url: "https://example.com/product/headset-x", tag: "Audio" },
  { name: "E-Reader Slim 7\"", price: "$129", img: "assets/ereader.png", url: "https://example.com/product/ereader-slim", tag: "Reading" },
  { name: "Cozy Throw Blanket", price: "$49", img: "assets/blanket.png", url: "https://example.com/product/blanket", tag: "Home" }
];

const gallery = document.getElementById('gallery');
const sortBtn = document.getElementById('sortBtn');
const sortMenu = document.getElementById('sortMenu');
const sortDropdown = document.getElementById('sortDropdown');

let currentSort = 'az'; // default

// helper: parse price string to number
function priceToNumber(p){
  if(p === null || p === undefined) return NaN;
  if(typeof p === 'number') return p;
  return Number(String(p).replace(/[^0-9.-]+/g,""));
}

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

function renderList(list){
  gallery.innerHTML = '';
  list.forEach((g, i) => gallery.appendChild(createCard(g, i)));
  const first = gallery.querySelector('.card');
  if(first) first.tabIndex = 0;
}

// sorting logic
function sortedListBy(mode){
  const list = GIFTS.slice();
  if(mode === 'az') return list.sort((a,b)=> (a.name||'').localeCompare(b.name||''));
  if(mode === 'za') return list.sort((a,b)=> (b.name||'').localeCompare(a.name||''));
  if(mode === 'plh') return list.sort((a,b)=> (priceToNumber(a.price)||0) - (priceToNumber(b.price)||0));
  if(mode === 'phl') return list.sort((a,b)=> (priceToNumber(b.price)||0) - (priceToNumber(a.price)||0));
  return list;
}

// update display according to currentSort
function updateSort(mode){
  currentSort = mode;
  const labels = { az: 'Sort: A → Z', za: 'Sort: Z → A', plh: 'Sort: Price Low → High', phl: 'Sort: Price High → Low' };
  sortBtn.childNodes[0].textContent = labels[mode] || 'Sort';
  closeMenu();
  renderList(sortedListBy(mode));
  // after render, snap first card into view for a polished feel
  requestAnimationFrame(()=> {
    const first = gallery.querySelector('.card');
    if(first) first.scrollIntoView({behavior:'smooth', block:'center'});
  });
}

// dropdown open/close helpers
function openMenu(){
  sortBtn.setAttribute('aria-expanded','true');
  sortMenu.setAttribute('aria-hidden','false');
}
function closeMenu(){
  sortBtn.setAttribute('aria-expanded','false');
  sortMenu.setAttribute('aria-hidden','true');
}
function toggleMenu(){
  const isOpen = sortBtn.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
}

// bind dropdown button
sortBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// delegate menu selection
sortMenu.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-sort]');
  if(!li) return;
  const mode = li.dataset.sort;
  updateSort(mode);
});

// close when clicking outside or pressing Escape
document.addEventListener('click', (e) => {
  if(!e.target.closest('#sortDropdown')) closeMenu();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeMenu();
});

// initial render with default sort
updateSort(currentSort);

// keyboard navigation for gallery (up/down)
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
