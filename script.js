/* ===================================================
   PT LEE CNCET — script.js (Full Rewrite 2026)
   =================================================== */

// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    const toggle = document.getElementById("menuToggle");
    nav.classList.toggle("active");
    // Animate hamburger
    const spans = toggle.querySelectorAll("span");
    if (nav.classList.contains("active")) {
        spans[0].style.cssText = "transform:rotate(45deg) translate(5px,5px)";
        spans[1].style.cssText = "opacity:0;transform:scaleX(0)";
        spans[2].style.cssText = "transform:rotate(-45deg) translate(5px,-5px)";
    } else {
        spans.forEach(s => s.style.cssText = "");
    }
}

// Close menu on nav link click (mobile)
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        const nav = document.getElementById("navMenu");
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            document.getElementById("menuToggle").querySelectorAll("span")
                .forEach(s => s.style.cssText = "");
        }
    });
});

// Mobile dropdown toggle
document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle("open");
        }
    });
});

// ===== PARTICLE SYSTEM =====
(function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const count = 18;
    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 10 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = Math.random() * 10 + 10;
        p.style.cssText = `
            width:${size}px; height:${size}px;
            left:${left}%;
            bottom:-20px;
            animation-duration:${duration}s;
            animation-delay:${delay}s;
            opacity:${Math.random() * 0.4 + 0.1};
        `;
        container.appendChild(p);
    }
})();

// ===== HERO COUNTER (hero stats row) =====
const heroCounters = document.querySelectorAll(".count-num");
let heroCountersDone = false;

function animateHeroCounters() {
    if (heroCountersDone) return;
    heroCountersDone = true;
    heroCounters.forEach(el => {
        const target = +el.getAttribute("data-count");
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const tick = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString();
            }
        };
        tick();
    });
}

// Trigger hero counters after loader (1.5s)
setTimeout(animateHeroCounters, 1500);

// ===== MAIN COUNTER (stats section) =====
const statCounters = document.querySelectorAll(".count-up");
let statCountersDone = false;

function animateStatCounters() {
    if (statCountersDone) return;
    statCountersDone = true;
    statCounters.forEach(el => {
        const target = +el.getAttribute("data-count");
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const tick = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString();
            }
        };
        tick();
    });
}

const statsSection = document.getElementById("stats");
if (statsSection) {
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) animateStatCounters();
    }, { threshold: 0.3 });
    obs.observe(statsSection);
}

// ===== DYNAMIC EVENTS =====
const events = [
    { icon: "🎤", title: "Guest Lecture on Artificial Intelligence", date: "Feb 28, 2026" },
    { icon: "🏆", title: "Anna University Sports Championship Winner 2025", date: "Feb 20, 2026" },
    { icon: "💼", title: "Campus Placement Drive — TCS & Infosys", date: "March 15, 2026" },
    { icon: "🔬", title: "National Technical Symposium — Technovista 2026", date: "March 22, 2026" },
    { icon: "🎓", title: "Graduation Day Ceremony", date: "April 5, 2026" },
    { icon: "🤖", title: "AI & ML Workshop for Students", date: "April 18, 2026" },
];

const eventList = document.getElementById("eventList");
if (eventList) {
    events.forEach(ev => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                <span>${ev.icon} ${ev.title}</span>
                <span style="font-size:0.75rem;opacity:0.7;white-space:nowrap;margin-top:2px">${ev.date}</span>
            </div>
        `;
        eventList.appendChild(li);
    });
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Respect CSS custom property delay
            const delay = getComputedStyle(entry.target).getPropertyValue("--delay") || "0s";
            const ms = parseFloat(delay) * 1000;
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, ms);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add("visible");
    } else {
        backToTop?.classList.remove("visible");
    }
}, { passive: true });

// ===== FORM SUBMISSION =====
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span>✅ Message Sent!</span>`;
    btn.style.background = "linear-gradient(135deg,#10b981,#059669)";
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = "";
        btn.disabled = false;
        e.target.reset();
    }, 3500);
}

// ===== GSAP ANIMATIONS =====
window.addEventListener("load", () => {

    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded — fallback applied.");
        document.querySelectorAll(".fade-up,.slide-left,.slide-right").forEach(el => {
            el.style.opacity = "1"; el.style.transform = "none";
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ---- Loader exit ----
    const loader = document.getElementById("loader");
    if (loader) {
        gsap.to(loader, {
            y: "-100%", duration: 1.3, delay: 2,
            ease: "power4.inOut",
            onComplete: () => { loader.style.display = "none"; }
        });
    }

    // ---- Hero text entrance ----
    const heroTL = gsap.timeline({ delay: 2.4 });

    heroTL
        .from(".hero-badge", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(".hero-headline .line-1", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.3")
        .from(".hero-headline .line-2", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.55")
        .from(".hero-headline .line-3", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.55")
        .from(".hero-headline .line-4", { y: 60, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.55")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-btns", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".hero-stats-row", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".statue-ring", { y: 80, opacity: 0, scale: 0.8, duration: 1.2, ease: "power4.out" }, "-=1.2")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.2");

    // ---- Header scroll effect ----
    ScrollTrigger.create({
        start: "top -60",
        end: 99999,
        toggleClass: { className: "scrolled", targets: ".topbar" }
    });

    // ---- Parallax hero bg ----
    gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".hero", scrub: 1 }
    });

    // ---- Section fade-in via ScrollTrigger ----
    gsap.utils.toArray(".section-tag, .section-header h2, .section-sub").forEach(el => {
        gsap.fromTo(el,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%" }
            }
        );
    });

    // ---- Stat cards pop ----
    gsap.utils.toArray(".stat-card").forEach((card, i) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9,
                delay: i * 0.12, ease: "back.out(1.4)",
                scrollTrigger: { trigger: ".stats-section", start: "top 80%" }
            }
        );
    });

});
