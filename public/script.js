/**
 * DecorLux — script.js
 * Frontend JavaScript for the Event Decoration Booking Platform
 * © 2026 Saif. All Rights Reserved.
 */

'use strict';

/* =====================================================
   DATA — packages, add-ons, reviews, cities, etc.
   ===================================================== */

const PACKAGES = [
  {
    id: 'bliss-starter',
    title: 'Bliss Starter',
    tag: 'Most Affordable',
    desc: 'Perfect for intimate birthday celebrations with essential decorations and vibrant balloon arrangements.',
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    inclusions: ['🎈 Balloons', '📸 Backdrop', '💡 Lights', '🎀 Ribbons'],
    featured: false,
  },
  {
    id: 'golden-elegance',
    title: 'Golden Elegance',
    tag: 'Best Value',
    desc: 'A premium experience with floral arrangements, LED lighting, a professional backdrop and personalized touches.',
    price: 1899,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    inclusions: ['🌸 Flowers', '🎈 Balloons', '📸 Backdrop', '💡 LED Lights', '🎂 Cake Stand'],
    featured: true,
  },
  {
    id: 'royal-extravaganza',
    title: 'Royal Extravaganza',
    tag: 'Luxury',
    desc: 'The ultimate luxury decoration with floral ceiling drapes, crystal chandeliers and bespoke artisan pieces.',
    price: 2499,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    inclusions: ['👑 Full Setup', '🌸 Florals', '🕯️ Candles', '💡 Chandelier', '📸 Backdrop', '🎊 Streamers'],
    featured: false,
  },
  {
    id: 'bridal-bliss',
    title: 'Bridal Bliss',
    tag: 'Wedding',
    desc: 'A romantic wedding stage with cascading flowers, soft draping and warm golden lighting for your special day.',
    price: 3999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80',
    inclusions: ['🌹 Rose Setup', '🎪 Stage Decor', '💡 Warm Lights', '🎊 Draping'],
    featured: false,
  },
  {
    id: 'sweet-arrival',
    title: 'Sweet Arrival',
    tag: 'Baby Shower',
    desc: 'Pastel-themed baby shower decor with cloud balloons, teddy bears and soft floral arrangements.',
    price: 1599,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    inclusions: ['☁️ Cloud Setup', '🧸 Teddies', '🎈 Balloons', '🌸 Flowers'],
    featured: false,
  },
  {
    id: 'love-story',
    title: 'Love Story',
    tag: 'Proposal',
    desc: 'A romantic proposal setup with rose petals, candles, fairy lights and a personalized message board.',
    price: 1299,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
    inclusions: ['🌹 Rose Petals', '🕯️ Candles', '💌 Message', '✨ Fairy Lights'],
    featured: false,
  },
];

const ADDONS = [
  { id: 'cake',     name: 'Custom Cake',        price: 599, icon: '🎂' },
  { id: 'led',      name: 'LED Light Wall',      price: 399, icon: '💡' },
  { id: 'roses',    name: 'Rose Petals (500g)',  price: 199, icon: '🌹' },
  { id: 'teddy',    name: 'Giant Teddy Bear',    price: 499, icon: '🧸' },
  { id: 'photo',    name: 'Photo Slideshow',     price: 299, icon: '📸' },
  { id: 'balloon',  name: 'Extra Balloons (50)', price: 149, icon: '🎈' },
  { id: 'fog',      name: 'Fog Machine',         price: 349, icon: '🌫️' },
  { id: 'confetti', name: 'Confetti Cannon',     price: 249, icon: '🎊' },
];

const INCLUSIONS_DATA = [
  { icon: '🎈', title: 'Balloons',       desc: 'Premium latex & foil balloons' },
  { icon: '💡', title: 'LED Lights',     desc: 'String & fairy lights setup' },
  { icon: '📸', title: 'Backdrop',       desc: 'Custom photo backdrop' },
  { icon: '🌸', title: 'Fresh Flowers',  desc: 'Seasonal floral arrangements' },
  { icon: '🎀', title: 'Ribbons & Bows', desc: 'Decorative finishing touches' },
  { icon: '🕯️', title: 'Candles',        desc: 'Elegant candle arrangement' },
  { icon: '🎊', title: 'Streamers',      desc: 'Colorful celebration streamers' },
  { icon: '📋', title: 'Setup & Cleanup',desc: 'Full professional service' },
];

