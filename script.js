// Función para detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Carga optimizada: primero el contenido, luego los efectos
window.addEventListener('load', () => {
    AOS.init({ duration: 800, once: true });

    if (!isMobile()) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: '#00f2ff' },
                opacity: { value: 0.1 },
                size: { value: 2 },
                line_linked: { enable: true, distance: 150, color: '#00f2ff', opacity: 0.05, width: 1 },
                move: { enable: true, speed: 1 }
            }
        });

        // Confetti de bienvenida
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f2ff', '#4d7cff', '#ff9f43', '#ffffff']
            });
        }, 2000);
    }

    // Contador animado
    const counters = document.querySelectorAll('.metric-card strong');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = Math.max(target / 100, 1);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    });
});

// Botón volver arriba y parallax (solo en desktop)
const backToTop = document.querySelector('.back-to-top');
const particlesLayer = document.getElementById('particles-js');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (!isMobile() && particlesLayer) {
        particlesLayer.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    if (backToTop) {
        if (scrolled > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

// Aura del cursor (solo en desktop)
if (!isMobile()) {
    const aura = document.getElementById('cursor-aura');
    if (aura) {
        document.addEventListener('mousemove', (e) => {
            aura.style.left = e.clientX + 'px';
            aura.style.top = e.clientY + 'px';
        });
    }
}

// Efecto de frases rotativas suaves
const typedText = document.getElementById('typed-text');
const typedPhrases = [
    'Atención VIP para tu hogar',
    'Diagnóstico exprés con técnica profesional',
    'Reparación premium con garantía certificada'
];
let phraseIndex = 0;

function showPhrase() {
    if (!typedText) return;
    typedText.classList.remove('visible');
    setTimeout(() => {
        typedText.textContent = typedPhrases[phraseIndex];
        typedText.classList.add('visible');
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    }, 250);
}

showPhrase();
setInterval(showPhrase, 4200);

// FAQ interactivo
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('active'));
});

// Registrar Service Worker para cache offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registrado'))
            .catch(error => console.log('SW error:', error));
    });
}