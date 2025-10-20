// script.js — final, complete, and ready
document.addEventListener('DOMContentLoaded', () => {
  const GIFTS = [
   
    { name: "Black Shower Curtain", price: "$9", img: "assets/shower.jpg", url: "https://www.amazon.com/LLSCL-Curtain-Magnets-Waterproof-Washable/dp/B09TX5WW9T?th=1", tag: "Bathroom" },
    {name: "Elite Heavy Bag", price: "$119", img: "assets/box.webp", url: "https://www.everlast.com/products/elite-heavy-bag?variant=47284478509360&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorJTjszNC2R4K8V337mpK9sICgT3MrJ-22dHre6LrCE2bOHOxRrPYM&com_cvv=8fb3d522dc163aeadb66e08cd7450cbbdddc64c6cf2e8891f6d48747c6d56d2c", tag: "Boxing" },
    { name: "Wireless Gaming Mechanical Keyboard", price: "$109", img: "assets/keyboard.png", url: "https://www.amazon.com/ZORNHER-Wireless-Mechanical-Keyboard-Hot-Swappable/dp/B0DS1SV3R1?th=1", tag: "Gaming" },
    { name: "Mini Fridge", price: "$89", img: "assets/mini.webp", url: "https://www.bestbuy.com/product/insignia-1-7-cu-ft-mini-fridge-with-energy-star-certification-black/J2FPJK8HWZ/sku/6145100?utm_source=feed?extStoreId=562", tag: "Appliances" },

    { name: "Standing Mirror", price: "$30", img: "assets/mirror.png", url: "https://www.walmart.com/ip/Full-Length-Mirror-Stand-64-x21-Floor-Aluminum-Alloy-Tempered-Glass-Body-Mirror-Free-Standing-Wall-Mounted-Door-Living-Room-Black/12481201590?wmlspartner=wlpa&selectedSellerId=101122433&selectedOfferId=02959D3455853418B176D121FAE3FDF9&conditionGroupCode=1&adid=2222222222702959D3455853418B176D121FAE3FDF9_187532167415_23149207352&wl0=&wl1=g&wl2=c&wl3=779807114832&wl4=pla-2447670879271&wl5=9012279&wl6=&wl7=&wl8=&wl9=pla&wl10=537693045&wl11=online&wl12=02959D3455853418B176D121FAE3FDF9&veh=sem&gad_source=1&gad_campaignid=23149207352&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mc6ETY67hqa5t73hmmF0oWxjceqGhDsMLscD9LCGFK4J122lphy8lhoCGQkQAvD_BwE", tag: "Room" },
    { name: "Gum", price: "$10", img: "assets/gum.png", url: "https://www.walmart.com/ip/Extra-Peppermint-Sugar-Free-Bulk-Chewing-Gum-Mega-Packs-35-pc-6-ct/785695527", tag: "Gum" },
    { name: "Lotion", price: "$15", img: "assets/lotion.png", url: "www.amazon.com/CeraVe-Moisturizing-Lotion-Hyaluronic-Fragrance/dp/B07RK4HST7/ref=sr_1_1?crid=3IPPXID8AQ82E&dib=eyJ2IjoiMSJ9.kIIzyhxPyRxheqPt413G3ZJR0yCglVzJ-p_OQxDbPz2fp-_LRdP3mN95Kvo4zQ4d31FIkRhyUgW2zZh6cqtnGaIt95ue4n_G5VNenhiGELmp9Y-XDj4IvXmijWYCRELiq9hNHRohHVwLJCwjlS3gJ8ZUrsuce67TFi34cJNgAdPOhSknHW0oqryIqmOoZS3acQxrmvTH_V_XwjtuV_wIbCZYP0KKmcJXd4Io7fQpKAh1WzI4VsMygnR76YmcRNUdlyAYoDIOxC_FszIratSnVyuTkZAd011TbnBvc4XhMf0.w_l7LkYAILT5dNOgcMgBgOf3tMW23SNjeWwqrNuvBuk&dib_tag=se&keywords=cerave+daily+moisturizing+lotion&qid=1760916163&s=beauty&sprefix=cerave+daily+moisturizing+lotion%2Cbeauty%2C172&sr=1-1", tag: "Hygene" },
    { name: "Chain", price: "Something that looks similar to this, NO PRICE RANGE.", img: "assets/chain.webp", url: "https://www.gld.com/products/cuban-link-chain-in-yellow-gold-5mm?variant=40252400238679&glp=true&g_acctid=992-150-2783&g_adgroupid=&g_adid=&g_adtype=none&g_campaign=US%2FCA_PMAX_Mixed_Men_Chains-FeedOnly_na_MCV_tROAS&g_campaignid=17890148119&g_keyword=&g_keywordid=&g_network=x&nb_adtype=pla&nb_ap=&nb_fii=&nb_kwd=&nb_li_ms=&nb_lp_ms=&nb_mi=112171950&nb_mt=&nb_pc=online&nb_pi=Shopify_US_6910203592791_40252400238679&nb_placement=&nb_ppi=&nb_ti=&nbt=nb%3Aadwords%3Ax%3A17890148119%3A%3A&utm_source=google&utm_medium=cpc&utm_campaign=17890148119&utm_campaign=&utm_agid=&utm_content=shopping&gad_source=1&gad_campaignid=17890221964&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mWF4RPabkaWoOmS-NGyMu6qUSXiidNaS1jLNEQPJ7pRsbSB3yRDkgBoCnKYQAvD_BwE", tag: "Appliances" },
    { name: "Vaseline", price: "$10", img: "assets/vas.png", url: "https://www.amazon.com/Vaseline-Therapy-Cocoa-Butter-Pack/dp/B0BP1XZR5Y/ref=sxin_16_pa_sp_search_thematic_sspa?content-id=amzn1.sym.3566f435-7f05-435d-8f15-1289ee1fea99%3Aamzn1.sym.3566f435-7f05-435d-8f15-1289ee1fea99&crid=184LVR7LLM06E&cv_ct_cx=vaseline%2Blip&keywords=vaseline%2Blip&pd_rd_i=B0BP1XZR5Y&pd_rd_r=851959b8-3882-4150-a308-33a913ea8014&pd_rd_w=EJ9Qi&pd_rd_wg=OB5hL&pf_rd_p=3566f435-7f05-435d-8f15-1289ee1fea99&pf_rd_r=EN65A102BS6RNV126Q5T&qid=1760916087&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=vaseline%2Bli%2Caps%2C146&sr=1-1-e169343e-09af-4d41-85b1-8335fe8f32d0-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1", tag: "Hygene" },
    
    { name: "Live Desk Plant / Plant Port", price: "$25", img: "assets/plant.png", url: "https://www.walmart.com/ip/American-Plant-Exchange-Spider-Plant-6-Inch-Pot-Ultimate-Easy-Care-Beginners-Houseplant-Fuss-Free-Live-Plant/5093084817?wmlspartner=wlpa&selectedSellerId=101459269", tag: "Room" },

    { name: "Tv Soundbar ", price: "$35", img: "assets/sound.png", url: "https://www.bestbuy.com/product/ilive-29-inch-bluetooth-soundbar-black/J7GWZ457LW/sku/6522227?utm_source=feed", tag: "Room" },
    { name: "Lego Bonsai ", price: "$55", img: "assets/lego.png", url: "https://www.lego.com/en-us/themes/adults-welcome/botanical-collection/bonsai-tree", tag: "Room" },
   
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
