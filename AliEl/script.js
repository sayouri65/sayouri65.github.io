// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
});

// Close mobile menu events
document
  .querySelectorAll(".nav-link")
  .forEach((n) => n.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMenu();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Header background and scroll effects
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.style.background =
    window.scrollY > 100 ? "rgba(20, 20, 20, 0.98)" : "rgba(20, 20, 20, 0.95)";

  // Parallax effect for hero section
  const parallax = document.querySelector(".hero-bg");
  if (parallax) {
    const speed = window.innerWidth <= 768 ? 0.2 : 0.5;
    parallax.style.transform = `translateY(${window.pageYOffset * speed}px)`;
  }
});

// Animate elements on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

// Gallery and contact interactions
document.querySelectorAll(".gallery-item").forEach((item) => {
  let isTouch = false;

  item.addEventListener("touchstart", () => (isTouch = true));
  item.addEventListener("click", (e) => {
    if (isTouch) {
      e.preventDefault();
      setTimeout(() => (isTouch = false), 300);
    }
    item.style.transform =
      item.style.transform === "scale(1.05)" ? "scale(1)" : "scale(1.05)";

    if (navigator.vibrate && window.innerWidth <= 768) navigator.vibrate(50);
  });

  if ("ontouchstart" in window) {
    item.addEventListener("touchstart", () => (item.style.opacity = "0.8"));
    item.addEventListener("touchend", () => (item.style.opacity = "1"));
  }
});

// Phone number setup
const phoneNumber = "530071218";

// Contact button confirmations
document.querySelectorAll(".contact-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const isPhone = btn.classList.contains("phone-btn");
    const isSMS = btn.classList.contains("sms-btn");
    const message = isPhone
      ? "Czy chcesz zadzwonić do AliEl - Szalone nożyczki?"
      : isSMS
      ? "Czy chcesz wysłać SMS do AliEl - Szalone nożyczki?"
      : null;

    if (message && !confirm(message)) e.preventDefault();
  });
});

// Polish holidays check
function isPolishHoliday(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const fixedHolidays = [
    [1, 1],
    [1, 6],
    [5, 1],
    [5, 3],
    [8, 15],
    [11, 1],
    [11, 11],
    [12, 25],
    [12, 26],
  ];

  if (fixedHolidays.some(([m, d]) => m === month && d === day)) return true;

  // Easter calculation
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;

  const easter = new Date(year, n - 1, p + 1);
  const easterDates = [
    easter,
    new Date(easter.getTime() + 86400000), // Easter Monday
    new Date(easter.getTime() + 49 * 86400000), // Pentecost
    new Date(easter.getTime() + 60 * 86400000), // Corpus Christi
  ];

  return easterDates.some(
    (d) => month === d.getMonth() + 1 && day === d.getDate()
  );
}

// Business hours logic
function checkBusinessHours() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();

  let isBusinessHours;
  if (isPolishHoliday(now)) {
    isBusinessHours = currentHour >= 10 && currentHour < 14;
  } else if (currentDay === 0 || currentDay === 6) {
    isBusinessHours = currentHour >= 9 && currentHour < 17;
  } else {
    isBusinessHours = currentHour >= 8 && currentHour < 20;
  }

  const phoneWrapper = document
    .querySelector(".phone-btn")
    ?.closest(".contact-button-wrapper");
  const smsWrapper = document
    .querySelector(".sms-btn")
    ?.closest(".contact-button-wrapper");
  const contactButtons = document.querySelector(".contact-buttons");
  const phoneBtn = document.querySelector(".phone-btn");
  const infoWH = document.querySelector(".info-note-workhinfo");

  if (phoneWrapper && smsWrapper && phoneBtn) {
    phoneWrapper.style.display = isBusinessHours ? "block" : "none";
    smsWrapper.style.display = "block";
    if (contactButtons) contactButtons.style.justifyContent = "center";
    if (infoWH) infoWH.style.display = isBusinessHours ? "none" : "block";

    if (isBusinessHours) {
      phoneBtn.style.background = "linear-gradient(45deg, #28a745, #20c997)";
      phoneBtn.innerHTML =
        '<i class="fas fa-phone-alt"></i><span>Zadzwoń teraz - DOSTĘPNY!</span>';
    } else {
      phoneBtn.style.background = "";
      phoneBtn.innerHTML =
        '<i class="fas fa-phone-alt"></i><span>530 071 218</span>';
    }
  }
}

// Check business hours on page load and every minute
document.addEventListener("DOMContentLoaded", checkBusinessHours);
setInterval(checkBusinessHours, 60000); // Check every minute

// Easter egg - dragon animation
let clickCount = 0;
document.querySelector(".logo").addEventListener("click", () => {
  if (++clickCount === 5) {
    const dragon = document.createElement("div");
    dragon.innerHTML = "🐲";
    dragon.style.cssText = `
      position: fixed; font-size: 3rem; z-index: 9999; pointer-events: none;
      left: -100px; top: 50%; animation: dragonFly 3s ease-in-out forwards;
    `;
    document.body.appendChild(dragon);

    const style = document.createElement("style");
    style.textContent = `
      @keyframes dragonFly {
        0% { left: -100px; transform: rotate(0deg) scale(1); }
        50% { left: 50vw; transform: rotate(360deg) scale(1.5); }
        100% { left: calc(100vw + 100px); transform: rotate(720deg) scale(1); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      dragon.remove();
      style.remove();
    }, 3000);
    clickCount = 0;
  }
});

// Scroll-to-top button
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".scroll-to-top")) return;

  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-to-top";
  scrollBtn.setAttribute("aria-label", "Przewiń do góry");
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("visible", window.pageYOffset > 300);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Initialize business hours check
checkBusinessHours();
setInterval(checkBusinessHours, 60000);

// Page loading animation
window.addEventListener("load", () => {
  document.body.style.cssText = "opacity: 0; transition: opacity 0.3s ease;";
  setTimeout(() => (document.body.style.opacity = "1"), 100);
});

// Set current year
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
