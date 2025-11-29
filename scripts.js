// FINAL WORKING MOBILE MENU SCRIPT - Replace your entire script.js with this

document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const header = document.querySelector('header');

    // Toggle menu when clicking hamburger
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Open menu function
    function openMenu() {
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Change icon to X
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    // Close menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.style.overflow = '';
        
        // Change icon back to bars
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!header.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Prevent menu closing when clicking inside nav
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll to top button
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
        
        lastScroll = scrollTop;
    });

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== ACTIVE NAV HIGHLIGHTING ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // For pages other than index
        if (currentPage !== 'index.html' && currentPage !== '') {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // For homepage - highlight based on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const scrollPos = window.pageYOffset;
            
            if (scrollPos >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                if (href.substring(1) === current) {
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // ========== PRODUCT FILTERING ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    function filterProducts() {
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h4') ? card.querySelector('h4').textContent.toLowerCase() : '';
            
            const matchesCategory = (category === 'all' || cardCategory === category);
            const matchesSearch = cardTitle.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // ========== FOOTER NAVIGATION ==========
    const footerNavItems = document.querySelectorAll('.footer-nav-item');
    footerNavItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sections = ['#hero', '#about', '#featured-projects', '#speaking', '#contact', '#social'];
            const targetSection = sections[index];
            
            if (targetSection && targetSection !== '#social') {
                const target = document.querySelector(targetSection);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
});