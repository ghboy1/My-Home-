// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    
    if (!header.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Mobile Dropdown Functionality for Social Connect and Market Connect sections
function isMobileDevice() {
    return window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Handle Social Connect Section
const socialConnectSection = document.querySelector('.social-connect-section');
const marketConnectSection = document.querySelector('.market-connect-section');

// Add visual feedback for mobile interactions
function addTouchFeedback(element) {
    if (isMobileDevice()) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
}

// Enhanced Social Connect Section handling with feedback
function handleSocialConnectClick(event) {
    if (isMobileDevice()) {
        event.preventDefault();
        addTouchFeedback(socialConnectSection);
        
        socialConnectSection.classList.toggle('mobile-active');
        // Close market connect if it's open
        if (marketConnectSection) {
            marketConnectSection.classList.remove('mobile-active');
        }
    }
}

function handleMarketConnectClick() {
    if (isMobileDevice()) {
        marketConnectSection.classList.toggle('mobile-active');
        // Close social connect if it's open
        if (socialConnectSection) {
            socialConnectSection.classList.remove('mobile-active');
        }
    }
}

// Add click event listeners for mobile with enhanced functionality
if (socialConnectSection) {
    socialConnectSection.addEventListener('click', handleSocialConnectClick);
    socialConnectSection.addEventListener('touchstart', function(e) {
        if (isMobileDevice()) {
            e.preventDefault();
        }
    });
}

if (marketConnectSection) {
    marketConnectSection.addEventListener('click', handleMarketConnectClick);
    marketConnectSection.addEventListener('touchstart', function(e) {
        if (isMobileDevice()) {
            e.preventDefault();
        }
    });
}

// Close dropdowns when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (isMobileDevice()) {
        const socialSection = document.querySelector('.social-connect-section');
        const marketSection = document.querySelector('.market-connect-section');
        
        // Close social connect if clicking outside
        if (socialSection && !socialSection.contains(event.target)) {
            socialSection.classList.remove('mobile-active');
        }
        
        // Close market connect if clicking outside
        if (marketSection && !marketSection.contains(event.target)) {
            marketSection.classList.remove('mobile-active');
        }
    }
});

// Prevent click events from bubbling up from dropdown items
document.querySelectorAll('.social-item a, .market-item a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Video Hover Effects
const videos = document.querySelectorAll('.hover-video');
videos.forEach(video => {
    video.parentElement.addEventListener('mouseenter', () => video.play());
    video.parentElement.addEventListener('mouseleave', () => video.pause());
});

// 3D Team Carousel Functionality
const carousel = document.querySelector('.team-carousel');
const cards = Array.from(document.querySelectorAll('.carousel-card'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const memberName = document.querySelector('.member-name');
const memberRole = document.querySelector('.member-role');
const dots = Array.from(document.querySelectorAll('.dot'));
let activeIdx = 0;

function updateCarousel() {
  cards.forEach((card, idx) => {
    card.classList.remove('active');
    
    // Reset transforms
    card.style.transform = '';
    card.style.opacity = '';
    card.style.zIndex = '';
    
    const offset = idx - activeIdx;
    
    if (offset === 0) {
      // Active card (center)
      card.style.transform = 'translateX(0px) scale(1) rotateY(0deg)';
      card.style.opacity = '1';
      card.style.zIndex = '4';
      card.classList.add('active');
    } else if (offset === -1 || (activeIdx === 0 && idx === cards.length - 1)) {
      // Left card
      card.style.transform = 'translateX(-80px) scale(0.9) rotateY(8deg)';
      card.style.opacity = '0.8';
      card.style.zIndex = '2';
    } else if (offset === 1 || (activeIdx === cards.length - 1 && idx === 0)) {
      // Right card
      card.style.transform = 'translateX(80px) scale(0.9) rotateY(-8deg)';
      card.style.opacity = '0.8';
      card.style.zIndex = '2';
    } else if (offset === -2 || (activeIdx <= 1 && idx >= cards.length - 2)) {
      // Far left
      card.style.transform = 'translateX(-200px) scale(0.8) rotateY(15deg)';
      card.style.opacity = '0.6';
      card.style.zIndex = '1';
    } else if (offset === 2 || (activeIdx >= cards.length - 2 && idx <= 1)) {
      // Far right
      card.style.transform = 'translateX(200px) scale(0.8) rotateY(-15deg)';
      card.style.opacity = '0.6';
      card.style.zIndex = '1';
    } else {
      // Hidden cards
      card.style.transform = 'translateX(0px) scale(0.7) translateY(50px)';
      card.style.opacity = '0';
      card.style.zIndex = '0';
    }
  });
  
  // Update member info
  const activeCard = cards[activeIdx];
  if (activeCard) {
    memberName.textContent = activeCard.getAttribute('data-name') || 'Team Member';
    memberRole.textContent = activeCard.getAttribute('data-role') || 'Role';
  }
  
  // Update dots
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeIdx);
  });
}

