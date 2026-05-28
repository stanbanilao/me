/* ============================================
   STAN PORTFOLIO — Premium Interactions
   Scroll Reveal, 3D Pop, Typewriter, Spotlight
   ============================================ */

(function () {
    'use strict';

    // ---- SPOTLIGHT FOLLOW (Desktop only) ----
    if (window.innerWidth > 768) {
        const spotlight = document.getElementById('spotlight');
        let mouseX = '50vw', mouseY = '50vh';
        let rafId = null;

        function updateSpotlight() {
            spotlight.style.setProperty('--mouse-x', mouseX);
            spotlight.style.setProperty('--mouse-y', mouseY);
            rafId = null;
        }

        window.addEventListener('mousemove', (e) => {
            mouseX = `${e.clientX}px`;
            mouseY = `${e.clientY}px`;
            if (!rafId) {
                rafId = requestAnimationFrame(updateSpotlight);
            }
        });
    }

    // ---- MOBILE MENU ----
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinks = document.getElementById('nav-links');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
        }
    });

    // ---- SCROLL REVEAL with 3D POP ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when scrolling away for bi-directional animation
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- TILT EFFECT ON CARDS (Desktop) ----
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.glass-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ---- TYPEWRITER EFFECT ----
    const phrases = [
        'Automation Specialist',
        'Systems Optimizer',
        'Data Operations Lead',
        'Compliance Infrastructure Specialist',
        'Digital Operations Architect'
    ];
    const textElement = document.getElementById('typewriter');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 70;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 800);

    // ---- SMOOTH SCROLL for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- HEADER SCROLL EFFECT ----
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.borderBottomColor = 'rgba(0, 150, 255, 0.15)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.borderBottomColor = 'rgba(100, 160, 255, 0.08)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ---- PARALLAX ORB MOVEMENT ON SCROLL ----
    if (window.innerWidth > 768) {
        const orbs = document.querySelectorAll('.orb');
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 0.02;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

})();
