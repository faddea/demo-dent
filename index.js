let config = {};

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        renderContent();
    } catch (error) {
        console.error('Error cargando config:', error);
    }
}

function renderContent() {
    document.getElementById('logo').textContent = config.clinica?.nombre || 'Clínica Dental';
    document.getElementById('footer-logo').textContent = config.clinica?.nombre || 'Clínica Dental';
    
    document.getElementById('footer-contacto').innerHTML = `
        <li>Teléfono: ${config.clinica?.telefono || '--'}</li>
        <li>Email: ${config.clinica?.email || '--'}</li>
        <li>Dirección: ${config.clinica?.direccion || '--'}</li>
    `;

    const horarios = Object.entries(config.horario || {})
        .map(([dia, hora]) => `<li>${dia.charAt(0).toUpperCase() + dia.slice(1)}: ${hora}</li>`)
        .join('');
    document.getElementById('footer-horario').innerHTML = horarios;

    const redes = `
        <a href="${config.clinica?.facebook || '#'}" class="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
        </a>
        <a href="${config.clinica?.instagram || '#'}" class="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
    `;
    document.getElementById('footer-redes').innerHTML = redes;

    const servicios = (config.servicios || []).map(serv => `
        <div class="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition cursor-pointer">
            <div class="w-14 h-14 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 1.5 4 3 5.5V21h6v-8.5c1.5-1.5 3-3.5 3-5.5C18 4.5 15.5 2 12 2z"/>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary mb-2">${serv.titulo}</h3>
            <p class="text-gray-600">${serv.descripcion}</p>
        </div>
    `).join('');
    document.getElementById('servicios-grid').innerHTML = servicios;

    const testimonios = (config.testimonios || []).map(test => `
        <div class="bg-gray-50 p-6 rounded-xl">
            <div class="flex mb-4">
                ${Array(test.estrellas).fill().map(() => '<svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>').join('')}
            </div>
            <p class="text-gray-600 mb-4 italic">"${test.texto}"</p>
            <p class="font-semibold text-secondary">${test.nombre}</p>
        </div>
    `).join('');
    document.getElementById('testimonios-grid').innerHTML = testimonios;
}

function initAnimations() {
    gsap.from('#navbar', { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-content', { x: -50, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero-image', { x: 50, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.from('#servicios h2', { scrollTrigger: '#servicios', y: 50, opacity: 0, duration: 0.8 });
    gsap.from('#servicios-grid > div', { scrollTrigger: '#servicios-grid', y: 30, opacity: 0, duration: 0.6, stagger: 0.1 });
    gsap.from('#testimonios h2', { scrollTrigger: '#testimonios', y: 50, opacity: 0, duration: 0.8 });
    gsap.from('#testimonios-grid > div', { scrollTrigger: '#testimonios-grid', y: 30, opacity: 0, duration: 0.6, stagger: 0.15 });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobilePanel = document.getElementById('mobile-panel');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-md');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-md');
            navbar.classList.add('bg-transparent');
        }
    });

    function openMenu() {
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('bg-transparent');
        mobileMenu.classList.remove('hidden');
        setTimeout(() => mobilePanel.classList.remove('translate-x-full'), 10);
    }

    function closeMenu() {
        mobilePanel.classList.add('translate-x-full');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        if (window.scrollY <= 50) {
            navbar.classList.remove('bg-white', 'shadow-md');
            navbar.classList.add('bg-transparent');
        }
    }

    menuToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initForm() {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias! Tu solicitud ha sido enviada. Nos contactaremos pronto.');
        e.target.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    initNavbar();
    initForm();
    if (typeof gsap !== 'undefined') {
        initAnimations();
    }
});