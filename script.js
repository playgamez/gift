
document.addEventListener('DOMContentLoaded', () => {

  const GIFTS = [

    {
      name: "Optoma PK31 4K Projector",
      price: "$420 used & new from $600",
      img: "assets/projector.jpg",
      url: "https://www.amazon.com/dp/B0FQSZ63ZP",
      tag: "Amazon"
    },

    {
      name: "FIFINE K669B USB Microphone",
      price: "$37",
      img: "assets/Microphone.jpg",
      url: "https://www.amazon.com/dp/B06XCKGLTP",
      tag: "Amazon"
    },

    {
      name: "Xbox Ghost Cipher Controller",
      price: "$50",
      img: "assets/ghost-controller.jpg",
      url: "https://www.gamestop.com/gaming-accessories/controllers/xbox-series-x%7Cs/products/microsoft-xbox-wireless-controller---ghost-cipher-special-edition-for-xbox-series-x-s-xbox-one-and-windows-devices/416461.html",
      tag: "Gaming"
    },

    {
      name: "Minoxidil",
      price: "$33.99",
      img: "assets/minoxidil.jpg",
      url: "https://www.amazon.com/dp/B0HF8MJ8YG",
      tag: "Hair Care"
    },

    {
      name: "Teeth Whitening Gel",
      price: "$22.99",
      img: "assets/teeth-whitening.jpg",
      url: "https://www.amazon.com/dp/B00CXXKR28",
      tag: "Amazon"
    },

    {
      name: "USB-C Cable",
      price: "$10",
      img: "assets/anker-cable.jpg",
      url: "https://www.microcenter.com/product/686569/anker-322-powerline-usb-a-to-usb-c-fast-charging-6ft-white",
      tag: "Tech"
    },

    {
      name: "Derma Roller",
      price: "$6.50",
      img: "assets/derma-roller.jpg",
      url: "https://www.amazon.com/dp/B0846PMST3",
      tag: "Hair Care"
    },

    {
      name: "Energy Gum",
      price: "$15",
      img: "assets/gum.jpg",
      url: "https://www.amazon.com/dp/B085S4PT6X",
      tag: "Amazon"
    },

    {
      name: "Lego Koenigsegg Jesko",
      price: "$39.99",
      img: "assets/lego.jpg",
      url: "https://www.walmart.com/ip/LEGO-Technic-Koenigsegg-Jesko-Absolut-Grey-Hypercar-Sports-Car-Building-Toy-Set-Boys-Girls-Vehicle-Racing-Kids-Buildable-Model-Kit-Sport-Toy-Motor-En/5305163212",
      tag: "Toys"
    }
  ];

  const gallery = document.getElementById('gallery');

  if (!gallery) {
    console.warn('Gallery element not found.');
    return;
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
    price.textContent = item.price || 'Check price';

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

  function render() {

    gallery.innerHTML = '';

    GIFTS.forEach((gift, index) => {
      gallery.appendChild(createCard(gift, index));
    });

    const first = gallery.querySelector('.card');

    if (first) first.tabIndex = 0;
  }

  // Keyboard navigation

  gallery.addEventListener('keydown', (e) => {

    const KEY_UP = 38;
    const KEY_DOWN = 40;

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

    const nextIndex = e.keyCode === KEY_DOWN
      ? Math.min(cards.length - 1, activeIndex + 1)
      : Math.max(0, activeIndex - 1);

    cards[nextIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    cards.forEach(c => c.tabIndex = -1);

    cards[nextIndex].tabIndex = 0;
    cards[nextIndex].focus({ preventScroll: true });

  });

  // Add gifts dynamically

  window.addGift = function(item) {

    if (!item || !item.name) return;

    GIFTS.push(item);
    render();

  };

  window.GIFTS = GIFTS;

  render();

});