const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=90', cat: 'birthday',    label: '🎂 Luxury Birthday',     wide: true },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=90', cat: 'wedding',     label: '💍 Outdoor Wedding' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=90', cat: 'wedding',     label: '✨ Indoor Wedding Stage', tall: true },
  { src: 'https://images.unsplash.com/photo-1559181567-c3190ca9be46?w=600&q=90', cat: 'birthday',    label: '🎈 Balloon Arch' },
  { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=90', cat: 'anniversary', label: '💑 Anniversary Setup' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=90', cat: 'proposal',   label: '💐 Rose Proposal',        wide: true },
  { src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=90', cat: 'babyshower', label: '🍼 Baby Shower' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&q=90', cat: 'birthday',   label: '🎊 Party Setup' },
];

const REVIEWS = [
  { name: 'Priya Sharma',   city: 'Patna, Bihar',     initials: 'P', color1: '#C9A84C', color2: '#E8A0A8', stars: 5, text: '"Absolutely stunning birthday setup for my daughter! The balloon arch was gorgeous and the team arrived on time. Worth every rupee!"' },
  { name: 'Rahul Verma',    city: 'Delhi, NCR',        initials: 'R', color1: '#E8A0A8', color2: '#C07080', stars: 5, text: '"Booked the Golden Elegance package for our anniversary and it was magical. My wife cried happy tears. Highly recommend!"' },
  { name: 'Anjali Singh',   city: 'Mumbai, MH',        initials: 'A', color1: '#90CAF9', color2: '#42A5F5', stars: 5, text: '"The proposal setup was beyond perfect. Rose petals, candles, fairy lights — he said YES! Thank you DecorLux!"' },
  { name: 'Mohammed Ali',   city: 'Hyderabad, TS',     initials: 'M', color1: '#A5D6A7', color2: '#66BB6A', stars: 5, text: '"5-star service from booking to cleanup. The wedding stage looked like it was from a Bollywood movie!"' },
  { name: 'Neha Gupta',     city: 'Bengaluru, KA',     initials: 'N', color1: '#FFCC80', color2: '#FFA726', stars: 5, text: '"My baby shower was a dream. The pastel cloud setup was so aesthetic. Everyone kept complimenting the decorations!"' },
  { name: 'Saif Khan',      city: 'Patna, Bihar',      initials: 'S', color1: '#CE93D8', color2: '#AB47BC', stars: 5, text: '"As the founder, I\'m proud of every setup our team creates. We put our hearts into making your moments magical. Thank you!"' },
];

const CITIES = [
  { icon: '🏙️', name: 'Patna',      count: '200+ setups' },
  { icon: '🕌', name: 'Delhi NCR',  count: '1200+ setups' },
  { icon: '🌊', name: 'Mumbai',     count: '900+ setups' },
  { icon: '🌿', name: 'Bengaluru',  count: '700+ setups' },
  { icon: '💎', name: 'Hyderabad',  count: '500+ setups' },
  { icon: '🎭', name: 'Kolkata',    count: '400+ setups' },
];

const FAQS = [
  { q: 'How early should I book in advance?', a: 'We recommend booking at least 24–48 hours in advance. For weekends and festivals, book 3–5 days ahead for the best slot availability.' },
  { q: 'What areas do you cover?', a: 'We currently operate in Patna, Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Kolkata. More cities coming soon!' },
  { q: 'Do you provide setup and cleanup?', a: 'Yes! Every package includes professional setup and full cleanup after your event. No extra charges ever.' },
  { q: 'Can I customize my decoration?', a: 'Absolutely! You can choose from our add-ons during booking, or contact us via WhatsApp for completely custom requests.' },
  { q: 'What is your refund and cancellation policy?', a: 'Full refund if cancelled 48+ hours before. 50% refund for 24–48 hours. No refund within 24 hours of the event.' },
  { q: 'Do you offer same-day booking?', a: 'Same-day bookings are subject to availability. Place your order before 10AM for same-day evening slots.' },
  { q: 'Is payment secure?', a: 'Yes, all payments are processed through Razorpay using 256-bit SSL encryption. We support UPI, cards, and net banking.' },
];

