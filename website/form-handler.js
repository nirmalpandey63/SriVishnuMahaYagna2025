// Google Sheets Form Handler - BEST SOLUTION
// After setting up Apps Script, replace with your deployment URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbypIp2ObQNr0GtLJqNXuAfAZG163LEgk-ZB58S6L5yi_HtKlJETeV0FNAyMUVfggqv49g/exec';

// Fallback email
const FALLBACK_EMAIL = 'mailto:info@vishnuyagya.org';

// Your spreadsheet ID for reference
const SPREADSHEET_ID = '1xGGoi8ZdUaBqzdy3rd7SIVtHhbi0zog4oUJBOwOOFLE';

// Update registration form handler
document.getElementById('registrationForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values directly from elements
    const name = this.querySelector('[name="name"]').value;
    const mobile = this.querySelector('[name="mobile"]').value;
    const email = this.querySelector('[name="email"]').value;
    const address = this.querySelector('[name="address"]').value;
    
    const data = {
        type: 'registration',
        name: name,
        mobile: mobile,
        email: email,
        address: address,
        timestamp: new Date().toLocaleString('hi-IN')
    };
    
    console.log('Registration data:', data); // Debug log
    
    // Validate required fields
    if (!name || !mobile) {
        alert('कृपया नाम और मोबाइल नंबर भरें');
        return;
    }
    
    // Temporary solution - open email client
    if (GOOGLE_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        const subject = 'यज्ञ पंजीकरण - ' + data.name;
        const body = `नाम: ${data.name}\nमोबाइल: ${data.mobile}\nईमेल: ${data.email}\nपता: ${data.address}`;
        window.open(`${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        alert(`धन्यवाद ${data.name}! कृपया ईमेल भेजें।`);
        this.reset();
        return;
    }
    
    // Use fetch with no-cors mode
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    });
    
    alert(`धन्यवाद ${data.name}! आपका पंजीकरण सफल हो गया है।`);
    this.reset();
});

// Update contact form handler
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values directly from elements
    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const message = this.querySelector('[name="message"]').value;
    
    const data = {
        type: 'contact',
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toLocaleString('hi-IN')
    };
    
    console.log('Contact data:', data); // Debug log
    
    // Validate required fields
    if (!name || !email || !message) {
        alert('कृपया आवश्यक फील्ड भरें');
        return;
    }
    
    // Temporary solution - open email client
    if (GOOGLE_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        const subject = 'संपर्क संदेश - ' + data.name;
        const body = `नाम: ${data.name}\nईमेल: ${data.email}\nफोन: ${data.phone}\nसंदेश: ${data.message}`;
        window.open(`${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        alert(`धन्यवाद ${data.name}! कृपया ईमेल भेजें।`);
        this.reset();
        return;
    }
    
    // Use fetch with no-cors mode
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    });
    
    alert(`धन्यवाद ${data.name}! आपका संदेश प्राप्त हो गया है।`);
    this.reset();
});

// Enhanced Donation Form Handler
document.getElementById('donationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const donorName = this.querySelector('[name="donorName"]').value;
    const donorMobile = this.querySelector('[name="donorMobile"]').value;
    const paymentMode = this.querySelector('[name="paymentMode"]').value;
    const referenceId = this.querySelector('[name="referenceId"]').value;
    const selectedSankalp = this.querySelector('input[name="sankalp"]:checked');
    
    // Get amount
    const selectedAmount = document.querySelector('.donation-amount.selected');
    const customAmount = document.getElementById('customAmount');
    
    let amount = 0;
    if (selectedAmount) {
        amount = parseInt(selectedAmount.dataset.amount);
    } else if (customAmount && customAmount.value) {
        amount = parseInt(customAmount.value);
    }
    
    // Validation
    if (!donorName || !donorMobile) {
        alert('कृपया नाम और मोबाइल भरें');
        return;
    }
    
    if (amount === 0) {
        alert('कृपया दान की राशि चुनें');
        return;
    }
    
    if (amount < 11) {
        alert('न्यूनतम दान राशि ₹11 है');
        return;
    }
    
    if (!paymentMode) {
        alert('कृपया भुगतान का तरीका चुनें');
        return;
    }
    
    // Validate reference based on payment mode
    if (paymentMode === 'upi') {
        if (!referenceId || referenceId.length < 12) {
            alert('कृपया सही UPI Transaction ID दर्ज करें (12+ अक्षर)');
            return;
        }
    }  else if (paymentMode === 'cheque') {
        if (!referenceId || !/^\d{6,10}$/.test(referenceId)) {
            alert('कृपया सही Cheque Number दर्ज करें (6-10 अंक)');
            return;
        }
    }
    
    const sankalpText = selectedSankalp ? selectedSankalp.value : 'सामान्य';
    
    // Send enhanced donation data
    const data = {
        type: 'donation',
        name: donorName,
        mobile: donorMobile,
        email: '',
        address: paymentMode,
        message: `Amount: ₹${amount}, Sankalp: ${sankalpText}, Payment: ${paymentMode}, Ref: ${referenceId || 'N/A'}`,
        timestamp: new Date().toLocaleString('hi-IN')
    };
    
    console.log('Enhanced donation data:', data);
    
    // Send to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    });
    
    alert(`धन्यवाद ${donorName}! आपका ₹${amount} का दान ${sankalpText} संकल्प के लिए दर्ज किया गया है।`);
    
    this.reset();
    document.querySelectorAll('.donation-amount').forEach(a => a.classList.remove('selected'));
});

// Payment option selection
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        
        const paymentMode = document.getElementById('payment-mode');
        paymentMode.value = this.dataset.value;
        
        updateReferenceField(this.dataset.value);
    });
});

function updateReferenceField(paymentType) {
    const referenceField = document.getElementById('reference-field');
    const referenceInput = document.getElementById('reference-id');
    const referenceLabel = document.getElementById('reference-label');
    
    if (paymentType === 'upi') {
        referenceField.style.display = 'block';
        referenceInput.required = true;
        referenceLabel.textContent = 'UPI Transaction ID *';
        referenceInput.placeholder = 'UPI Transaction ID';
    }  else if (paymentType === 'cheque') {
        referenceField.style.display = 'block';
        referenceInput.required = true;
        referenceLabel.textContent = 'Cheque Number *';
        referenceInput.placeholder = 'Cheque Number';
    } else {
        referenceField.style.display = 'none';
        referenceInput.required = false;
        referenceInput.value = '';
    }
}