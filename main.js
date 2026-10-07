/* ============================================================
   UNO MEDIA | صناعة المحتوى والتسويق الرقمي — main.js
   ============================================================ */

/* ============================================================
   1) روابط منصات التواصل الاجتماعي
   ⚠️ ضع روابطك الحقيقية هنا — استبدل القيم أدناه فقط.
   ============================================================ */
const socialLinks = {
    instagram: "YOUR_INSTAGRAM_LINK",   // 👈 ضع رابط إنستغرام
    tiktok: "YOUR_TIKTOK_LINK",         // 👈 ضع رابط تيك توك
    facebook: "YOUR_FACEBOOK_LINK",     // 👈 ضع رابط فيسبوك
    linkedin: "YOUR_LINKEDIN_LINK",     // 👈 ضع رابط لينكدإن
    youtube: "YOUR_YOUTUBE_LINK"        // 👈 ضع رابط يوتيوب
};

/* ربط جميع الأزرار التي تحمل الخاصية data-social بالروابط أعلاه */
document.querySelectorAll("[data-social]").forEach((link) => {
    const key = link.dataset.social;
    const url = socialLinks[key];

    if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        /* تنبيه واضح عندما يكون الرابط ما يزال placeholder */
        if (url.startsWith("YOUR_")) {
            link.classList.add("is-placeholder");
            link.title = "⚠️ استبدل هذا الرابط في ملف main.js";
        }
    }
});

/* ============================================================
   2) قائمة الهاتف (Hamburger menu)
   ============================================================ */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    });

    /* إغلاق القائمة عند الضغط على أي رابط داخلها */
    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* ============================================================
   3) تظليل الرابط النشط أثناء التمرير (Scroll spy)
   ============================================================ */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        },
        { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => spy.observe(section));
}

/* ============================================================
   4) ظهور العناصر عند التمرير (Scroll reveal)
   ============================================================ */
const revealEls = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => revealer.observe(el));
} else {
    /* بدون حركة: إظهار كل العناصر مباشرة */
    revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* ============================================================
   5) شريط التنقل + زر العودة إلى الأعلى
   ============================================================ */
const navbar = document.getElementById("navbar");
const toTopBtn = document.getElementById("toTop");

function handleScrollUI() {
    const scrolled = window.scrollY > 24;
    if (navbar) navbar.classList.toggle("scrolled", scrolled);
    if (toTopBtn) toTopBtn.classList.toggle("show", window.scrollY > 560);
}

window.addEventListener("scroll", handleScrollUI, { passive: true });
handleScrollUI();

if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================================================
   6) سنة الحقوق في الفوتر تلقائياً
   ============================================================ */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