const COUPONS = {
  'SAIF20':   { type: 'percent', value: 20, label: '🎉 20% discount applied! Code: SAIF20' },
  'FIRST50':  { type: 'flat',    value: 500, label: '🎉 ₹500 flat discount applied!' },
  'LOVE15':   { type: 'percent', value: 15, label: '🎉 15% discount applied! Code: LOVE15' },
};

const OCCASION_OPTIONS = [
  { icon: '🎂', name: 'Birthday' },
  { icon: '💑', name: 'Anniversary' },
  { icon: '💍', name: 'Wedding' },
  { icon: '💐', name: 'Proposal' },
  { icon: '🍼', name: 'Baby Shower' },
  { icon: '🎉', name: 'Other' },
];

const TIME_SLOTS = [
  { time: '7:00 AM',  available: true },
  { time: '8:00 AM',  available: true },
  { time: '9:00 AM',  available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '2:00 PM',  available: true },
  { time: '4:00 PM',  available: true },
  { time: '6:00 PM',  available: true },
  { time: '7:00 PM',  available: true },
  { time: '8:00 PM',  available: false },
  { time: '9:00 PM',  available: true },
];

const CHAT_RESPONSES = {
  'view packages': 'We have 6 amazing packages! 🎈<br><br>• <b>Bliss Starter</b> — ₹799<br>• <b>Golden Elegance</b> — ₹1,899 ⭐<br>• <b>Royal Extravaganza</b> — ₹2,499<br>• <b>Bridal Bliss</b> — ₹3,999<br>• <b>Sweet Arrival</b> — ₹1,599<br>• <b>Love Story</b> — ₹1,299',
  'pricing info': 'Our packages start from just <b>₹799!</b> 💰<br><br>Use coupon codes for extra savings:<br>• <b>SAIF20</b> — 20% off<br>• <b>FIRST50</b> — ₹500 flat off<br>• <b>LOVE15</b> — 15% off',
  'book now': '📅 You can click the <b>"Book Now"</b> button to open our 6-step booking form. Choose occasion, date, add-ons, and pay — all in under 2 minutes!',
  'track order': '🔍 Scroll to the <b>"Track Your Order"</b> section and enter your booking reference ID (starts with DL-2026-). You\'ll see live status updates!',
  'coupon codes': '🎟️ Available coupon codes:<br><br>• <b>SAIF20</b> — 20% off your order<br>• <b>FIRST50</b> — ₹500 flat discount<br>• <b>LOVE15</b> — 15% off<br><br>Apply them in Step 4 of the booking form!',
  'default': '😊 I\'m here to help! You can ask me about packages, pricing, bookings, tracking, or coupons. What would you like to know?',
};

/* =====================================================
   BOOKING STATE
   ===================================================== */
const bookingState = {
  currentStep: 1,
  totalSteps: 6,
  occasion: '',
  date: '',
  timeSlot: '',
  shift: '',
  addons: [],       // array of { id, name, price }
  packageName: '',
  basePrice: 0,
  coupon: '',
  discount: 0,
  name: '',
  phone: '',
  email: '',
  address: '',
  city: 'Patna',
  bookingRef: '',
};

/* =====================================================
   PAGE LOADER
   ===================================================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }, 1800);
});

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
const cursorDot      = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left      = mouseX + 'px';
  cursorDot.style.top       = mouseY + 'px';
});

// Smooth follower using rAF
(function animateFollower() {
  let fx = 0, fy = 0;
  function loop() {
    fx += (mouseX - fx) * 0.18;
    fy += (mouseY - fy) * 0.18;
    cursorFollower.style.left = fx + 'px';
    cursorFollower.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

// Cursor hover effect
const hoverEls = document.querySelectorAll('a, button, .occasion-chip, .package-card, .gallery-item, .city-card, .occasion-card, .addon-card, .pay-method, .ai-tag');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovered'));
});

/* =====================================================
   NAVBAR SCROLL + MOBILE
   ===================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.getElementById('navLinks');
  links.classList.toggle('mobile-open');
});

/* =====================================================
   FLOATING PARTICLES
   ===================================================== */
(function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left             = Math.random() * 100 + '%';
    const size               = 2 + Math.random() * 4;
    p.style.width            = size + 'px';
    p.style.height           = size + 'px';
    p.style.animationDuration  = (8 + Math.random() * 14) + 's';
    p.style.animationDelay     = (Math.random() * 12) + 's';
    container.appendChild(p);
  }
})();

/* =====================================================
   HERO COUNTER ANIMATION
   ===================================================== */
