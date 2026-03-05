// ================================================
// RAUF HUSEIN SOFTWARE MARKETPLACE
// World-Class Interactions & Animations
// ================================================

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initSearch();
  initHeroCanvas();
  initCounters();
  initScrollAnimations();
  initMobileMenu();
  initScrollTop();
});

// ================================================
// CUSTOM CURSOR
// ================================================
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .product-card, .cat-card, .mini-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.opacity = '1';
      dot.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.opacity = '0.6';
      dot.style.opacity = '1';
    });
  });
}

// ================================================
// NAV — scroll state
// ================================================
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  if (!nav.classList.contains('scrolled') && !nav.classList.contains('solid')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

// ================================================
// MOBILE MENU
// ================================================
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('mobile-open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ================================================
// SEARCH OVERLAY
// ================================================
const PRODUCTS = [
  { title: 'Agricultural Intelligence Platform', cat: 'Agriculture · AI/ML', color: '#22c55e', icon: 'fa-seedling', href: 'products.html#agri-intel' },
  { title: 'Hotel Management System (HMS)', cat: 'Hospitality · Full-Suite', color: '#f59e0b', icon: 'fa-hotel', href: 'products.html#hms' },
  { title: 'Ghana Payroll & HR System', cat: 'HR · Payroll', color: '#f97316', icon: 'fa-file-invoice-dollar', href: 'products.html' },
  { title: 'Ghana Election Backend', cat: 'Government · Elections', color: '#6366f1', icon: 'fa-vote-yea', href: 'products.html' },
  { title: 'Ghana Church Management System', cat: 'Community · Church', color: '#84cc16', icon: 'fa-church', href: 'products.html' },
  { title: 'MediCare Ghana', cat: 'Healthcare · Hospital', color: '#ef4444', icon: 'fa-heart-pulse', href: 'products.html#medicare' },
  { title: 'GhanaSchoolApp', cat: 'Education · Schools', color: '#06b6d4', icon: 'fa-graduation-cap', href: 'products.html#school' },
  { title: 'Architecture Engineering PM', cat: 'Construction · AEC', color: '#0ea5e9', icon: 'fa-drafting-compass', href: 'products.html' },
  { title: 'Agricultural Marketplace', cat: 'Agriculture · Marketplace', color: '#4ade80', icon: 'fa-store', href: 'products.html' },
  { title: 'Appointment Scheduling', cat: 'Services · Scheduling', color: '#f9a8d4', icon: 'fa-calendar-check', href: 'products.html' },
  { title: 'Core Banking System', cat: 'Finance · Banking', color: '#f59e0b', icon: 'fa-landmark', href: 'products.html#core-banking' },
  { title: 'Applicant Tracking Systems (ATS)', cat: 'HR · Recruitment', color: '#fb923c', icon: 'fa-user-tie', href: 'products.html' },
  { title: 'Farm Management Systems', cat: 'Agriculture · Operations', color: '#86efac', icon: 'fa-tractor', href: 'products.html' },
  { title: 'Event Ticketing Systems', cat: 'Events · Ticketing', color: '#ec4899', icon: 'fa-ticket', href: 'products.html' },
  { title: 'Accounting Practice Management', cat: 'Finance · Accounting', color: '#fbbf24', icon: 'fa-calculator', href: 'products.html' },
  { title: 'Accounting Software', cat: 'Finance · SME', color: '#d97706', icon: 'fa-chart-bar', href: 'products.html' },
  { title: 'Broadcasting Systems', cat: 'Media · Broadcasting', color: '#a3e635', icon: 'fa-broadcast-tower', href: 'products.html' },
  { title: 'Building Information Modeling (BIM)', cat: 'Construction · BIM', color: '#38bdf8', icon: 'fa-building', href: 'products.html' },
  { title: 'Case Management Systems', cat: 'Business · Legal', color: '#5b21b6', icon: 'fa-gavel', href: 'products.html' },
  { title: 'Citizen Service Portals', cat: 'Government · Services', color: '#818cf8', icon: 'fa-city', href: 'products.html' },
  { title: 'Clinical Trial Management (CTMS)', cat: 'Healthcare · Research', color: '#fb923c', icon: 'fa-flask', href: 'products.html' },
  { title: 'Consulting Management Systems', cat: 'Business · Consulting', color: '#4c1d95', icon: 'fa-handshake', href: 'products.html' },
  { title: 'Content Management Systems (CMS)', cat: 'Business · Content', color: '#9333ea', icon: 'fa-file-alt', href: 'products.html' },
  { title: 'Customer Relationship Management (CRM)', cat: 'Business · CRM', color: '#a78bfa', icon: 'fa-users-cog', href: 'products.html' },
  { title: 'Digital Asset Management (DAM)', cat: 'Business · Assets', color: '#6d28d9', icon: 'fa-photo-film', href: 'products.html' },
  { title: 'Document Automation Systems', cat: 'Business · Automation', color: '#7c3aed', icon: 'fa-robot', href: 'products.html' },
  { title: 'Document Management Systems (DMS)', cat: 'Business · Documents', color: '#c4b5fd', icon: 'fa-folder-open', href: 'products.html' },
  { title: 'E-commerce Platforms', cat: 'Commerce · Online Store', color: '#34d399', icon: 'fa-shopping-cart', href: 'products.html' },
  { title: 'Education Department Systems', cat: 'Education · District', color: '#67e8f9', icon: 'fa-university', href: 'products.html' },
  { title: 'E-Government Platforms', cat: 'Government · Digital', color: '#a5b4fc', icon: 'fa-landmark', href: 'products.html' },
  { title: 'Electronic Health Records (EHR)', cat: 'Healthcare · Records', color: '#f87171', icon: 'fa-notes-medical', href: 'products.html' },
  { title: 'Employee Self-Service Portals', cat: 'HR · Self-Service', color: '#fdba74', icon: 'fa-id-badge', href: 'products.html' },
  { title: 'Energy Management Systems (EMS)', cat: 'Utilities · Energy', color: '#fbbf24', icon: 'fa-bolt', href: 'products.html' },
  { title: 'Enterprise Resource Planning (ERP)', cat: 'Business · Enterprise', color: '#8b5cf6', icon: 'fa-cubes', href: 'products.html#erp' },
];

function initSearch() {
  const trigger = document.getElementById('searchTrigger');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('globalSearch');
  const results = document.getElementById('searchResults');

  if (!trigger || !overlay) return;

  const openSearch = () => {
    overlay.classList.add('active');
    setTimeout(() => input?.focus(), 100);
    document.body.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (results) results.innerHTML = '<div class="search-hint">Type to search across all products and categories</div>';
  };

  trigger.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      overlay.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.innerHTML = '<div class="search-hint">Type to search across all products and categories</div>';
      return;
    }

    const matches = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
    ).slice(0, 8);

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-hint">No products found. <a href="contact.html" style="color:var(--gold)">Request a custom build →</a></div>';
      return;
    }

    results.innerHTML = matches.map(p => `
      <a href="${p.href}" class="search-result-item">
        <div class="search-result-icon" style="background: color-mix(in srgb, ${p.color} 15%, transparent); color: ${p.color};">
          <i class="fas ${p.icon}"></i>
        </div>
        <div>
          <div class="search-result-title">${highlight(p.title, q)}</div>
          <div class="search-result-meta">${p.cat}</div>
        </div>
      </a>
    `).join('');
  });

  function highlight(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background:rgba(245,166,35,0.3);color:var(--gold);border-radius:2px;">$1</mark>');
  }
}

