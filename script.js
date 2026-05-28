if (window.innerWidth > 768) {
    const spotlight = document.getElementById('spotlight');
    window.addEventListener('mousemove', (e) => {
        spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
}

const mobileBtn = document.getElementById('mobile-btn');
const navLinks = document.getElementById('nav-links');
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

const phrases = [
    'Automation Specialist', 
    'Systems Optimizer', 
    'Data Operations Lead', 
    'Compliance Infrastructure Specialist'
];
const textElement = document.getElementById('typewriter');
let phraseIndex = 0; let charIndex = 0; let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.innerText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.innerText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 40 : 80;
    
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
setTimeout(type, 1000);

setInterval(() => {
    const cursor = document.querySelector('.cursor');
    if(cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500);
