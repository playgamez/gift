// GIFTS array: edit to add or remove items
const GIFTS = [
  { name: "Wireless Headset Model X", price: "$79", img: "https://images.unsplash.com/photo-1518444029843-3d7f6efb5f6b?q=80&w=1200&auto=format&fit=crop", url: "https://example.com/product/headset-x", tag: "Audio" },
  { name: "E-Reader Slim 7\"", price: "$129", img: "https://images.unsplash.com/photo-1553895002-2f1a3bcb1a13?q=80&w=1200&auto=format&fit=crop", url: "https://example.com/product/ereader-slim", tag: "Reading" },
  { name: "Cozy Throw Blanket", price: "$49", img: "https://images.unsplash.com/photo-1525693413518-3e1e8e6b8f6b?q=80&w=1200&auto=format&fit=crop", url: "https://example.com/product/blanket", tag: "Home" }
];

const gallery = document.getElementById('gallery');

function createCard(item, index){
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('role','listitem');
  card.dataset.index = index;

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

function render(){
  gallery.innerHTML = '';
  GIFTS.forEach((g, i) => gallery.appendChild(createCard(g, i)));
  // ensure first card is focusable for keyboard users
  const first = gallery.querySelector('.card');
  if(first) first.tabIndex = 0;
}

render();

// Keyboard navigation: up/down arrows move between items and snap
gallery.addEventListener('keydown', (e) => {
  const KEY_UP = 38, KEY_DOWN = 40;
  if(e.keyCode !== KEY_UP && e.keyCode !== KEY_DOWN) return;
  e.preventDefault();
  const cards = Array.from(gallery.querySelectorAll('.card'));
  if(cards.length === 0) return;
  // find centered card by comparing bounding center
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

// Optional helper for quick adding in console: addGift({name, price, img, url, tag})
function addGift(item){
  GIFTS.push(item);
  render();
}
window.addGift = addGift;
window.GIFTS = GIFTS;