function animateCounters() {
  const suffix = { 5000: '+', 50: '+', 6: '+', 99: '%' };
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    const suf = suffix[target] || '';
    let count = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count).toLocaleString('en-IN') + suf;
      if (count >= target) clearInterval(timer);
    }, 35);
  });
}

new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
  }
}, { threshold: 0.4 }).observe(document.getElementById('hero'));

/* =====================================================
   HERO OCCASION CHIPS
   ===================================================== */
document.getElementById('occasionChips').addEventListener('click', (e) => {
  const chip = e.target.closest('.occasion-chip');
  if (!chip) return;
  document.querySelectorAll('.occasion-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  bookingState.occasion = chip.dataset.occasion;
});

/* =====================================================
   BUILD DYNAMIC SECTIONS
   ===================================================== */

// Inclusions
function buildInclusions() {
  const grid = document.getElementById('inclusionsGrid');
  grid.innerHTML = INCLUSIONS_DATA.map(item => `
    <div class="inclusion-card">
      <span class="icon">${item.icon}</span>
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
    </div>
  `).join('');
}

// Packages
function buildPackages() {
  const grid = document.getElementById('packagesGrid');
  grid.innerHTML = PACKAGES.map((pkg, i) => {
    const discount = Math.round((1 - pkg.price / pkg.originalPrice) * 100);
    return `
      <div class="package-card ${pkg.featured ? 'featured' : ''}" style="transition-delay:${(i % 3) * 0.1}s">
        ${pkg.featured ? '<div class="featured-badge">⭐ Most Popular</div>' : ''}
        <div class="package-img">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" />
          <div class="package-overlay"></div>
          <div class="package-tag">${pkg.tag}</div>
        </div>
        <div class="package-body">
          <div class="package-title">${pkg.title}</div>
          <p class="package-desc">${pkg.desc}</p>
          <div class="package-inclusions">
            ${pkg.inclusions.map(inc => `<span class="inclusion-tag">${inc}</span>`).join('')}
          </div>
          <div class="package-footer">
            <div class="package-price">
              <span class="price-original">₹${pkg.originalPrice.toLocaleString('en-IN')}</span>
              <span class="price-current">
                ₹${pkg.price.toLocaleString('en-IN')}
                <span class="discount-badge">-${discount}%</span>
              </span>
            </div>
            <button class="btn-book" data-pkg-name="${pkg.title}" data-pkg-price="${pkg.price}">
              <i class="fas fa-plus"></i> Book Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Book buttons
  document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.pkgName, +btn.dataset.pkgPrice);
    });
  });
}

// Gallery
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = GALLERY_ITEMS.map(item => `
    <div class="gallery-item ${item.wide ? 'wide' : ''} ${item.tall ? 'tall' : ''}" data-cat="${item.cat}">
      <img src="${item.src}" alt="${item.label}" loading="lazy" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-label">${item.label}</span>
      </div>
    </div>
  `).join('');
}

// Gallery filter
document.getElementById('galleryFilters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.cat;
  document.querySelectorAll('.gallery-item').forEach(item => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.transition = 'opacity 0.4s, transform 0.4s';
    if (show) {
      item.style.display = '';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 10);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(() => { item.style.display = 'none'; }, 400);
    }
  });
});

// Reviews
function buildReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = REVIEWS.map((r, i) => `
    <div class="review-card" style="transition-delay:${(i % 3) * 0.1}s">
      <div class="review-header">
        <div class="avatar-placeholder" style="background:linear-gradient(135deg,${r.color1},${r.color2})">
          ${r.initials}
        </div>
        <div class="review-meta">
          <div class="reviewer-name">${r.name}</div>
          <div class="reviewer-city"><i class="fas fa-map-marker-alt"></i> ${r.city}</div>
          <div class="stars">${'★'.repeat(r.stars)}</div>
        </div>
      </div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join('');
}

// Cities
function buildCities() {
  const grid = document.getElementById('citiesGrid');
  grid.innerHTML = CITIES.map(c => `
    <div class="city-card" data-city="${c.name}">
      <div class="city-icon">${c.icon}</div>
      <div class="city-name">${c.name}</div>
      <div class="city-count">${c.count}</div>
      <div class="city-active">📍 Your City</div>
    </div>
  `).join('');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.city-card');
    if (!card) return;
    document.querySelectorAll('.city-card').forEach(c => c.classList.remove('user-city'));
    card.classList.add('user-city');
    showToast('📍 Selected: ' + card.dataset.city);
  });
}

// FAQ
function buildFAQ() {
  const list = document.getElementById('faqList');
  list.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" data-index="${i}">
        ${faq.q}
        <div class="faq-icon"><i class="fas fa-plus"></i></div>
      </button>
      <div class="faq-answer"><p>${faq.a}</p></div>
    </div>
  `).join('');

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-answer').style.maxHeight = '0';
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
}

// Modal occasion grid
function buildModalOccasions() {
  const grid = document.getElementById('modalOccasionGrid');
  grid.innerHTML = OCCASION_OPTIONS.map(o => `
    <div class="occasion-card" data-occasion="${o.name}">
      <div class="occasion-icon">${o.icon}</div>
      <div class="occasion-name">${o.name}</div>
    </div>
  `).join('');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.occasion-card');
    if (!card) return;
    document.querySelectorAll('.occasion-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    bookingState.occasion = card.dataset.occasion;
  });
}

// Time slots
function buildTimeSlots() {
  const container = document.getElementById('timeSlots');
  container.innerHTML = TIME_SLOTS.map(slot => `
    <button class="time-slot ${slot.available ? '' : 'unavailable'}" 
            ${slot.available ? '' : 'disabled'}
            data-time="${slot.time}">
      ${slot.time}
    </button>
  `).join('');

  container.addEventListener('click', (e) => {
    const slot = e.target.closest('.time-slot:not(.unavailable)');
    if (!slot) return;
    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');
    bookingState.timeSlot = slot.dataset.time;
  });
}

// Add-ons grid
function buildAddons() {
  const grid = document.getElementById('addonsGrid');
  grid.innerHTML = ADDONS.map(a => `
    <div class="addon-card" data-id="${a.id}" data-price="${a.price}" data-name="${a.name}">
      <div class="addon-icon">${a.icon}</div>
      <div class="addon-info">
        <div class="addon-name">${a.name}</div>
        <div class="addon-price">+₹${a.price}</div>
      </div>
    </div>
  `).join('');

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.addon-card');
    if (!card) return;
    card.classList.toggle('selected');
    const id    = card.dataset.id;
    const price = +card.dataset.price;
    const name  = card.dataset.name;

    if (card.classList.contains('selected')) {
      if (!bookingState.addons.find(a => a.id === id)) {
        bookingState.addons.push({ id, price, name });
      }
    } else {
      bookingState.addons = bookingState.addons.filter(a => a.id !== id);
    }
    updatePriceDisplay();
  });
}

/* =====================================================
   LIVE PRICE CALCULATION
   ===================================================== */
function calcTotal() {
  const base       = bookingState.basePrice || 0;
  const addonsSum  = bookingState.addons.reduce((s, a) => s + a.price, 0);
  const raw        = base + addonsSum;
  let discount     = 0;

  if (bookingState.coupon && COUPONS[bookingState.coupon]) {
    const c = COUPONS[bookingState.coupon];
    discount = c.type === 'percent'
      ? Math.round(raw * c.value / 100)
      : Math.min(c.value, raw);
  }

  bookingState.discount = discount;
  return { base, addonsSum, raw, discount, total: raw - discount };
}

function updatePriceDisplay() {
  const { base, addonsSum, discount, total } = calcTotal();

  setText('basePrice',   '₹' + base.toLocaleString('en-IN'));
  setText('addonsTotal', '₹' + addonsSum.toLocaleString('en-IN'));
  setText('discountAmt', '-₹' + discount.toLocaleString('en-IN'));
  setText('totalPrice',  '₹' + total.toLocaleString('en-IN'));

  toggle('addonsPriceRow', addonsSum > 0);
  toggle('discountRow',    discount  > 0);
}

function updatePaymentSummary() {
  const { addonsSum, discount, total } = calcTotal();

  setText('payPackageName', bookingState.packageName || '—');
  setText('payAddons',  '₹' + addonsSum.toLocaleString('en-IN'));
  setText('payDiscount', '-₹' + discount.toLocaleString('en-IN'));
  setText('payTotal',   '₹' + total.toLocaleString('en-IN'));

  toggle('payDiscountRow', discount > 0);
}

/* =====================================================
   COUPON
   ===================================================== */
document.getElementById('applyCouponBtn').addEventListener('click', applyCoupon);

function applyCoupon() {
  const code    = document.getElementById('couponInput').value.trim().toUpperCase();
  const msgEl   = document.getElementById('couponMsg');
  msgEl.className = 'coupon-msg';

  if (COUPONS[code]) {
    bookingState.coupon = code;
    msgEl.textContent   = COUPONS[code].label;
    msgEl.classList.add('success');
    updatePriceDisplay();
    showToast('🎉 Coupon applied successfully!');
  } else {
    bookingState.coupon = '';
    bookingState.discount = 0;
    msgEl.textContent   = '❌ Invalid coupon code. Try SAIF20, FIRST50, or LOVE15';
    msgEl.classList.add('error');
    updatePriceDisplay();
  }
}

/* =====================================================
   ORDER TRACKING
   ===================================================== */
document.getElementById('trackBtn').addEventListener('click', trackOrder);
document.getElementById('trackingInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') trackOrder();
});

function trackOrder() {
  const id = document.getElementById('trackingInput').value.trim();
  if (!id) { showToast('⚠️ Please enter a booking ID'); return; }

  const resultEl = document.getElementById('trackingResult');
  const emptyEl  = document.getElementById('trackingEmpty');
  resultEl.style.display = 'block';
  emptyEl.style.display  = 'none';

  const statuses = [
    { icon: '✅', title: 'Booking Confirmed',  desc: 'Your booking has been received and confirmed.',        state: 'done'   },
    { icon: '👤', title: 'Decorator Assigned', desc: 'A professional decorator has been assigned.',          state: 'done'   },
    { icon: '🚚', title: 'On the Way',          desc: 'Our team is heading to your venue with all materials.', state: 'active' },
    { icon: '🎨', title: 'Setup in Progress',  desc: 'Decorations are being set up at your venue.',          state: ''       },
    { icon: '🎉', title: 'Completed',           desc: 'Your decoration setup is complete. Enjoy your event!', state: ''       },
  ];

  document.getElementById('timeline').innerHTML = statuses.map(s => `
    <div class="timeline-item ${s.state}">
      <div class="timeline-dot">${s.icon}</div>
      <div class="timeline-info">
        <div class="timeline-title">${s.title}</div>
        <div class="timeline-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

/* =====================================================
   AI RECOMMENDATION
   ===================================================== */
const aiSelected = new Set();

document.getElementById('aiTags').addEventListener('click', (e) => {
  const tag = e.target.closest('.ai-tag');
  if (!tag) return;
  tag.classList.toggle('selected');
  const v = tag.dataset.val;
  aiSelected.has(v) ? aiSelected.delete(v) : aiSelected.add(v);
});

document.getElementById('aiRecommendBtn').addEventListener('click', getAiRecommendation);

document.getElementById('aiBookBtn').addEventListener('click', () => openModal());

function getAiRecommendation() {
  if (aiSelected.size === 0) {
    showToast('⚠️ Please select at least one preference');
    return;
  }

  let rec = '';
  if (aiSelected.has('luxury') || aiSelected.has('large') || aiSelected.has('wedding')) {
    rec = '👑 <strong>Royal Extravaganza (₹2,499)</strong> — Based on your preferences for a grand experience, this package with crystal chandeliers, floral drapes, and full venue transformation is perfect for you. Pair with the LED Light Wall and Photo Slideshow add-ons for an unforgettable evening.';
  } else if (aiSelected.has('birthday') && aiSelected.has('budget')) {
    rec = '🎈 <strong>Bliss Starter (₹799)</strong> — Perfect for an intimate birthday! You get balloons, backdrop, and lights at an unbeatable price. Add the Custom Cake add-on for just ₹599 to make it extra special!';
  } else if (aiSelected.has('proposal') || aiSelected.has('anniversary')) {
    rec = '💐 <strong>Love Story (₹1,299)</strong> — Romantic rose petals, candles, and fairy lights — this package is made for intimate moments. Pair it with Rose Petals and Confetti Cannon add-ons for maximum impact!';
  } else if (aiSelected.has('babyshower')) {
    rec = '☁️ <strong>Sweet Arrival (₹1,599)</strong> — Our beautiful pastel-themed baby shower package with cloud balloons, teddies, and soft florals. Add the Photo Slideshow add-on to capture all the precious moments!';
  } else if (aiSelected.has('budget') || aiSelected.has('small') || aiSelected.has('indoor')) {
    rec = '✨ <strong>Golden Elegance (₹1,899)</strong> — Our most popular package! A beautiful blend of flowers, balloons, LED lights and a custom backdrop. Perfect for indoor events with up to 30 guests.';
  } else {
    rec = '⭐ <strong>Golden Elegance (₹1,899)</strong> — Based on your selections, this versatile package covers all the bases. It\'s our most-booked package with 1,800+ happy customers and a 4.9★ rating!';
  }

  document.getElementById('aiResultTitle').textContent = '✦ AI Recommendation for You';
  document.getElementById('aiResultText').innerHTML    = rec;
  document.getElementById('aiResult').classList.add('show');
}

/* =====================================================
   AI CHATBOT
   ===================================================== */
const chatFab    = document.getElementById('chatFab');
const chatBubble = document.getElementById('chatBubble');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');

chatFab.addEventListener('click', ()   => chatBubble.classList.toggle('open'));
chatClose.addEventListener('click', () => chatBubble.classList.remove('open'));

document.getElementById('chatSuggestions').addEventListener('click', (e) => {
  const btn = e.target.closest('.chat-suggest');
  if (!btn) return;
  const msg = btn.dataset.msg;
  if (msg === 'Book Now') { openModal(); chatBubble.classList.remove('open'); return; }
  if (msg === 'Track Order') { document.getElementById('tracking').scrollIntoView({ behavior: 'smooth' }); chatBubble.classList.remove('open'); return; }
  addChatMsg(msg, 'user');
  setTimeout(() => addChatMsg(getChatResponse(msg), 'bot'), 600);
});

chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addChatMsg(msg, 'user');
  chatInput.value = '';
  setTimeout(() => addChatMsg(getChatResponse(msg), 'bot'), 650);
}

function getChatResponse(msg) {
  const lower = msg.toLowerCase();
  const key   = Object.keys(CHAT_RESPONSES).find(k => lower.includes(k));
  return CHAT_RESPONSES[key] || CHAT_RESPONSES['default'];
}

function addChatMsg(html, role) {
  const msgs = document.getElementById('chatMessages');
  const div  = document.createElement('div');
  div.className  = 'chat-msg ' + role;
  div.innerHTML  = html;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

/* =====================================================
   BOOKING MODAL
   ===================================================== */
// Open
function openModal(pkgName, price) {
  if (pkgName) {
    bookingState.packageName = pkgName;
    bookingState.basePrice   = price;
  }
  // Reset addons selection UI
  bookingState.addons   = [];
  bookingState.coupon   = '';
  bookingState.discount = 0;

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';

  gotoStep(1);
  updatePriceDisplay();

  // Set min date (tomorrow)
  const tomorrow = new Date(Date.now() + 86400000);
  document.getElementById('bookingDate').min = tomorrow.toISOString().split('T')[0];

  // Pre-select occasion in modal if already chosen
  if (bookingState.occasion) {
    document.querySelectorAll('.occasion-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.occasion === bookingState.occasion);
    });
  }

  // Clear addon selections
  document.querySelectorAll('.addon-card').forEach(c => c.classList.remove('selected'));

  // Clear coupon UI
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMsg').textContent = '';
  document.getElementById('couponMsg').className = 'coupon-msg';
}

// Close
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// Step navigation
document.getElementById('btnNext').addEventListener('click', nextStep);
document.getElementById('btnPrev').addEventListener('click', prevStep);

function nextStep() {
  // Validation
  if (bookingState.currentStep === 1 && !bookingState.occasion) {
    showToast('⚠️ Please select an occasion'); return;
  }
  if (bookingState.currentStep === 2 && !document.getElementById('bookingDate').value) {
    showToast('⚠️ Please select a date'); return;
  }
  if (bookingState.currentStep === 4) {
    const name  = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    if (!name || !phone) { showToast('⚠️ Name and phone number are required'); return; }
    bookingState.name    = name;
    bookingState.phone   = phone;
    bookingState.email   = document.getElementById('userEmail').value.trim();
    bookingState.address = document.getElementById('userAddress').value.trim();
    bookingState.city    = document.getElementById('userCity').value;
  }
  if (bookingState.currentStep === 5) {
    simulatePayment(); return;
  }
  if (bookingState.currentStep < bookingState.totalSteps) {
    gotoStep(bookingState.currentStep + 1);
  }
}

function prevStep() {
  if (bookingState.currentStep > 1) gotoStep(bookingState.currentStep - 1);
}

function gotoStep(n) {
  bookingState.currentStep = n;

  // Panels
  document.querySelectorAll('.step-panel').forEach((p, i) => {
    p.classList.toggle('active', i + 1 === n);
  });

  // Progress bar
  document.getElementById('progressFill').style.width = (n / bookingState.totalSteps * 100) + '%';

  // Step dots
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < n)       d.classList.add('done');
    else if (i + 1 === n) d.classList.add('active');
  });

  // Footer buttons
  const prevBtn  = document.getElementById('btnPrev');
  const nextBtn  = document.getElementById('btnNext');
  const footer   = document.getElementById('modalFooter');

  prevBtn.style.visibility = (n > 1 && n < 6) ? 'visible' : 'hidden';

  if (n === 5) {
    nextBtn.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
  } else if (n === 6) {
    footer.style.display = 'none';
  } else {
    footer.style.display = '';
    nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
  }

  // Step 5 — populate payment summary
  if (n === 5) updatePaymentSummary();

  // Step 6 — generate confirmation
  if (n === 6) generateConfirmation();

  // Scroll modal to top
  document.getElementById('bookingModal').scrollTop = 0;
}

