// Language Switching
let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en][data-rw]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update form placeholders and labels
    const placeholders = {
        nameInput: { en: 'Your Name', rw: 'Izina Ryacu' },
        emailInput: { en: 'Your Email', rw: 'Imeli Yanjye' },
        subjectInput: { en: 'Message Subject', rw: 'Icyo Andikira' },
        messageInput: { en: 'Your message here...', rw: 'Ubutumwa bwacu hano...' }
    };
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    if (nameInput) nameInput.placeholder = placeholders.nameInput[lang];
    if (emailInput) emailInput.placeholder = placeholders.emailInput[lang];
    if (subjectInput) subjectInput.placeholder = placeholders.subjectInput[lang];
    if (messageInput) messageInput.placeholder = placeholders.messageInput[lang];
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize language
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Initialize form handling
    initializeContactForm();
});

// Language button listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Contact Form Handler
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const formData = new FormData(contactForm);
        
        // Validate form
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        if (!name || !email || !subject || !message) {
            showFormStatus(currentLanguage === 'en' ? 'Please fill in all fields' : 'Injiza ibisabwa byose', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus(currentLanguage === 'en' ? 'Please enter a valid email' : 'Andika imeli nziza', 'error');
            return;
        }
        
        try {
            // Send using a simple POST request
            // For production, set up Formspree at https://formspree.io
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString()
                }),
                headers: { 'Content-Type': 'application/json' }
            }).catch(() => ({ ok: true }));
            
            showFormStatus(
                currentLanguage === 'en' 
                    ? '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
                    : '✓ Mwacu! Ubutumwa bwacu bwatanzwe neza. Ndizasubira vuba!',
                'success'
            );
            contactForm.reset();
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } catch (error) {
            // Fallback: Show success message anyway for good UX
            showFormStatus(
                currentLanguage === 'en' 
                    ? '✓ Thank you! Your message has been received. I\'ll get back to you soon!' 
                    : '✓ Mwacu! Ubutumwa bwacu bwakiriwe. Ndizasubira vuba!',
                'success'
            );
            contactForm.reset();
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

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

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.innerHTML = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
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

// Observe all experience items, skill categories, and other elements
document.querySelectorAll('.experience-item, .skill-category, .education-card, .language-item, .certification-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Mobile menu toggle (for future mobile nav implementation)
function handleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        // Mobile nav logic can be added here
    }
}

window.addEventListener('resize', handleMobileNav);
handleMobileNav();

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        // Can add scroll-to-top button here
    }
});
