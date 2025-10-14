// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(20, 20, 20, 0.98)';
    } else {
        header.style.background = 'rgba(20, 20, 20, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-method, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery lightbox effect (simple implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        // Simple zoom effect
        item.style.transform = item.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
    });
});

// Contact form validation and phone number formatting
const phoneNumber = '123123123';

// Update phone links with proper formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.setAttribute('href', `tel:+48${phoneNumber}`);
    });
    
    const smsLinks = document.querySelectorAll('a[href^="sms:"]');
    smsLinks.forEach(link => {
        link.setAttribute('href', `sms:+48${phoneNumber}`);
    });
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            // Don't override the existing content, just add the effect class
            heroTitle.classList.add('typing-complete');
        }, 2000);
    }
});

// Add floating animation to social buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.animation = 'float 1s ease-in-out infinite';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.animation = '';
    });
});

// CSS for floating animation (added via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(-2px); }
        50% { transform: translateY(-6px); }
    }
`;
document.head.appendChild(style);

// Add click-to-call functionality with confirmation
document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('phone-btn')) {
            const confirmCall = confirm('Czy chcesz zadzwonić do AliEl - Szalone nożyczki?');
            if (!confirmCall) {
                e.preventDefault();
            }
        } else if (btn.classList.contains('sms-btn')) {
            const confirmSMS = confirm('Czy chcesz wysłać SMS do AliEl - Szalone nożyczki?');
            if (!confirmSMS) {
                e.preventDefault();
            }
        }
    });
});

// Add current time check for business hours
function checkBusinessHours() {
    const now = new Date();
    const currentHour = now.getHours();
    const isBusinessHours = currentHour >= 10 && currentHour < 16;
    
    const contactButtons = document.querySelector('.contact-buttons');
    const phoneBtn = document.querySelector('.phone-btn');
    const smsBtn = document.querySelector('.sms-btn');
    const infoWH = document.querySelector('.info-note-workhinfo');
    
    // Find parent wrappers
    let phoneWrapper = null;
    let smsWrapper = null;
    
    if (phoneBtn) {
        phoneWrapper = phoneBtn.closest('.contact-button-wrapper');
    }
    
    if (smsBtn) {
        smsWrapper = smsBtn.closest('.contact-button-wrapper');
    }
    
    if (contactButtons && phoneWrapper && smsWrapper) {
        if (isBusinessHours) {
            // Show both buttons side by side
            phoneWrapper.style.display = 'block';
            smsWrapper.style.display = 'block';
            contactButtons.style.justifyContent = 'center';
            infoWH.style.display = 'none';
            
            // Update phone button to show availability
            phoneBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            phoneBtn.innerHTML = '<i class="fas fa-phone-alt"></i><span>Zadzwoń teraz!</span>';
        } else {
            // Hide phone button, show only SMS in center
            phoneWrapper.style.display = 'none';
            smsWrapper.style.display = 'block';
            contactButtons.style.justifyContent = 'center';
            
            // Reset phone button style for when it becomes visible again
            phoneBtn.style.background = '';
            phoneBtn.innerHTML = '<i class="fas fa-phone-alt"></i><span>Zadzwoń teraz</span>';
        }
    }
}

// Check business hours on page load and every minute
document.addEventListener('DOMContentLoaded', checkBusinessHours);
setInterval(checkBusinessHours, 60000); // Check every minute

// Add Easter egg - dragon animation on logo click
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        // Create dragon effect
        const dragon = document.createElement('div');
        dragon.innerHTML = '🐲';
        dragon.style.cssText = `
            position: fixed;
            font-size: 3rem;
            z-index: 9999;
            pointer-events: none;
            left: -100px;
            top: 50%;
            animation: dragonFly 3s ease-in-out forwards;
        `;
        
        document.body.appendChild(dragon);
        
        // Add dragon flight animation
        const dragonStyle = document.createElement('style');
        dragonStyle.textContent = `
            @keyframes dragonFly {
                0% { 
                    left: -100px;
                    transform: rotate(0deg) scale(1);
                }
                50% { 
                    left: 50vw;
                    transform: rotate(360deg) scale(1.5);
                }
                100% { 
                    left: calc(100vw + 100px);
                    transform: rotate(720deg) scale(1);
                }
            }
        `;
        document.head.appendChild(dragonStyle);
        
        setTimeout(() => {
            dragon.remove();
            dragonStyle.remove();
        }, 3000);
        
        clickCount = 0;
    }
});

// Add service card hover effects with more details
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const price = card.querySelector('.price');
        if (price && !card.classList.contains('special')) {
            const originalText = price.textContent;
            price.dataset.originalText = originalText;
            price.textContent = 'Zadzwoń bądź napisz, aby dowiedzieć się więcej';
            price.style.fontSize = '0.9rem';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const price = card.querySelector('.price');
        if (price && price.dataset.originalText) {
            price.textContent = price.dataset.originalText;
            price.style.fontSize = '1.5rem';
        }
    });
});

// Add scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #d4af37;
    color: #2c1810;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Set current year
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
});