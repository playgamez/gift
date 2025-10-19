const GIFTS = [
  { name: "Wireless Headset Model X", price: "$79", img: "https://images.unsplash.com/photo-1518444029843-3d7f6efb5f6b?q=80&w=1200&auto=format&fit=crop", url: "https://example.com/product/headset-x", tag: "Audio" },
  { name: "E-Reader Slim 7\"", price: "$129", img: "https://images.unsplash.com/photo-1553895002-2f1a3bcb1a13?q=80&w=1200&auto=format&fit=crop", url: "https://example.com/product/ereader-slim", tag: "Reading" }
];

const gallery = document.getElementById('gallery');

function createCard(item){
  const card = document.createElement('article');
  card.className = 'card';

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
  GIFTS.forEach(g => gallery.appendChild(createCard(g)));
}

render();

function addGift(item){
  GIFTS.push(item);
  render();
}
window.addGift = addGift;
window.GIFTS = GIFTS;
