const CONFIG = {
  // ganti setelah nomor resmi D'fie diberikan. format wajib 62, contoh: 6281234567890
  whatsappNumber: '628819636431',
  instagramUrl: 'https://instagram.com/',
  mapsUrl: 'https://maps.google.com/'
};

const menus = [
  {
    name: 'paket nasi box',
    desc: 'pilihan praktis untuk meeting, syukuran, arisan, dan konsumsi acara keluarga.',
    price: 'mulai dari konsultasi',
    message: "halo kak, saya mau tanya paket nasi box D'fie Catering"
  },
  {
    name: 'paket snack box',
    desc: 'cocok untuk acara kantor, sekolah, pengajian, atau tamu di rumah.',
    price: 'sesuai isi box',
    message: "halo kak, saya mau tanya paket snack box D'fie Catering"
  },
  {
    name: 'family set',
    desc: 'sajian hangat untuk makan bersama keluarga dan momen spesial di rumah.',
    price: 'custom porsi',
    message: "halo kak, saya mau tanya family set D'fie Catering"
  },
  {
    name: 'paket acara',
    desc: 'menu rapi untuk ulang tahun, syukuran, arisan, dan event kecil-menengah.',
    price: 'by request',
    message: "halo kak, saya mau tanya paket acara D'fie Catering"
  },
  {
    name: 'dessert & sweet corner',
    desc: 'sentuhan manis untuk melengkapi acara agar terasa lebih istimewa.',
    price: 'custom menu',
    message: "halo kak, saya mau tanya dessert D'fie Catering"
  },
  {
    name: 'custom menu',
    desc: 'diskusikan kebutuhan menu, budget, jumlah porsi, dan konsep acara.',
    price: 'konsultasi dulu',
    message: "halo kak, saya mau custom menu D'fie Catering"
  }
];

const faqs = [
  ['apakah bisa custom menu?', 'bisa. ceritakan kebutuhan acara, jumlah porsi, budget, dan preferensi menu melalui whatsapp.'],
  ['berapa minimal order?', 'minimal order mengikuti jenis menu dan paket. data final bisa disesuaikan setelah D\'fie memberi ketentuan operasional.'],
  ['kapan sebaiknya order?', 'disarankan order beberapa hari sebelum acara agar menu dan jadwal produksi bisa disiapkan lebih rapi.'],
  ['apakah melayani acara kantor dan sekolah?', 'ya, D\'fie bisa diarahkan untuk kebutuhan nasi box, snack box, meeting, dan konsumsi acara.'],
  ['bagaimana cara order?', 'klik tombol order via whatsapp, tulis kebutuhan acara, jumlah porsi, tanggal, area, dan menu yang diinginkan.']
];

const encode = (text) => encodeURIComponent(text);
const waLink = (message) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encode(message)}`;

document.querySelectorAll('.js-wa').forEach((link) => {
  const message = link.dataset.message || "halo kak, saya mau tanya D'fie Catering";
  link.href = waLink(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const menuGrid = document.querySelector('[data-menu-grid]');
if (menuGrid) {
  menuGrid.innerHTML = menus.map((item, index) => `
    <article class="menu-card reveal">
      <div class="menu-art" style="--i:${index}" aria-hidden="true"></div>
      <div class="menu-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-meta">
          <span class="price">${item.price}</span>
          <a class="mini-btn" href="${waLink(item.message)}" target="_blank" rel="noopener noreferrer">tanya paket</a>
        </div>
      </div>
    </article>
  `).join('');
}

const faqList = document.querySelector('[data-faq-list]');
if (faqList) {
  faqList.innerHTML = faqs.map(([q, a], index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
        ${q}<span>${index === 0 ? '−' : '+'}</span>
      </button>
      <div class="faq-answer">${a}</div>
    </div>
  `).join('');

  faqList.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-question');
    if (!button) return;
    const item = button.closest('.faq-item');
    const active = item.classList.toggle('active');
    button.setAttribute('aria-expanded', String(active));
    button.querySelector('span').textContent = active ? '−' : '+';
  });
}

const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
}

const orderForm = document.querySelector('[data-order-form]');
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(orderForm);
    const nama = form.get('nama') || 'customer';
    const kebutuhan = form.get('kebutuhan') || 'menu catering';
    const catatan = form.get('catatan') || '-';
    const message = `halo kak, saya ${nama}. saya mau tanya ${kebutuhan} D'fie Catering. catatan: ${catatan}`;
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
