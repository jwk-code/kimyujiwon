// ===== SLIDER =====
document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelector('.slides');
    if (!slides) return;

    const total = slides.children.length;
    let index = 0;

    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    function update() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }
    const intervalTime = 10500 + Math.random() * 3500;

    const startDelay = Math.random() * 3500;

    setTimeout(() => {
        setInterval(() => {
            index = (index + 1) % total;
            update();
        }, intervalTime);
    }, startDelay);


    prevBtn?.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        index = (index - 1 + total) % total;
        update();
    });

    nextBtn?.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        index = (index + 1) % total;
        update();
    });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.slides img, .slider > img').forEach(img => {
    img.addEventListener('click', e => {
        e.stopPropagation();
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

lightbox?.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        lightbox?.classList.remove('active');
        if (lightboxImg) lightboxImg.src = '';
    }
});

// ===== SCROLL CONTROL =====
const col2 = document.querySelector('.col-2');

document.querySelectorAll('.list li').forEach(item => {
    item.addEventListener('click', () => {
        const target = document.getElementById(item.dataset.target);
        if (!target || !col2) return;

        col2.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
backToTop?.addEventListener('click', () => {
    col2?.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== DETAILS (DESKTOP OPEN / MOBILE CLOSED) =====
function updateDetailsState() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    document.querySelectorAll('details.collapsible').forEach(d => {
        d.open = !isMobile;
    });
}

updateDetailsState();
window.addEventListener('resize', updateDetailsState);

//drawer
const drawer = document.querySelector('.drawer');
const handle = document.querySelector('.drawer-handle');

handle.addEventListener('click', () => {
    drawer.classList.toggle('open');
});
//mobile drawer
//const drawer = document.querySelector(".drawer");
const drawingTrigger = document.querySelector(
    "details.drawer-trigger summary"
);

drawingTrigger.addEventListener("click", (e) => {
    e.preventDefault(); // details 기본 toggle 막기
    drawer.classList.toggle("open");
});

//dictionary
// js/myjs.js

function applyLang(lang) {
    if (!window.I18N || !I18N[lang]) return;

    document.documentElement.lang = lang === "ko" ? "ko" : "en";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const value = I18N[lang][key];
        if (value !== undefined) {
            el.textContent = value;
        }
    });

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "ko" ? "ENG" : "KOR";

    localStorage.setItem("lang", lang);
}

function initLang() {
    const saved = localStorage.getItem("lang") || "ko";
    applyLang(saved);

    const btn = document.getElementById("langToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const current = localStorage.getItem("lang") || "ko";
        applyLang(current === "ko" ? "en" : "ko");
    });
}

document.addEventListener("DOMContentLoaded", initLang);
