// script.js — final, complete, and ready
document.addEventListener('DOMContentLoaded', () => {
  const GIFTS = [
   
    { name: "Black Shower Curtain", price: "$9", img: "assets/shower.jpg", url: "https://www.amazon.com/LLSCL-Curtain-Magnets-Waterproof-Washable/dp/B09TX5WW9T?th=1", tag: "Bathroom" },
 
    { name: "Wireless Gaming Mechanical Keyboard", price: "$79", img: "assets/keyboard.png", url: "https://www.amazon.com/ZORNHER-Wireless-Mechanical-Keyboard-Hot-Swappable/dp/B0DS1SV3R1?th=1", tag: "Gaming" }
  ];

  const gallery = document.getElementById('gallery');
  if (!gallery) {
    console.warn('Gallery element not found.');
    return;
  }

  // Create a single card element
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
    price.textContent = item.price || '—';

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

  // Render all cards
  function render() {
    gallery.innerHTML = '';
    GIFTS.forEach((g, i) => gallery.appendChild(createCard(g, i)));
    const first = gallery.querySelector('.card');
    if (first) first.tabIndex = 0;
  }

  // Keyboard navigation: Up / Down arrows to move between cards
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
    cards[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    cards.forEach(c => c.tabIndex = -1);
    cards[nextIndex].tabIndex = 0;
    cards[nextIndex].focus({ preventScroll: true });
  });

  // Expose helper to add new gift programmatically and re-render
  window.addGift = function(item) {
    if (!item || !item.name) return;
    GIFTS.push(item);
    render();
  };
  window.GIFTS = GIFTS;

  render();
});