function nextSlide() {
  activeIdx = (activeIdx + 1) % cards.length;
  updateCarousel();
}

function prevSlide() {
  activeIdx = (activeIdx - 1 + cards.length) % cards.length;
  updateCarousel();
}

// Event listeners
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// Dot navigation
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    activeIdx = idx;
    updateCarousel();
  });
});

// Swipe support for mobile
let startX = null;
if (carousel) {
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  carousel.addEventListener('touchend', (e) => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      prevSlide();
    } else if (startX - endX > 50) {
      nextSlide();
    }
    startX = null;
  });
}

// Auto-play (optional)
let autoPlayInterval;
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Start auto-play and pause on hover
if (carousel) {
  startAutoPlay();
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
}

// Initialize carousel
if (cards.length > 0) {
  updateCarousel();
}

// Footer Navigation Functionality
document.querySelectorAll('.footer-nav-item').forEach((item, index) => {
    item.addEventListener('click', function() {
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
        } else if (targetSection === '#social') {
            // Show social connect section
            const socialSection = document.querySelector('.social-connect-section');
            if (socialSection) {
                socialSection.classList.add('mobile-active');
                // Close market connect if open
                const marketSection = document.querySelector('.market-connect-section');
                if (marketSection) {
                    marketSection.classList.remove('mobile-active');
                }
            }
        }
        
        // Add click animation
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    });
});

// Image Slider Functionality for Featured Ventures
const imageSlider = document.querySelector('.image-slider');
const slides = Array.from(document.querySelectorAll('.slide'));
const sliderPrevBtn = document.querySelector('.featured-projects .slider-btn.prev');
const sliderNextBtn = document.querySelector('.featured-projects .slider-btn.next');
const sliderDots = Array.from(document.querySelectorAll('.slider-dot'));
let currentSlide = 1; // Start with middle slide (Ghana Keys)

function updateSlider() {
  if (!imageSlider || slides.length === 0) return;
  
  // Add transitioning class for perspective animation
  const container = document.querySelector('.image-slider-container');
  if (container) {
    container.classList.add('transitioning');
    setTimeout(() => {
      container.classList.remove('transitioning');
    }, 800);
  }
  
  // Clear all classes first
  slides.forEach(slide => {
    slide.classList.remove('active', 'prev', 'next');
  });
  
  // Apply 3D positioning based on current slide
  slides.forEach((slide, index) => {
    const offset = index - currentSlide;
    
    if (offset === 0) {
      // Current active slide (center)
      slide.classList.add('active');
    } else if (offset === -1 || (currentSlide === 0 && index === slides.length - 1)) {
      // Previous slide (left)
      slide.classList.add('prev');
    } else if (offset === 1 || (currentSlide === slides.length - 1 && index === 0)) {
      // Next slide (right)
      slide.classList.add('next');
    } else {
      // Hidden slides - more dramatic positioning
      if (offset < -1) {
        // Far left slides
        slide.style.transform = 'translateX(-150%) translateZ(-600px) rotateY(120deg) scale(0.5)';
        slide.style.opacity = '0.2';
      } else {
        // Far right slides
        slide.style.transform = 'translateX(150%) translateZ(-600px) rotateY(-120deg) scale(0.5)';
        slide.style.opacity = '0.2';
      }
    }
  });
  
  // Update dot navigation
  sliderDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSliderSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function prevSliderSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

// Event listeners for slider
if (sliderPrevBtn) sliderPrevBtn.addEventListener('click', prevSliderSlide);
if (sliderNextBtn) sliderNextBtn.addEventListener('click', nextSliderSlide);

// Dot navigation for slider
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
  });
});

// Auto-play for image slider
let sliderAutoPlayInterval;
function startSliderAutoPlay() {
  sliderAutoPlayInterval = setInterval(nextSliderSlide, 5000);
}

function stopSliderAutoPlay() {
  clearInterval(sliderAutoPlayInterval);
}

// Touch/swipe support for image slider
let sliderStartX = null;
if (imageSlider) {
  imageSlider.addEventListener('touchstart', (e) => {
    sliderStartX = e.touches[0].clientX;
  });
  
  imageSlider.addEventListener('touchend', (e) => {
    if (sliderStartX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - sliderStartX > 50) {
      prevSliderSlide();
    } else if (sliderStartX - endX > 50) {
      nextSliderSlide();
    }
    sliderStartX = null;
  });
  
  // Start auto-play and pause on hover
  startSliderAutoPlay();
  imageSlider.parentElement.addEventListener('mouseenter', stopSliderAutoPlay);
  imageSlider.parentElement.addEventListener('mouseleave', startSliderAutoPlay);
  
  // Initialize slider
  updateSlider();
}