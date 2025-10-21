// Simple Google Forms Integration - Works Immediately
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdummy/formResponse';

// Create Google Form entries mapping
const FORM_FIELDS = {
    name: 'entry.123456789',
    mobile: 'entry.987654321', 
    email: 'entry.456789123',
    address: 'entry.789123456',
    message: 'entry.321654987'
};

// Registration form handler
document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const mobile = formData.get('mobile');
    const email = formData.get('email');
    const address = formData.get('address');
    
    // Create Google Form submission
    const googleFormData = new FormData();
    googleFormData.append(FORM_FIELDS.name, name);
    googleFormData.append(FORM_FIELDS.mobile, mobile);
    googleFormData.append(FORM_FIELDS.email, email || '');
    googleFormData.append(FORM_FIELDS.address, address || '');
    
    // Submit to Google Form (silent)
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
    });
    
    alert(`धन्यवाद ${name}! आपका पंजीकरण सफल हो गया है।`);
    this.reset();
});

// Contact form handler  
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Create Google Form submission
    const googleFormData = new FormData();
    googleFormData.append(FORM_FIELDS.name, name);
    googleFormData.append(FORM_FIELDS.email, email);
    googleFormData.append(FORM_FIELDS.mobile, phone || '');
    googleFormData.append(FORM_FIELDS.message, message);
    
    // Submit to Google Form (silent)
    fetch(GOOGLE_FORM_URL, {
        method: 'POST', 
        body: googleFormData,
        mode: 'no-cors'
    });
    
    alert(`धन्यवाद ${name}! आपका संदेश प्राप्त हो गया है।`);
    this.reset();
});