
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// ===============================
// Mobile Navigation
// ===============================

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "×" : "☰";
  });

  $$(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

// ===============================
// Language Switch
// ===============================

let currentLang = "ar";
const langBtn = $("#langBtn");

function setLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("english", lang === "en");

  $$("[data-ar][data-en]").forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) {
      el.innerHTML = value;
    }
  });

  $$("[data-placeholder-ar][data-placeholder-en]").forEach(el => {
    const key = lang === "ar" ? "placeholderAr" : "placeholderEn";
    const value = el.dataset[key];

    if (value !== undefined) {
      el.placeholder = value;
    }
  });

  if (langBtn) {
    langBtn.textContent = lang === "ar" ? "EN" : "ع";
  }

  document.title = lang === "ar"
    ? "المهندس عبدالله الريح | مهندس مدني"
    : "ABDALLAH ALRAYAH | Civil Engineer";
}

if (langBtn) {
  langBtn.addEventListener("click", () => {
    setLanguage(currentLang === "ar" ? "en" : "ar");
  });
}

// ===============================
// Dark / Light Mode
// ===============================

const themeBtn = $("#themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
      document.body.classList.contains("dark") ? "☀" : "☾";
  });
}

// ===============================
// Projects Filter
// ===============================

$$(".filter").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter").forEach(item => item.classList.remove("active"));

    button.classList.add("active");

    const filter = button.dataset.filter;

    $$(".project-card").forEach(card => {
      card.classList.toggle(
        "hidden",
        filter !== "all" && card.dataset.category !== filter
      );
    });
  });
});

// ===============================
// Project Modal
// ===============================

const modal = $("#projectModal");
const modalImage = $("#modalImage");

$$(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    if (!modal || !modalImage) return;

    const card = button.closest(".project-card");
    if (!card) return;

    const image = $("img", button);

    if (image) {
      modalImage.src = image.src;
      modalImage.alt = image.alt;
    }

    const modalTitle = $("#modalTitle");
    const modalDescription = $("#modalDescription");
    const modalMeta = $("#modalMeta");

    if (modalTitle) {
      modalTitle.textContent =
        card.dataset[`title${currentLang.toUpperCase()}`] || "";
    }

    if (modalDescription) {
      modalDescription.textContent =
        card.dataset[`description${currentLang.toUpperCase()}`] || "";
    }

    if (modalMeta) {
      modalMeta.textContent =
        card.dataset[`meta${currentLang.toUpperCase()}`] || "";
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

$$("[data-close]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// ===============================
// Contact Form
// ===============================

const contactForm = $("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const recipient = "abdallahmokhtar.998@gmail.com";

    const subject = encodeURIComponent(data.get("subject") || "");

    const body = encodeURIComponent(
      `الاسم: ${data.get("name") || ""}\n` +
      `البريد: ${data.get("email") || ""}\n\n` +
      `الرسالة:\n${data.get("message") || ""}`
    );

    window.location.href =
      `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

// ===============================
// Scroll Progress Bar
// ===============================

const progressBar = $("#progressBar");

if (progressBar) {
  window.addEventListener("scroll", () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      max > 0 ? (window.scrollY / max) * 100 : 0;

    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// ===============================
// Footer Year
// ===============================

const year = new Date().getFullYear();

$$(".footer-inner p").forEach(el => {
  el.innerHTML = el.innerHTML.replace("<YEAR>", year);
});

// ===============================
// CV Download
// ===============================
// لا نستخدم fetch أو Blob هنا.
// التحميل يتم بواسطة خاصية download في HTML.
// تأكد من صحة مسار ملف PDF.
