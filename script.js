// ========================================
// GROWVERO BUSINESS SETTINGS
// EDIT THESE VALUES ONLY
// ========================================

const GROWVERO_CONFIG = {
    whatsappNumber: "03455456465",
    whatsappLink: "https://wa.me/923455456465",
    email: "growvero@gmail.com",
    location: "Faisalabad, Pakistan",
    instagram: "https://www.instagram.com/grow_vero/",
    facebook: "https://www.facebook.com/share/1SLt2HqP9K/",
    linkedin: "https://www.linkedin.com/in/muhammad-noman-ali-3a014a3a9?"
};

// ========================================
// END OF BUSINESS SETTINGS
// ========================================

// Function to create a WhatsApp message link
function createWhatsAppLink(message) {
    const base = GROWVERO_CONFIG.whatsappLink;
    return `${base}?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if(filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Contact Form to WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Basic Validation
            if(!name || !email || !phone || !service || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // Build WhatsApp Message
            const finalMessage = `Hello GROWVERO,%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Message:* ${message}`;

            // Show Success Message
            const successMsg = document.getElementById('successMessage');
            successMsg.style.display = 'block';
            successMsg.textContent = "Thank you! Redirecting you to WhatsApp...";

            // Open WhatsApp
            setTimeout(() => {
                window.open(`${GROWVERO_CONFIG.whatsappLink}?text=${finalMessage.replace(/%0A/g, '\n')}`, '_blank');
            }, 1500);
        });
    }

    // 6. Course Enroll Buttons
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseName = e.target.dataset.course;
            const msg = `Hello GROWVERO, I am interested in the ${courseName} course. Please share the details.`;
            window.open(createWhatsAppLink(msg), '_blank');
        });
    });

    // 7. Pricing Buttons
    document.querySelectorAll('.pricing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packageName = e.target.dataset.package;
            const msg = `Hello GROWVERO, I am interested in the ${packageName} Package. Please share the details.`;
            window.open(createWhatsAppLink(msg), '_blank');
        });
    });
});