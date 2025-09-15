// Global Variables
let liked = false;
let commented = false;
let subscribed = false;

// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const toast = document.getElementById("toast");

// Download flow elements
const subscribeBtn = document.getElementById("subscribeBtn");
const likeBtn = document.getElementById("likeBtn");
const commentBtn = document.getElementById("commentBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const likeProgress = document.getElementById("likeProgress");
const commentProgress = document.getElementById("commentProgress");
const verificationLoader = document.getElementById("verificationLoader");
const progressFill = document.getElementById("progressFill");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeScrollEffects();
  initializeCounters();
  initializeDownloadFlow();
});

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll Effects
function initializeScrollEffects() {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll effect
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (scrollTop > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.2;
      const yPos = -(scrollTop * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });

    lastScrollTop = scrollTop;
  });

  // Back to top functionality
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Counter Animations
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.7,
  };

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent =
              Math.floor(current) +
              (target === 99 ? "%" : target === 24 ? "h" : "+");
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent =
              target + (target === 99 ? "%" : target === 24 ? "h" : "K+");
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Animation Initialization
function initializeAnimations() {
  // Create floating particles
  createFloatingParticles();

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".feature-card, .download-card, .step"
  );

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Floating Particles
function createFloatingParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.style.position = "fixed";
  particleContainer.style.top = "0";
  particleContainer.style.left = "0";
  particleContainer.style.width = "100%";
  particleContainer.style.height = "100%";
  particleContainer.style.pointerEvents = "none";
  particleContainer.style.zIndex = "-1";
  document.body.appendChild(particleContainer);

  function createParticle() {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 6 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(0, 245, 255, ${
      Math.random() * 0.5 + 0.1
    })`;
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = "100vh";
    particle.style.animation = `floatUp ${
      Math.random() * 10 + 15
    }s linear infinite`;

    particleContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 25000);
  }

  // Create particles periodically
  setInterval(createParticle, 2000);

  // Create initial particles
  for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200);
  }

  // Add CSS animation
  if (!document.getElementById("particleAnimation")) {
    const style = document.createElement("style");
    style.id = "particleAnimation";
    style.textContent = `
      @keyframes floatUp {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${
            Math.random() * 200 - 100
          }px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Download Flow Functions
function initializeDownloadFlow() {
  // Subscribe button
  subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    subscribed = true;
    showToast("Cảm ơn bạn đã đăng ký kênh! 🎉", "success");

    // Add click effect
    createClickEffect(e.clientX, e.clientY);

    // Show step 2 after delay
    setTimeout(() => {
      showStep(2);
    }, 1500);

    // Open YouTube in new tab
    window.open("https://www.youtube.com/@NiCueeVN", "_blank");
  });

  // Like button
  likeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!liked) {
      liked = true;
      this.innerHTML = '<i class="fas fa-check"></i> <span>Đã Like</span>';
      this.style.background = "linear-gradient(135deg, #10b981, #059669)";

      likeProgress.classList.add("completed");
      likeProgress.querySelector(".status").textContent = "Hoàn thành";

      showToast("Like thành công! 👍", "success");
      createClickEffect(e.clientX, e.clientY);

      checkInteractionComplete();
    }

    // Open YouTube video
    window.open("https://m.youtube.com/watch?v=oz4g-T5kuh0", "_blank");
  });

  // Comment button
  commentBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!commented) {
      commented = true;
      this.innerHTML = '<i class="fas fa-check"></i> <span>Đã Comment</span>';
      this.style.background = "linear-gradient(135deg, #10b981, #059669)";

      commentProgress.classList.add("completed");
      commentProgress.querySelector(".status").textContent = "Hoàn thành";

      showToast("Comment thành công! 💬", "success");
      createClickEffect(e.clientX, e.clientY);

      checkInteractionComplete();
    }

    // Open YouTube video
    window.open("https://m.youtube.com/watch?v=oz4g-T5kuh0", "_blank");
  });
}

function showStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll(".download-step").forEach((step) => {
    step.classList.remove("active");
  });

  // Show specific step
  const targetStep = document.getElementById(`step${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add("active");

    // Scroll to step
    targetStep.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

function checkInteractionComplete() {
  if (liked && commented) {
    setTimeout(() => {
      showStep(3);
      startVerification();
    }, 1000);
  }
}

function startVerification() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;

    progressFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showStep(4);
        showToast("Xác minh thành công! Bạn có thể tải về ngay! 🚀", "success");
      }, 1000);
    }
  }, 300);
}

// Toast Notification System
function showToast(message, type = "info") {
  const toastContent = toast.querySelector(".toast-content");
  const toastIcon = toast.querySelector(".toast-icon");
  const toastMessage = toast.querySelector(".toast-message");

  // Set icon based on type
  let iconClass;
  switch (type) {
    case "success":
      iconClass = "fas fa-check-circle";
      break;
    case "error":
      iconClass = "fas fa-exclamation-circle";
      break;
    case "warning":
      iconClass = "fas fa-exclamation-triangle";
      break;
    default:
      iconClass = "fas fa-info-circle";
  }

  toastIcon.className = `toast-icon ${iconClass}`;
  toastMessage.textContent = message;
  toast.className = `toast ${type}`;

  // Show toast
  toast.classList.add("show");

  // Hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Click Effects
function createClickEffect(x, y) {
  const effect = document.createElement("div");
  effect.style.position = "fixed";
  effect.style.left = x + "px";
  effect.style.top = y + "px";
  effect.style.width = "20px";
  effect.style.height = "20px";
  effect.style.background = "rgba(0, 245, 255, 0.8)";
  effect.style.borderRadius = "50%";
  effect.style.transform = "translate(-50%, -50%)";
  effect.style.pointerEvents = "none";
  effect.style.zIndex = "9999";
  effect.style.animation = "clickRipple 0.8s ease-out forwards";

  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 800);

  // Add ripple animation if not exists
  if (!document.getElementById("clickRippleAnimation")) {
    const style = document.createElement("style");
    style.id = "clickRippleAnimation";
    style.textContent = `
      @keyframes clickRipple {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(10);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Button Click Effects
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
    createClickEffect(e.clientX, e.clientY);
  }
});

// Utility Functions
function showComingSoon() {
  showToast(
    "Tính năng sắp ra mắt! Vui lòng theo dõi kênh để cập nhật 📺",
    "info"
  );
}

// Mouse Movement Effects
document.addEventListener("mousemove", function (e) {
  // Parallax effect for floating shapes
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.02;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;

    shape.style.transform += ` translate(${x}px, ${y}px)`;
  });
});

// Card Hover Effects
document.querySelectorAll(".feature-card, .download-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Image Loading Effects
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
    this.style.transform = "scale(1)";
  });

  // Set initial state
  img.style.opacity = "0";
  img.style.transform = "scale(0.9)";
  img.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  // ESC to close mobile menu
  if (e.key === "Escape") {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }

  // Enter/Space on buttons
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.classList.contains("btn")
  ) {
    e.preventDefault();
    e.target.click();
  }
});

// Performance Optimization
let ticking = false;

function updateAnimations() {
  // Update any frame-based animations here
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

// Intersection Observer for better performance
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

// Observe all animatable elements
document
  .querySelectorAll(".feature-card, .download-card, .step")
  .forEach((el) => {
    intersectionObserver.observe(el);
  });

// Error Handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  showToast("Đã có lỗi xảy ra. Vui lòng tải lại trang.", "error");
});

// AdSense Error Handling
window.addEventListener("load", function () {
  // Check if AdSense loaded properly
  if (typeof window.adsbygoogle === "undefined") {
    console.warn("AdSense may be blocked by ad blocker");
  } else {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense initialization error:", e);
    }
  }
});

// Social Media Integration
function shareOnSocial(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Check out NiCue VN - Best Free Fire Mod Skins!"
  );

  let shareUrl;

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank", "width=600,height=400");
}

// Analytics Integration (if needed)
function trackEvent(eventName, eventData = {}) {
  // Google Analytics 4 event tracking
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, eventData);
  }

  // Console log for debugging
  console.log("Event tracked:", eventName, eventData);
}

// Track user interactions
document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-primary")) {
    trackEvent("button_click", { button_type: "primary" });
  }

  if (e.target.closest(".social-link")) {
    trackEvent("social_click", {
      platform: e.target.closest(".social-link").className,
    });
  }
});

// Page Visibility API for pausing animations
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause expensive animations when page is hidden
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page is visible
    document.body.style.animationPlayState = "running";
  }
});

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed");
      });
  });
}

// Initialize everything when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add loading complete class
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 500);

  // Initialize tooltips if any
  const tooltips = document.querySelectorAll("[data-tooltip]");
  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseenter", showTooltip);
    tooltip.addEventListener("mouseleave", hideTooltip);
  });
});

function showTooltip(e) {
  const tooltipText = e.target.getAttribute("data-tooltip");
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = tooltipText;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10000;
    pointer-events: none;
    top: ${e.clientY - 40}px;
    left: ${e.clientX}px;
    transform: translateX(-50%);
  `;
  document.body.appendChild(tooltip);
  e.target.tooltipElement = tooltip;
}

function hideTooltip(e) {
  if (e.target.tooltipElement) {
    e.target.tooltipElement.remove();
    delete e.target.tooltipElement;
  }
}

console.log("NiCue VN Website Loaded Successfully! 🚀");
