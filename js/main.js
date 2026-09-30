// ===================================
// IRON FORGE GYM - JAVASCRIPT
// ===================================

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initCounters();
    initForms();
    initScrollToTop();
    initSmoothScroll();
});

// ========== NAVBAR FUNCTIONALITY ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== ANIMATED COUNTERS ==========
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let counterStarted = false;
    
    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                counters.forEach(counter => startCounter(counter));
            }
        });
    }, observerOptions);
    
    // Observe the about section
    const aboutSection = document.querySelector('.about-stats');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ========== FORM HANDLING ==========
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getEl0ementById('interest').value,
                message: document.getElementById('message').value
            };1
            
            // Show success message (in production, this would send data to a server)
            showFormMessage(formMessage, 'success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (for demonstration)
            console.log('Contact Form Submitted:', formData);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Create a temporary message element
            const message = document.createElement('div');
            message.className = 'form-message success';
            message.style.display = 'block';
            message.style.marginTop = '15px';
            message.textContent = 'Successfully subscribed to newsletter!';
            
            // Show messagelwl
            this.appendChild(message);
            
            // Reset form
            this.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                message.remove();
            }, 3000);
            
            // Log email (for demonstration)
            console.log('Newsletter Subscription:', email);
        });
    }
}

function showFormMessage(element, type, message) {
    element.className = `form-message ${type}`;
    element.textContent = message;
    element.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ========== SCROLL TO TOP BUTTON ==========
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" without a target
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Parallax effect for hero content
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }
});

// ========== INTERSECTION OBSERVER FOR SECTION ANIMATIONS ==========
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ========== GALLERY ITEM CLICK HANDLER ==========
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add a visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // In production, this could open a lightbox or modal
        console.log('Gallery item clicked');
    });
});

// ========== TRAINER CARD INTERACTIONS ==========
const trainerCards = document.querySelectorAll('.trainer-card');

trainerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.trainer-image').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.trainer-image').style.transform = 'scale(1)';
    });
});

// ========== CLASS CARD INTERACTIONS ==========
const classCards = document.querySelectorAll('.class-card');

classCards.forEach(card => {
    card.addEventListener('click', function() {
        const className = this.querySelector('h3').textContent;
        console.log(`Interested in: ${className}`);
        
        // In production, this could open a modal with more details or schedule
        // For now, we'll just add a visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// ========== PRICING CARD INTERACTIONS ==========
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    const button = card.querySelector('.btn');
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = card.querySelector('h3').textContent;
            console.log(`Selected plan: ${planName}`);
            
            // Smooth scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Pre-fill the interest field
                setTimeout(() => {
                    const interestField = document.getElementById('interest');
                    if (interestField) {
                        interestField.value = 'membership';
                    }
                }, 500);
            }
        });
    }
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', function() {
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Any heavy scroll calculations can go here
}, 100);

window.addEventListener('scroll', throttledScroll);

// ========== CONSOLE MESSAGE ==========
console.log('%c🏋️ IRON FORGE GYM ', 'background: linear-gradient(135deg, #ff4c29 0%, #ff8c00 100%); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Iron Forge Gym! Forge Your Best Self 💪', 'color: #ff4c29; font-size: 14px; font-weight: bold;');
console.log('%cWebsite built with passion and dedication to fitness.', 'color: #b0b0b0; font-size: 12px;');

// ========== EASTER EGG ==========
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('🎉 BEAST MODE ACTIVATED! 💪🔥');
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ========== EXPORT FOR MODULES (if needed) ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initScrollAnimations,
        initCounters,
        initForms,
        initScrollToTop,
        initSmoothScroll
    };
}