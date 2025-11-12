// script.js — final, complete, and ready
document.addEventListener('DOMContentLoaded', () => {
  const GIFTS = [
   
    { name: "Black Shower Curtain", price: "$9", img: "assets/shower.jpg", url: "https://www.amazon.com/LLSCL-Curtain-Magnets-Waterproof-Washable/dp/B09TX5WW9T?th=1", tag: "Bathroom" },
    {name: "Elite Heavy Bag", price: "$119", img: "assets/box.webp", url: "https://www.everlast.com/products/elite-heavy-bag?variant=47284478509360&country=US&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorJTjszNC2R4K8V337mpK9sICgT3MrJ-22dHre6LrCE2bOHOxRrPYM&com_cvv=8fb3d522dc163aeadb66e08cd7450cbbdddc64c6cf2e8891f6d48747c6d56d2c", tag: "Boxing" },
    { name: "Wireless Gaming Mechanical Keyboard", price: "$109", img: "assets/keyboard.png", url: "https://www.amazon.com/ZORNHER-Wireless-Mechanical-Keyboard-Hot-Swappable/dp/B0DS1SV3R1?th=1", tag: "Gaming" },
    { name: "Mini Fridge", price: "$89", img: "assets/mini.webp", url: "https://www.bestbuy.com/product/insignia-1-7-cu-ft-mini-fridge-with-energy-star-certification-black/J2FPJK8HWZ/sku/6145100?utm_source=feed?extStoreId=562", tag: "Appliances" },
    {name: "Adidas Free-Standing Cobra Bag", price: "$100", img: "assets/cobra.webp", url: "https://www.dickssportinggoods.com/p/adidas-free-standing-cobra-bag-24ocsacmbtspd5grywr9/24ocsacmbtspd5grywr9?sku=26571086&srsltid=AfmBOorivezH203fvJe-vIx5B2wXNJ4GlsG4q_1XqI-D1BzdGHzFI_SC_Po", tag: "Boxing" },
    { name: "Standing Mirror", price: "$30", img: "assets/mirror.png", url: "https://www.walmart.com/ip/Full-Length-Mirror-Stand-64-x21-Floor-Aluminum-Alloy-Tempered-Glass-Body-Mirror-Free-Standing-Wall-Mounted-Door-Living-Room-Black/12481201590?wmlspartner=wlpa&selectedSellerId=101122433&selectedOfferId=02959D3455853418B176D121FAE3FDF9&conditionGroupCode=1&adid=2222222222702959D3455853418B176D121FAE3FDF9_187532167415_23149207352&wl0=&wl1=g&wl2=c&wl3=779807114832&wl4=pla-2447670879271&wl5=9012279&wl6=&wl7=&wl8=&wl9=pla&wl10=537693045&wl11=online&wl12=02959D3455853418B176D121FAE3FDF9&veh=sem&gad_source=1&gad_campaignid=23149207352&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mc6ETY67hqa5t73hmmF0oWxjceqGhDsMLscD9LCGFK4J122lphy8lhoCGQkQAvD_BwE", tag: "Room" },
    { name: "Gum", price: "$10", img: "assets/gum.png", url: "https://www.walmart.com/ip/Extra-Peppermint-Sugar-Free-Bulk-Chewing-Gum-Mega-Packs-35-pc-6-ct/785695527", tag: "Gum" },
    { name: "Lotion", price: "$15", img: "assets/lotion.png", url: "www.amazon.com/CeraVe-Moisturizing-Lotion-Hyaluronic-Fragrance/dp/B07RK4HST7/ref=sr_1_1?crid=3IPPXID8AQ82E&dib=eyJ2IjoiMSJ9.kIIzyhxPyRxheqPt413G3ZJR0yCglVzJ-p_OQxDbPz2fp-_LRdP3mN95Kvo4zQ4d31FIkRhyUgW2zZh6cqtnGaIt95ue4n_G5VNenhiGELmp9Y-XDj4IvXmijWYCRELiq9hNHRohHVwLJCwjlS3gJ8ZUrsuce67TFi34cJNgAdPOhSknHW0oqryIqmOoZS3acQxrmvTH_V_XwjtuV_wIbCZYP0KKmcJXd4Io7fQpKAh1WzI4VsMygnR76YmcRNUdlyAYoDIOxC_FszIratSnVyuTkZAd011TbnBvc4XhMf0.w_l7LkYAILT5dNOgcMgBgOf3tMW23SNjeWwqrNuvBuk&dib_tag=se&keywords=cerave+daily+moisturizing+lotion&qid=1760916163&s=beauty&sprefix=cerave+daily+moisturizing+lotion%2Cbeauty%2C172&sr=1-1", tag: "Hygene" },
    { name: "Chain", price: "Something that looks similar to this, NO PRICE RANGE.", img: "assets/chain.webp", url: "https://www.gld.com/products/cuban-link-chain-in-yellow-gold-5mm?variant=40252400238679&glp=true&g_acctid=992-150-2783&g_adgroupid=&g_adid=&g_adtype=none&g_campaign=US%2FCA_PMAX_Mixed_Men_Chains-FeedOnly_na_MCV_tROAS&g_campaignid=17890148119&g_keyword=&g_keywordid=&g_network=x&nb_adtype=pla&nb_ap=&nb_fii=&nb_kwd=&nb_li_ms=&nb_lp_ms=&nb_mi=112171950&nb_mt=&nb_pc=online&nb_pi=Shopify_US_6910203592791_40252400238679&nb_placement=&nb_ppi=&nb_ti=&nbt=nb%3Aadwords%3Ax%3A17890148119%3A%3A&utm_source=google&utm_medium=cpc&utm_campaign=17890148119&utm_campaign=&utm_agid=&utm_content=shopping&gad_source=1&gad_campaignid=17890221964&gclid=CjwKCAjwmNLHBhA4EiwA3ts3mWF4RPabkaWoOmS-NGyMu6qUSXiidNaS1jLNEQPJ7pRsbSB3yRDkgBoCnKYQAvD_BwE", tag: "Appliances" },
    { name: "Vaseline", price: "$10", img: "assets/vas.png", url: "https://www.amazon.com/Vaseline-Therapy-Cocoa-Butter-Pack/dp/B0BP1XZR5Y/ref=sxin_16_pa_sp_search_thematic_sspa?content-id=amzn1.sym.3566f435-7f05-435d-8f15-1289ee1fea99%3Aamzn1.sym.3566f435-7f05-435d-8f15-1289ee1fea99&crid=184LVR7LLM06E&cv_ct_cx=vaseline%2Blip&keywords=vaseline%2Blip&pd_rd_i=B0BP1XZR5Y&pd_rd_r=851959b8-3882-4150-a308-33a913ea8014&pd_rd_w=EJ9Qi&pd_rd_wg=OB5hL&pf_rd_p=3566f435-7f05-435d-8f15-1289ee1fea99&pf_rd_r=EN65A102BS6RNV126Q5T&qid=1760916087&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=vaseline%2Bli%2Caps%2C146&sr=1-1-e169343e-09af-4d41-85b1-8335fe8f32d0-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1", tag: "Hygene" },
    {name: "Boxing Wall Mount Target", price: "$160", img: "assets/wall.jpg", url: "https://www.amazon.com/-/zh_TW/Wall-Punching-Bag-XZZ/dp/B0CRYYD64R", tag: "Boxing" },
    { name: "Live Desk Plant / Plant Port", price: "$25", img: "assets/plant.png", url: "https://www.walmart.com/ip/American-Plant-Exchange-Spider-Plant-6-Inch-Pot-Ultimate-Easy-Care-Beginners-Houseplant-Fuss-Free-Live-Plant/5093084817?wmlspartner=wlpa&selectedSellerId=101459269", tag: "Room" },
    { name: "Different Mode Shower Head", price: "$29", img: "assets/showerhead.jpg", url: "https://www.amazon.com/Pressure-Setting-Shower-Hand-Held-Switch/dp/B0BPS7BRTL?th=1", tag: "Bathroom" },
    { name: "Face Wash Headband", price: "$5", img: "assets/face.jpg", url: "https://www.amazon.com/Qiifaiikooii-Spring-Sports-Washing-Unisex/dp/B0DBQGN5MW/ref=sr_1_8?adgrpid=185812485545&dib=eyJ2IjoiMSJ9.N_mQOj4sTQHch-iFKQr21z64v-rR5DpvVujYAX5_kdmcHvI97M4sJDmu1P3kdd-NI1mw8Vh6gfBbpuZ3A2YWRLZyN60IhIJIzrk9AwBQGaRRCmOHi0WWnJBl22MMzbBo5PZuEC0p5GPW4RddK64LBW7TEMvaGAvYHLdugGnAOsQGTZCE1JDdwWw2wwzupuMiReRcw9bIQqtyiNzDkQUqfLZGI6HqnKvuSWDDPRSwEhORbH3d-3nOkjpBZe4itT54m3ey9sTmGsKMROpsh3x4DK-H8ufDtzvKBpC_l93fzQI.yW0k7pI1dHBx4iGYRAXKYhpKkMiZiVTSjO7fjtv7r8Q&dib_tag=se&hvadid=779573150628&hvdev=c&hvexpln=0&hvlocphy=9012279&hvnetw=g&hvocijid=6924681558487693994--&hvqmt=e&hvrand=6924681558487693994&hvtargid=kwd-2193172834978&hydadcr=13892_13707906_2341066&keywords=men%27s+face+wash+headband&mcid=5a6c098b5bef3b25a1d3aa36aa2c47fc&qid=1762984496&sr=8-8", tag: "Hygene" },
    { name: "Grip Strengthener Set", price: "$17", img: "assets/hand.jpg", url: "https://www.amazon.com/Strengthener-FitBeast-Adjustable-Resistance-Exerciser/dp/B07G824Z3V/ref=sr_1_18?dib=eyJ2IjoiMSJ9.um_Jq7rIF_f8G43f69LS60FCKDE9MFVCuEcvD7ysplSPSboh_xRaWlxze3Mc2sul1DI08zlBYydMYsByRqKs5Q1N2UB1qgaDBouNaqYBHuFYGyVjcWoTv8LhTIkqpUd_pgnIBWXQVc6gr--tEtXGMxtmj77eCrst8TZ8hhwYNfqWge1o3U10L0sAzHXHrlDa_F18qFlQVeq1AnnFave9FdE_qOxBprVVOlFTbdN9mugd5FRdvpHh77XYJYVbHHUed8DlmVkd8nVGF-NYBHmd1s1iIza9B4UzgnONjTaLdFM.L8Jzeu_k30obL2EcSW97lpju9BoAChFNVdIhNQ75IYM&dib_tag=se&keywords=workout&sprefix=workout%2Caps%2C159&th=1&tag=gowish06-20", tag: "Fitness" },
    {name: "Pimple Patch", price: "$22", img: "assets/pimple.jpg", url: "https://www.amazon.com/Mighty-PatchTM-Original-Patch-Hydrocolloid/dp/B0DNR8RF83/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.kdhnNHHFpFrA3Qk7xQtL0K3bC9ZaWnV8lhtm0bcsDNfT285Vu2izSfwmMMoHqFQn5SdD7huhMfb3ItqchWZx6TTvFgB2h5f96Bms-K9lF-lNZiQMNBR9Z2LiNi2fAjemjRC-79yShKOrY3j3LVbBJpvwhrG6Un1pFIh6iHJ1LF3jCyyien42ArKWKKv6b2VmtTrXit5MlvCG8R22OKR7AncPhM-NXvwociyzGIaNg1hq5Lv2Qc1_XtVW8l_bOfbWhiKR4CwM0ilmRg1EW2fuM5WbwbZroR_v_mOPWD1uw30.oDmaH0V7KyeEjcHLh4jQZ9kk7240lju1WU2L9lkmuhA&dib_tag=se&hvadid=675391475645&hvdev=c&hvexpln=0&hvlocphy=9012279&hvnetw=g&hvocijid=326134024235562592--&hvqmt=b&hvrand=326134024235562592&hvtargid=kwd-1560367493437&hydadcr=7666_13589697&keywords=pimple%2Bpatch%2Btop%2Brated&mcid=e9421428093631cdbb5c1834ddca8957&qid=1762987340&rdc=1&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1", tag: "Hygene" },
    { name: "Sweatpants", price: "$40", img: "assets/sweat.webp", url: "https://woolenmaker.com/products/linden-scimitar-sweatpants-grey", tag: "Clothing" },
    { name: "Birkenstocks", price: "$30", img: "assets/birk.webp", url: "https://us.shein.com/goods-p-88463413.html?goods_id=88463413&test=5051&url_from=adhub512561739&scene=1&pf=google&ad_type=DPA&language=en&siteuid=us&version_bid=101682411,101507551,100710741,101545096,101682511&version_eid=100647471&landing_page_id=1510&ad_test_id=43250&requestId=olw-56zg85bl1bft&cid=22665302293&gad_source=4&skucode=I54sm6dz5p3s&onelink=0/googlefeed_us&network=g&gad_campaignid=22665302293&gclid=CjwKCAiA_dDIBhB6EiwAvzc1cNljRF_6btQ2RxrByjqBNOd7mFx0y5zOZ8Yu-0P5fHEN9oHB9AanxRoCFKIQAvD_BwE&adid=757471769035&tv_b=2&geoid=9012279&setid=180466275323&kwd=pla-2437153638215&currency=USD&lang=us", tag: "Shoes" },
    { name: "Air Force 1s", price: "$125", img: "assets/af1.avif", url: "https://www.nike.com/t/air-force-1-07-wb-mens-shoes-XVPIszaq?_android_redirect=https%3A%2F%2Fwww.nike.com%2Ft%2Fair-force-1-07-wb-mens-shoes-txRBM6%2FCJ9179-200&_fallback_redirect=https%3A%2F%2Fwww.nike.com%2Ft%2Fair-force-1-07-wb-mens-shoes-txRBM6%2FCJ9179-200&_ios_redirect=https%3A%2F%2Fwww.nike.com%2Ft%2Fair-force-1-07-wb-mens-shoes-txRBM6%2FCJ9179-200&cid=4942550&cjevent=daf93c0ec01a11f0812300380a82b838&cl=daf93c0ec01a11f0812300380a82b838&cp=usns_aff_nike_content_PID_100416457_Onskeskyen+ApS&pcn=cj_mobile_inactivity-0d&pcrid=15734707&pcrn=CJ&psid=100416457&psn=Onskeskyen+ApS&referrer=singular_click_id%3Dd3b8b254-90a6-49f0-be74-c1ac863cbf13&sl_id=jjo0", tag: "Shoes" },
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
