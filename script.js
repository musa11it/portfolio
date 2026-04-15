let currentLanguage = 'en';
let currentTheme = 'dark';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`) || element.getAttribute('data-en');
        if (text) {
            if (element.classList.contains('hero-subtitle')) {
                typeWriter(element, text, 50);
            } else {
                element.textContent = text;
            }
        }
    });

    const placeholders = {
        name: { en: 'Your Name', rw: 'Izina Ryacu', fr: 'Votre nom' },
        email: { en: 'Your Email', rw: 'Imeli Yawe', fr: 'Votre email' },
        subject: { en: 'Message Subject', rw: 'Icyo Ubutumwa', fr: 'Objet du message' },
        message: { en: 'Your message here...', rw: 'Ubutumwa bwawe hano...', fr: 'Votre message ici...' }
    };

    document.getElementById('name').placeholder = placeholders.name[lang];
    document.getElementById('email').placeholder = placeholders.email[lang];
    document.getElementById('subject').placeholder = placeholders.subject[lang];
    document.getElementById('message').placeholder = placeholders.message[lang];

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    setTheme(currentTheme);
}

function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');

    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

async function loadFooterVisitorCount() {
    const countElement = document.getElementById('footerVisitorCount');
    if (!countElement) return;

    let count = Number(localStorage.getItem('footerVisitorCount') || '0') + 1;
    localStorage.setItem('footerVisitorCount', count);
    countElement.textContent = count.toLocaleString();

    try {
        const response = await fetch('https://api.countapi.xyz/hit/studyinfo-space/portfolio');
        if (!response.ok) throw new Error('countapi error');
        const data = await response.json();
        const serverCount = Number(data.value);
        if (!Number.isNaN(serverCount)) {
            countElement.textContent = serverCount.toLocaleString();
            localStorage.setItem('footerVisitorCount', serverCount);
        }
    } catch (error) {
        console.warn('Footer visitor count fallback used:', error);
    }
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !subject || !message) {
            showFormStatus(currentLanguage === 'fr' ? 'Veuillez remplir tous les champs' : currentLanguage === 'rw' ? 'Nyuzuza ibisabwa byose' : 'Please fill in all fields', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus(currentLanguage === 'fr' ? 'Veuillez entrer un email valide' : currentLanguage === 'rw' ? 'Andika imeli iboneye' : 'Please enter a valid email', 'error');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormStatus(currentLanguage === 'fr' ? '✓ Message envoyé avec succès. Je vous recontacte bientôt!' : currentLanguage === 'rw' ? '✓ Ubutumwa bwoherejwe neza. Nzagusubiza vuba!' : '✓ Message sent successfully. I will reply soon!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showFormStatus(currentLanguage === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : currentLanguage === 'rw' ? 'Ikosa mu kohereza. Ongera ugerageze.' : 'Error sending message. Please try again.', 'error');
        }
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = 'home';

    sections.forEach(section => {
        const top = section.offsetTop - 160;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setLanguage(savedLanguage);
    setTheme(savedTheme);
    initializeContactForm();
    loadFooterVisitorCount();
    updateActiveNav();
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

document.getElementById('themeToggle').addEventListener('click', () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

document.getElementById('navToggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('show');
});

window.addEventListener('scroll', updateActiveNav);
