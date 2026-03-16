/* ==============================================
   PORTFOLIO â€” Hanush Goud Kalal â€” script.js
   Animations, Interactions, Effects
============================================== */

/* ---- Navbar scroll behaviour ---- */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Shrink nav on scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll-to-top button
    if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Trigger skill bar animations when in view
    animateSkillsOnScroll();

    // Animate stat counters when in view
    animateStatsOnScroll();
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close mobile menu on link click
navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

/* ---- Typewriter Effect ---- */
const typedEl = document.getElementById('typed-text');
const phrases = [
    'Agile Scrum Master',
    'PMO Lead',
    'Project Manager',
    'Sprint Facilitator',
    'Agile Coach'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 1800);
            return;
        }
    } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    const speed = isDeleting ? 60 : 90;
    setTimeout(type, speed);
}

// Start typewriter after a short delay
setTimeout(type, 1000);

/* ---- Particles.js Configuration ---- */
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: ['#D4AF37', '#e8c94e', '#a88a20', '#ffffff'] },
            shape: { type: 'circle' },
            opacity: {
                value: 0.35,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.05, sync: false }
            },
            size: {
                value: 2.5,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 160,
                color: '#D4AF37',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.9,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 180, line_linked: { opacity: 0.4 } },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
}

/* ---- AOS Initialization ---- */
AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
});

/* ---- Skill Bar Animation ---- */
let skillsAnimated = false;

function animateSkillsOnScroll() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
        skillsAnimated = true;
        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
            const target = fill.getAttribute('data-width');
            // Stagger the animation
            setTimeout(() => {
                fill.style.width = target + '%';
            }, 100);
        });
    }
}

/* ---- Stat Counter Animation ---- */
let statsAnimated = false;

function animateStatsOnScroll() {
    if (statsAnimated) return;
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
        statsAnimated = true;
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            let current = 0;
            const increment = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current;
            }, 40);
        });
    }
}

/* ---- Smooth hover ripple on timeline cards ---- */
document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

/* ---- Contact card tilt effect ---- */
document.querySelectorAll('.contact-card:not(.no-link)').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        const rotateX = deltaY * -5;
        const rotateY = deltaX * 5;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ---- Page load entrance ---- */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
        // Trigger initial check for sections already in view
        animateSkillsOnScroll();
        animateStatsOnScroll();
    }, 50);
});

/* ---- Hamburger animation ---- */
const styleEl = document.createElement('style');
styleEl.textContent = `
  .hamburger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;
document.head.appendChild(styleEl);

/* ==========================================
   CUSTOM CURSOR + CLICK EFFECTS + ORBS
========================================== */

/* Skip on touch devices */
if (window.matchMedia('(hover: hover)').matches) {

    /* --- Cursor elements --- */
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorRing.id = 'cursor-ring';
    document.body.append(cursorDot, cursorRing);

    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        spawnTrail(mouseX, mouseY);
    });

    /* Smooth lag ring follow via RAF */
    (function animRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animRing);
    })();

    /* Hover expand on interactive elements */
    document.addEventListener('mouseover', e => {
        if (e.target.closest('a, button, .timeline-card, .contact-card, .comp-badge, .badge, .nav-link, .skills-column')) {
            document.body.classList.add('cursor-hovering');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest('a, button, .timeline-card, .contact-card, .comp-badge, .badge, .nav-link, .skills-column')) {
            document.body.classList.remove('cursor-hovering');
        }
    });

    /* Click effects */
    document.addEventListener('mousedown', e => {
        document.body.classList.add('cursor-clicking');
        spawnRipple(e.clientX, e.clientY);
        spawnSparks(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-clicking');
    });

    /* Ripple rings on click */
    function spawnRipple(x, y) {
        ['ring', 'ring2'].forEach(cls => {
            const el = document.createElement('div');
            el.className = `click-ripple ${cls}`;
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        });
    }

    /* Gold spark burst on click */
    function spawnSparks(x, y) {
        const count = 10;
        const colors = ['#D4AF37', '#e8c94e', '#ffffff', '#a88a20'];
        for (let i = 0; i < count; i++) {
            const angle = (360 / count) * i + (Math.random() * 18 - 9);
            const rad = angle * Math.PI / 180;
            const dist = 45 + Math.random() * 40;
            const tx = (Math.cos(rad) * dist).toFixed(1);
            const ty = (Math.sin(rad) * dist).toFixed(1);
            const dur = (0.5 + Math.random() * 0.35).toFixed(2) + 's';
            const size = (3 + Math.random() * 4).toFixed(1) + 'px';

            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.cssText = `left:${x}px;top:${y}px;width:${size};height:${size};`
                + `background:${colors[i % colors.length]};`
                + `--tx:${tx}px;--ty:${ty}px;--dur:${dur};`
                + `box-shadow:0 0 6px ${colors[i % colors.length]};`;
            document.body.appendChild(spark);
            spark.addEventListener('animationend', () => spark.remove());
        }
    }

    /* Gold trail dots following cursor */
    let lastTrail = 0;
    function spawnTrail(x, y) {
        const now = Date.now();
        if (now - lastTrail < 38) return;
        lastTrail = now;
        const size = (2.5 + Math.random() * 3).toFixed(1);
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;`;
        document.body.appendChild(dot);
        dot.addEventListener('animationend', () => dot.remove());
    }

} // end hover-device guard

/* ---- Background Floating Orbs ---- */
(function spawnOrbs() {
    const orbs = [
        { cls: 'orb-gold', w: 500, h: 500, x: '8%', y: '15%', tx: '60px', ty: '-80px', dur: '22s', delay: '0s' },
        { cls: 'orb-gold', w: 380, h: 380, x: '72%', y: '60%', tx: '-70px', ty: '60px', dur: '28s', delay: '4s' },
        { cls: 'orb-white', w: 280, h: 280, x: '50%', y: '5%', tx: '-50px', ty: '40px', dur: '19s', delay: '2s' },
        { cls: 'orb-gold', w: 420, h: 420, x: '85%', y: '8%', tx: '-90px', ty: '80px', dur: '32s', delay: '8s' },
        { cls: 'orb-white', w: 200, h: 200, x: '20%', y: '70%', tx: '50px', ty: '-60px', dur: '24s', delay: '6s' },
        { cls: 'orb-gold', w: 320, h: 320, x: '40%', y: '85%', tx: '30px', ty: '-100px', dur: '26s', delay: '10s' },
    ];
    orbs.forEach(o => {
        const el = document.createElement('div');
        el.className = `bg-orb ${o.cls}`;
        el.style.cssText = `width:${o.w}px;height:${o.h}px;left:${o.x};top:${o.y};`
            + `--tx:${o.tx};--ty:${o.ty};--orb-dur:${o.dur};--orb-delay:${o.delay};`;
        document.body.appendChild(el);
    });
})();

