// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const audioBtn = document.getElementById('audioBtn');
const bgAudio = document.getElementById('bgAudio');

// Mobile Navigation Toggle - Enhanced for mobile devices
if (hamburger) {
    // Add both click and touchstart events for better mobile support
    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('touchstart', toggleMobileMenu, { passive: true });
}

function toggleMobileMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Countdown Timer
function updateCountdown() {
    // Set target date with Indian timezone (UTC+5:30)
    const targetDate = new Date('2025-11-10T06:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Debug logging
    console.log('Countdown Debug:', {
        targetDate: new Date(targetDate).toLocaleString(),
        now: new Date(now).toLocaleString(),
        difference: difference,
        differenceInDays: Math.floor(difference / (1000 * 60 * 60 * 24))
    });

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
        const titleEl = document.querySelector('.countdown-container h3');
        const countdownEl = document.querySelector('.countdown');
        if (titleEl) titleEl.textContent = 'यज्ञ प्रारंभ हो गया है!';
        if (countdownEl) countdownEl.innerHTML = '<div class="celebration">🎉 स्वागत है! 🎉</div>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Audio Controls
let isPlaying = false;
bgAudio.volume = 0.3;

audioBtn?.addEventListener('click', () => {
    if (!isPlaying) {
        bgAudio.play().then(() => {
            isPlaying = true;
            audioBtn.innerHTML = '<i class="fas fa-pause"></i> भजन रोकें';
        }).catch(error => {
            console.log('Audio play failed:', error);
            alert('ऑडियो चलाने के लिए पहले पेज पर क्लिक करें');
        });
    } else {
        bgAudio.pause();
        isPlaying = false;
        audioBtn.innerHTML = '<i class="fas fa-play"></i> भजन सुनें';
    }
});

// Form handlers moved to form-handler.js

// Donation Amount Selection
document.querySelectorAll('.donation-amount').forEach(amount => {
    amount.addEventListener('click', function() {
        // Remove selected class from all amounts
        document.querySelectorAll('.donation-amount').forEach(a => a.classList.remove('selected'));
        
        // Add selected class to clicked amount
        this.classList.add('selected');
        
        // Clear custom amount if preset amount is selected
        const customAmount = document.getElementById('customAmount');
        if (customAmount) {
            customAmount.value = '';
        }
    });
});

// Custom amount input handler
document.getElementById('customAmount')?.addEventListener('input', function() {
    if (this.value) {
        // Remove selected class from preset amounts
        document.querySelectorAll('.donation-amount').forEach(a => a.classList.remove('selected'));
    }
});

// Process Donation - moved to form-handler.js

// Gallery Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.gallery-grid').forEach(g => g.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(targetTab)?.classList.add('active');
    });
});

// Gallery Modal
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the image
document.getElementById('imageModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Live Stream Notifications
function enableNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('अधिसूचना चालू हो गई! यज्ञ शुरू होने पर आपको सूचना मिलेगी।');
                
                // Schedule notification for yagya start time
                const yagyaStart = new Date('2025-11-10T06:00:00');
                const now = new Date();
                const timeDiff = yagyaStart.getTime() - now.getTime();
                
                if (timeDiff > 0) {
                    setTimeout(() => {
                        new Notification('श्री विष्णु महायज्ञ', {
                            body: 'यज्ञ प्रारंभ हो गया है! लाइव देखने के लिए वेबसाइट पर जाएं।',
                            icon: 'assets/icon.png'
                        });
                    }, timeDiff);
                }
            } else {
                alert('अधिसूचना की अनुमति नहीं मिली');
            }
        });
    } else {
        alert('आपका ब्राउज़र अधिसूचना का समर्थन नहीं करता');
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animations
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

// Observe elements for animation
document.querySelectorAll('.about-card, .schedule-item, .gallery-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Toggle audio with spacebar (when not in input fields)
    if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        audioBtn?.click();
    }
});

// Form Validation Helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ff4444';
            this.setCustomValidity('कृपया सही ईमेल पता दर्ज करें');
        } else {
            this.style.borderColor = '#e0e0e0';
            this.setCustomValidity('');
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ff4444';
            this.setCustomValidity('कृपया सही मोबाइल नंबर दर्ज करें');
        } else {
            this.style.borderColor = '#e0e0e0';
            this.setCustomValidity('');
        }
    });
});

// Auto-format phone numbers
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        // Remove non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        this.value = value;
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Start animations after page load
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

console.log('श्री विष्णु महायज्ञ वेबसाइट लोड हो गई है! 🙏');