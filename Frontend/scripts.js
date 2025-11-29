// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Prevent scrolling when menu is open on mobile
            if (window.innerWidth <= 768) {
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            }
        });
    }

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const header = document.querySelector('header');
        if (header && !header.contains(event.target) && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll to top button visibility
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Product filtering functionality (for products page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    function filterProducts() {
        // Get active category
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.dataset.filter : 'all';
        
        // Get search term
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            
            // Check matches
            const matchesCategory = (category === 'all' || cardCategory === category);
            const matchesSearch = cardTitle.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                // Add fade in animation
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add Click Events to Filters
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');
                filterProducts();
            });
        });
    }

    // Add Input Event to Search
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Footer Navigation Functionality
    document.querySelectorAll('.footer-nav-item').forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sections = ['#hero', '#about', '#featured-projects', '#speaking', '#contact', '#social'];
            const targetSection = sections[index];
            
            if (targetSection && targetSection !== '#social') {
                // Smooth scroll to section
                const target = document.querySelector(targetSection) || document.querySelector('main');
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
});

// script.js - Updated with enhanced mobile navigation

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Prevent scrolling when menu is open on mobile
            if (window.innerWidth <= 768) {
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            }
        });
    }

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const header = document.querySelector('header');
        if (header && !header.contains(event.target) && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll to top button visibility
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Handle both hash links and page links
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            } else if (href === window.location.pathname && !current) {
                // For page links, highlight if we're on that page
                link.classList.add('active');
            }
        });
    });

    // Update active nav on page load
    function updateActiveNavOnLoad() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all
            link.classList.remove('active');
            
            // Check if this link matches current page
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
            
            // For hash links on homepage
            if (currentPage === 'index.html' || currentPage === '') {
                if (href.startsWith('#')) {
                    const section = document.querySelector(href);
                    if (section) {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 200 && rect.bottom >= 200) {
                            link.classList.add('active');
                        }
                    }
                }
            }
        });
    }

    // Call on page load
    updateActiveNavOnLoad();
});
// script.js - Fixed and optimized mobile navigation

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Prevent scrolling when menu is open on mobile
            if (window.innerWidth <= 768) {
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = 'auto';
                }
            }
        });
    }

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const header = document.querySelector('header');
        if (header && !header.contains(event.target) && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            body.style.overflow = 'auto';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll to top button visibility
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Scroll to top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        // Get current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // If we're on a page other than index.html, highlight the page link
        if (currentPage !== 'index.html' && currentPage !== '') {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // For homepage, highlight based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Update navigation on scroll and page load
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Product filtering functionality (for products page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');

    function filterProducts() {
        // Get active category
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.dataset.filter : 'all';
        
        // Get search term
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            
            // Check matches
            const matchesCategory = (category === 'all' || cardCategory === category);
            const matchesSearch = cardTitle.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                // Add fade in animation
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add Click Events to Filters
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');
                filterProducts();
            });
        });
    }

    // Add Input Event to Search
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Footer Navigation Functionality
    document.querySelectorAll('.footer-nav-item').forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sections = ['#hero', '#about', '#featured-projects', '#speaking', '#contact', '#social'];
            const targetSection = sections[index];
            
            if (targetSection && targetSection !== '#social') {
                // Smooth scroll to section
                const target = document.querySelector(targetSection) || document.querySelector('main');
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
    });
});