// ===== Mobile Menu Toggle =====
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
}

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        const nav = document.getElementById("navMenu");
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
        }
    });
});

// Mobile dropdown toggle via click
document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function (e) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            e.preventDefault();
            this.parentElement.classList.toggle("open");
        }
    });
});

// ===== Animated Counter (Intersection Observer - fires when visible) =====
const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-count");
        const duration = 2000; // ms
        const step = target / (duration / 16);
        let count = 0;

        const update = () => {
            count += step;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

const statsSection = document.getElementById("stats");
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
            }
        });
    }, { threshold: 0.4 });
    observer.observe(statsSection);
}

// ===== Dynamic Events =====
const events = [
    "🎤 Guest Lecture on Artificial Intelligence – Feb 28",
    "🏆 Anna University Sports Championship Winner 2025",
    "💼 Campus Placement Drive – March 15, 2026",
    "🔬 National Level Technical Symposium – Technovista 2026",
    "🎓 Graduation Day Ceremony – April 5, 2026"
];

const eventList = document.getElementById("eventList");
if (eventList) {
    events.forEach(event => {
        const li = document.createElement("li");
        li.textContent = event;
        eventList.appendChild(li);
    });
}

// ===== Scroll Reveal (vanilla fallback) =====
const reveals = document.querySelectorAll(".reveal");

function checkReveal() {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 80) {
            reveal.classList.add("active");
        }
    });
}

window.addEventListener("scroll", checkReveal, { passive: true });
checkReveal(); // run once on load

// ===== Form Submission =====
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    btn.textContent = "✅ Message Sent!";
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = "Send Message";
        btn.disabled = false;
        e.target.reset();
    }, 3000);
}

// ===== GSAP Animations (only after GSAP is loaded) =====
window.addEventListener("load", () => {

    // Safety check: if GSAP not loaded, skip
    if (typeof gsap === "undefined") {
        console.warn("GSAP not loaded. Skipping GSAP animations.");
        // Make sure all fade-up / slide elements are visible
        document.querySelectorAll(".fade-up, .slide-left, .slide-right").forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ===== Loader Out =====
    const loader = document.getElementById("loader");
    if (loader) {
        gsap.to(loader, {
            y: "-100%",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => { loader.style.display = "none"; }
        });
    }

    // ===== Hero Animations =====
    gsap.from(".hero h1", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        delay: 0.8,
        ease: "power4.out"
    });

    gsap.from(".hero p", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        delay: 1.1,
        ease: "power4.out"
    });

    gsap.from(".hero-btns", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 1.4,
        ease: "power4.out"
    });

    // ===== Fade Up Sections =====
    gsap.utils.toArray(".fade-up").forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 82%"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // ===== Slide Left =====
    gsap.utils.toArray(".slide-left").forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // ===== Slide Right =====
    gsap.utils.toArray(".slide-right").forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            },
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // ===== Text Mask Reveal =====
    document.querySelectorAll(".mask").forEach(mask => {
        const text = mask.innerText;
        const span = document.createElement("span");
        span.innerText = text;
        mask.innerHTML = "";
        mask.appendChild(span);

        gsap.to(span, {
            scrollTrigger: {
                trigger: mask,
                start: "top 85%"
            },
            y: "0%",
            duration: 1,
            ease: "power4.out"
        });
    });

    // ===== Stagger Text (Hero H1) =====
    document.querySelectorAll(".stagger").forEach(el => {
        const text = el.innerText;
        el.innerHTML = text.split("").map(char =>
            `<span>${char === " " ? "&nbsp;" : char}</span>`
        ).join("");

        gsap.to(el.querySelectorAll("span"), {
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out"
        });
    });

    // ===== Parallax Effect =====
    gsap.utils.toArray(".parallax").forEach(section => {
        gsap.to(section, {
            backgroundPosition: "50% 80%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                scrub: true
            }
        });
    });

    // ===== Header shrink on scroll =====
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: ".topbar" }
    });

}); // end window load