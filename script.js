// ============================================
// Dapoer Niknik — Script
// Clean, modern interactions
// ============================================

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value;

    const waMessage = `*Pesan dari Website Dapoer Niknik*\n\n` +
                    `*Nama:* ${name}\n` +
                    `*No. WA:* ${phone}\n` +
                    `*Jenis Pesanan:* ${service}\n` +
                    `*Pesan:* ${message}`;

    const waUrl = `https://wa.me/6281381228890?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
}

// Tab Logic
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    const tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
}, { passive: true });

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Hamburger Menu (Mobile)
// ============================================

function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
}

// ============================================
// Scroll Reveal Animations
// ============================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Don't unobserve stagger-children so we can re-trigger if needed
            if (!entry.target.classList.contains('stagger-children')) {
                revealObserver.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
});

// Observe all reveal & stagger elements
document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
    revealObserver.observe(el);
});

// ============================================
// Smooth Scroll (anchor links)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Menu carousel drag-to-scroll (optional UX)
// ============================================

document.querySelectorAll('.menu-carousel').forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    carousel.style.cursor = 'grab';
});

// ============================================
// Testimonial Auto-Scroll (clone for infinite)
// ============================================

const testimonialTrack = document.getElementById('testimonialTrack');
if (testimonialTrack) {
    // Clone all cards to create infinite loop
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        testimonialTrack.appendChild(clone);
    });
}

// ============================================
// FAQ Accordion
// ============================================

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');
    
    // Close all other items
    document.querySelectorAll('.faq-item.active').forEach(openItem => {
        openItem.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
    }
}