/* Payment simulation */
function simulatePayment() {
  const btn = document.getElementById('payBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely via Razorpay';
    gotoStep(6);
  }, 2200);
}

/* Payment method selection */
document.getElementById('paymentMethods').addEventListener('click', (e) => {
  const method = e.target.closest('.pay-method');
  if (!method) return;
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('selected'));
  method.classList.add('selected');
});

/* Generate confirmation */
function generateConfirmation() {
  const ref = 'DL-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  bookingState.bookingRef = ref;

  document.getElementById('bookingRef').textContent = ref;

  const { total } = calcTotal();
  document.getElementById('confirmDetails').innerHTML = `
    <div class="confirm-row"><span>Occasion</span><span>${bookingState.occasion || '—'}</span></div>
    <div class="confirm-row"><span>Package</span><span>${bookingState.packageName || 'Custom'}</span></div>
    <div class="confirm-row"><span>Date</span><span>${document.getElementById('bookingDate').value || 'TBD'}</span></div>
    <div class="confirm-row"><span>Time</span><span>${bookingState.timeSlot || document.getElementById('bookingShift').value || 'TBD'}</span></div>
    <div class="confirm-row"><span>Name</span><span>${bookingState.name}</span></div>
    <div class="confirm-row"><span>City</span><span>${bookingState.city}</span></div>
    <div class="confirm-row"><span>Total Paid</span><span style="color:var(--gold-dark);font-family:'Playfair Display',serif;font-weight:900">₹${total.toLocaleString('en-IN')}</span></div>
  `;
}