// ================================================
// HERO CANVAS — Particle Network
// ================================================
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.gold = Math.random() > 0.7;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.gold
        ? `rgba(245, 166, 35, ${this.alpha})`
        : `rgba(0, 212, 170, ${this.alpha * 0.6})`;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor(W * H / 14000), 80);
    for (let i = 0; i < count; i++) particles.push(new P());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 166, 35, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  // Mouse interaction
  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Subtle mouse repulsion
  const origUpdate = P.prototype.update;
  P.prototype.update = function() {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.vx += (dx / dist) * 0.05;
      this.vy += (dy / dist) * 0.05;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 2) { this.vx = (this.vx / speed) * 2; this.vy = (this.vy / speed) * 2; }
    }
    origUpdate.call(this);
  };
}

// ================================================
// ANIMATED COUNTERS
// ================================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 2000;
  const start = performance.now();

  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 4);
    el.textContent = Math.floor(ease * target);
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };

  requestAnimationFrame(update);
}

// ================================================
// SCROLL ANIMATIONS
// ================================================
function initScrollAnimations() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  const els = document.querySelectorAll(
    '.product-card, .cat-card, .why-item, .mini-card, .founder-content, .cta-content, .contact-card'
  );

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`;
    io.observe(el);
  });
}

document.addEventListener('click', e => {
  const el = e.target.closest('[style*="opacity: 0"]');
  if (!el) return;
});

// Patch in-view to use opacity/transform
const origObserver = IntersectionObserver;
(function() {
  const realInit = initScrollAnimations;
  window._realInitScrollAnim = realInit;
})();

document.addEventListener('scroll', () => {
  document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, { passive: true });

// ================================================
// SCROLL TOP
// ================================================
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================================================
// PARALLAX HERO
// ================================================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-inner');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    hero.style.opacity = `${1 - window.scrollY / (window.innerHeight * 0.8)}`;
  }
}, { passive: true });

// ================================================
// PRODUCT CARD 3D TILT
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card, .featured-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * 4;
      const ry = ((cx - x) / cx) * 4;
      this.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});

// ================================================
// CONTACT FORM
// ================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Pre-fill subject from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productParam = urlParams.get('product');
  const typeParam = urlParams.get('type');

  if (productParam) {
    const subjectMap = {
      'medicare': 'Healthcare & MediCare Ghana',
      'hms': 'Hotel Management System',
      'core-banking': 'Core Banking System',
      'erp': 'Enterprise Resource Planning',
      'ghana-school': 'GhanaSchoolApp',
      'ats': 'Applicant Tracking System',
      'payroll-hr': 'Ghana Payroll & HR System',
    };
    const subjectEl = document.getElementById('subject');
    if (subjectEl && subjectMap[productParam]) {
      // Pre-select or set message
      const msgEl = document.getElementById('message');
      if (msgEl) {
        const prefix = typeParam === 'buy' ? 'I am interested in purchasing/licensing ' : 'I would like a demo of ';
        msgEl.value = `${prefix}${subjectMap[productParam] || productParam}.`;
      }
    }
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const origText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--teal)';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// ================================================
// CONSOLE SIGNATURE
// ================================================
console.log('%c🚀 RAUF HUSEIN SOFTWARE MARKETPLACE 🚀', 'font-size:18px;color:#f5a623;font-weight:bold;');
console.log('%c30+ Enterprise Systems · Built for Africa', 'color:#00d4aa;');
console.log('%chusein@primehr.org · +233 24 883 7001', 'color:#6b7280;');
