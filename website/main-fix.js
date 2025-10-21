// Single script to fix countdown and forms
console.log('Main fix script loading...');

// Countdown Timer - Fixed
function startCountdown() {
    const targetDate = new Date('2025-11-10T06:00:00+05:30').getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
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
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Form Handler - Fixed
function setupForms() {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypIp2ObQNr0GtLJqNXuAfAZG163LEgk-ZB58S6L5yi_HtKlJETeV0FNAyMUVfggqv49g/exec';
    
    // Registration Form
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const mobile = this.querySelector('[name="mobile"]').value;
            const email = this.querySelector('[name="email"]').value;
            const address = this.querySelector('[name="address"]').value;
            
            if (!name || !mobile) {
                alert('कृपया नाम और मोबाइल नंबर भरें');
                return;
            }
            
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        type: 'registration',
                        name: name,
                        mobile: mobile,
                        email: email,
                        address: address,
                        timestamp: new Date().toLocaleString()
                    })
                });
                
                if (response.ok) {
                    alert(`धन्यवाद ${name}! आपका पंजीकरण सफल हो गया है।`);
                    this.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.error('Registration error:', error);
                const emailUrl = `mailto:shreechhiteshwarnathbaba@gmail.com?subject=पंजीकरण - ${name}&body=नाम: ${name}%0Aमोबाइल: ${mobile}%0Aईमेल: ${email}%0Aपता: ${address}`;
                window.open(emailUrl);
                alert(`${name}, कृपया ईमेल भेजें या बाद में पुनः प्रयास करें।`);
                this.reset();
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const phone = this.querySelector('[name="phone"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            if (!name || !email || !message) {
                alert('कृपया आवश्यक फील्ड भरें');
                return;
            }
            
            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        type: 'contact',
                        name: name,
                        email: email,
                        phone: phone,
                        message: message,
                        timestamp: new Date().toLocaleString()
                    })
                });
                
                if (response.ok) {
                    alert(`धन्यवाद ${name}! आपका संदेश प्राप्त हो गया है।`);
                    this.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.error('Contact error:', error);
                const emailUrl = `mailto:shreechhiteshwarnathbaba@gmail.com?subject=संपर्क - ${name}&body=नाम: ${name}%0Aईमेल: ${email}%0Aफोन: ${phone}%0Aसंदेश: ${message}`;
                window.open(emailUrl);
                alert(`${name}, कृपया ईमेल भेजें या बाद में पुनः प्रयास करें।`);
                this.reset();
            }
        });
    }
}

// Mobile Navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Gallery Modal
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Make functions global
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFAQ = toggleFAQ;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        startCountdown();
        setupForms();
        setupNavigation();
        console.log('Main fix initialized');
    });
} else {
    startCountdown();
    setupForms();
    setupNavigation();
    console.log('Main fix initialized');
}