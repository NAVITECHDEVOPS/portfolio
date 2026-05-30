/* ============================================
   PORTFOLIO - Main JavaScript
   Handles: typing effect, scroll animations,
   navigation, counter, particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect for Hero ---
    const titles = [
        'Sr. Site Reliability Engineer',
        'Lead DevOps Engineer',
        'Release Manager',
        'Cloud Architect (AWS + Azure)',
        'AI/ML Ops & Python Automation'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typedText');

    function typeEffect() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // --- Back to Top ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.closest('.hero') && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .leadership-card, .about-grid, .contact-content'
    ).forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe hero for counter
    const heroSection = document.querySelector('.hero');
    if (heroSection) observer.observe(heroSection);

    // --- Particle Background ---
    function createParticles() {
        const particleContainer = document.getElementById('particles');
        if (!particleContainer) return;
        
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const colors = ['var(--accent)', 'var(--purple)', 'var(--green)', 'var(--gold)'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.4 + 0.1};
                animation: particleFloat ${Math.random() * 15 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    createParticles();

    // Add particle animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes particleFloat {
            0% { transform: translate(0, 0); opacity: 0.3; }
            25% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px); opacity: 0.5; }
            50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px); opacity: 0.2; }
            75% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px); opacity: 0.4; }
            100% { transform: translate(0, 0); opacity: 0.3; }
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Smooth reveal on page load ---
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});