/* Track after booking */
document.getElementById('goTrackBtn').addEventListener('click', () => {
  closeModal();
  document.getElementById('trackingInput').value = bookingState.bookingRef;
  document.getElementById('tracking').scrollIntoView({ behavior: 'smooth' });
  setTimeout(trackOrder, 800);
});

document.getElementById('closeAfterConfirm').addEventListener('click', closeModal);

/* Nav book button */
document.getElementById('navBookBtn').addEventListener('click', (e) => { e.preventDefault(); openModal(); });
document.getElementById('heroBookBtn').addEventListener('click', openModal);

/* =====================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ===================================================== */
function observeElements(selector, threshold = 0.1) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/* =====================================================
   TOAST NOTIFICATION
   ===================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =====================================================
   UTILITY HELPERS
   ===================================================== */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function toggle(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? '' : 'none';
}

/* =====================================================
   INIT — build all dynamic content
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  buildInclusions();
  buildPackages();
  buildGallery();
  buildReviews();
  buildCities();
  buildFAQ();
  buildModalOccasions();
  buildTimeSlots();
  buildAddons();

  // Start scroll-reveal observers after DOM is ready
  setTimeout(() => {
    observeElements('.package-card');
    observeElements('.review-card');
    observeElements('.gallery-item');
    observeElements('.inclusion-card');
    observeElements('.city-card');
  }, 100);
});
