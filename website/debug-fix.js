// Debug and Fix Script for Production Issues
// Add this to your main script.js or include separately

// Enhanced Countdown with better timezone handling
function initCountdown() {
    console.log('Initializing countdown...');
    
    // Multiple timezone approaches for better compatibility
    const targetDateISO = '2025-11-10T06:00:00+05:30';
    const targetDateUTC = new Date('2025-11-10T00:30:00Z'); // 6:00 AM IST = 00:30 UTC
    
    function updateCountdownEnhanced() {
        const now = new Date();
        const target = new Date(targetDateISO);
        
        // Fallback if ISO parsing fails
        let targetTime = target.getTime();
        if (isNaN(targetTime)) {
            targetTime = targetDateUTC.getTime();
            console.log('Using UTC fallback for countdown');
        }
        
        const difference = targetTime - now.getTime();
        
        console.log('Countdown update:', {
            now: now.toISOString(),
            target: new Date(targetTime).toISOString(),
            difference: difference,
            days: Math.floor(difference / (1000 * 60 * 60 * 24))
        });
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            // Safe DOM updates
            const elements = {
                days: document.getElementById('days'),
                hours: document.getElementById('hours'),
                minutes: document.getElementById('minutes'),
                seconds: document.getElementById('seconds')
            };
            
            if (elements.days) elements.days.textContent = days.toString().padStart(2, '0');
            if (elements.hours) elements.hours.textContent = hours.toString().padStart(2, '0');
            if (elements.minutes) elements.minutes.textContent = minutes.toString().padStart(2, '0');
            if (elements.seconds) elements.seconds.textContent = seconds.toString().padStart(2, '0');
            
            return true; // Countdown active
        } else {
            // Event started
            const titleEl = document.querySelector('.countdown-container h3');
            const countdownEl = document.querySelector('.countdown');
            
            if (titleEl) titleEl.textContent = 'यज्ञ प्रारंभ हो गया है!';\n            if (countdownEl) countdownEl.innerHTML = '<div class=\"celebration\">🎉 स्वागत है! 🎉</div>';\n            \n            return false; // Countdown finished\n        }\n    }\n    \n    // Initial update\n    updateCountdownEnhanced();\n    \n    // Set interval\n    const countdownInterval = setInterval(() => {\n        const isActive = updateCountdownEnhanced();\n        if (!isActive) {\n            clearInterval(countdownInterval);\n            console.log('Countdown finished, interval cleared');\n        }\n    }, 1000);\n}\n\n// Enhanced Form Handler with better error handling\nfunction initFormHandlers() {\n    console.log('Initializing form handlers...');\n    \n    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypIp2ObQNr0GtLJqNXuAfAZG163LEgk-ZB58S6L5yi_HtKlJETeV0FNAyMUVfggqv49g/exec';\n    const FALLBACK_EMAIL = 'shreechhiteshwarnathbaba@gmail.com';\n    \n    // Test Google Apps Script connectivity\n    async function testConnection() {\n        try {\n            const response = await fetch(SCRIPT_URL, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/x-www-form-urlencoded',\n                },\n                body: new URLSearchParams({\n                    type: 'test',\n                    name: 'Test Connection',\n                    timestamp: new Date().toISOString()\n                })\n            });\n            \n            console.log('Connection test response:', response.status, response.statusText);\n            return response.ok;\n        } catch (error) {\n            console.error('Connection test failed:', error);\n            return false;\n        }\n    }\n    \n    // Enhanced form submission\n    async function submitForm(formData, formType) {\n        console.log(`Submitting ${formType} form:`, formData);\n        \n        try {\n            const response = await fetch(SCRIPT_URL, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/x-www-form-urlencoded',\n                },\n                body: new URLSearchParams(formData)\n            });\n            \n            console.log('Form submission response:', response.status, response.statusText);\n            \n            if (response.ok) {\n                const result = await response.text();\n                console.log('Form submission result:', result);\n                return { success: true, message: result };\n            } else {\n                throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n            }\n        } catch (error) {\n            console.error('Form submission error:', error);\n            \n            // Fallback to email\n            const subject = `${formType} Form Submission - ${formData.name || 'Unknown'}`;\n            const body = Object.entries(formData)\n                .map(([key, value]) => `${key}: ${value}`)\n                .join('\\n');\n            \n            const emailUrl = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;\n            window.open(emailUrl);\n            \n            return { \n                success: false, \n                error: error.message,\n                fallback: 'email'\n            };\n        }\n    }\n    \n    // Registration form\n    const regForm = document.getElementById('registrationForm');\n    if (regForm) {\n        regForm.addEventListener('submit', async function(e) {\n            e.preventDefault();\n            \n            const formData = {\n                type: 'registration',\n                name: this.querySelector('[name=\"name\"]').value,\n                mobile: this.querySelector('[name=\"mobile\"]').value,\n                email: this.querySelector('[name=\"email\"]').value,\n                address: this.querySelector('[name=\"address\"]').value,\n                timestamp: new Date().toLocaleString('hi-IN')\n            };\n            \n            if (!formData.name || !formData.mobile) {\n                alert('कृपया नाम और मोबाइल नंबर भरें');\n                return;\n            }\n            \n            const result = await submitForm(formData, 'Registration');\n            \n            if (result.success) {\n                alert(`धन्यवाद ${formData.name}! आपका पंजीकरण सफल हो गया है।`);\n                this.reset();\n            } else if (result.fallback === 'email') {\n                alert(`धन्यवाद ${formData.name}! कृपया ईमेल भेजें या बाद में पुनः प्रयास करें।`);\n                this.reset();\n            } else {\n                alert('पंजीकरण में समस्या। कृपया पुनः प्रयास करें।');\n            }\n        });\n    }\n    \n    // Contact form\n    const contactForm = document.getElementById('contactForm');\n    if (contactForm) {\n        contactForm.addEventListener('submit', async function(e) {\n            e.preventDefault();\n            \n            const formData = {\n                type: 'contact',\n                name: this.querySelector('[name=\"name\"]').value,\n                email: this.querySelector('[name=\"email\"]').value,\n                phone: this.querySelector('[name=\"phone\"]').value,\n                message: this.querySelector('[name=\"message\"]').value,\n                timestamp: new Date().toLocaleString('hi-IN')\n            };\n            \n            if (!formData.name || !formData.email || !formData.message) {\n                alert('कृपया आवश्यक फील्ड भरें');\n                return;\n            }\n            \n            const result = await submitForm(formData, 'Contact');\n            \n            if (result.success) {\n                alert(`धन्यवाद ${formData.name}! आपका संदेश प्राप्त हो गया है।`);\n                this.reset();\n            } else if (result.fallback === 'email') {\n                alert(`धन्यवाद ${formData.name}! कृपया ईमेल भेजें या बाद में पुनः प्रयास करें।`);\n                this.reset();\n            } else {\n                alert('संदेश भेजने में समस्या। कृपया पुनः प्रयास करें।');\n            }\n        });\n    }\n    \n    // Test connection on page load\n    testConnection().then(connected => {\n        console.log('Google Apps Script connection:', connected ? 'OK' : 'Failed');\n        if (!connected) {\n            console.warn('Forms will use email fallback');\n        }\n    });\n}\n\n// Initialize everything when DOM is ready\nif (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', () => {\n        initCountdown();\n        initFormHandlers();\n    });\n} else {\n    initCountdown();\n    initFormHandlers();\n}\n\nconsole.log('Debug fix script loaded');