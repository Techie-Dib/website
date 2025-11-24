// ========================================
// MODERN GLASSMORPHISM IT DEPARTMENT WEBSITE
// ========================================

"use strict";

// ========================================
// DOM ELEMENTS
// ========================================
const floatingNav = document.getElementById("floatingNav");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const scrollTopBtn = document.getElementById("scrollTop");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const detailsBtn = document.getElementById("detailsBtn");
const registerBtn = document.getElementById("registerBtn");
const navLinks = document.querySelectorAll(".nav-link");

// ========================================
// STICKY NAVIGATION WITH SCROLL EFFECTS
// ========================================
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class for styling
  if (scrollTop > 100) {
    floatingNav.classList.add("scrolled");
  } else {
    floatingNav.classList.remove("scrolled");
  }

  // Show/hide scroll to top button
  if (scrollTop > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }

  lastScrollTop = scrollTop;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "auto";
});

// Close mobile menu when clicking on a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    navToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ========================================
// SCROLL TO TOP FUNCTIONALITY
// ========================================
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href !== "#" && href.length > 1) {
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const offsetTop = target.offsetTop - 100;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active nav link
        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      }
    }
  });
});

// ========================================
// TABS FUNCTIONALITY
// ========================================
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    btn.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================
const openModal = () => {
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
};

if (detailsBtn) {
  detailsBtn.addEventListener("click", openModal);
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    alert("Registration will open soon! Please check back later.");
  });
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

// Close modal when clicking outside
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loading");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".resource-card, .feature-item, .stat-card")
  .forEach((el) => {
    observer.observe(el);
  });

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ========================================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ========================================
// PARALLAX EFFECT FOR BACKGROUND ORBS
// ========================================
window.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".gradient-orb");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;

    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});


// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
const updateYear = () => {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
};

updateYear();

// ========================================
// FORM VALIDATION (IF FORMS ARE ADDED)
// ========================================
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ========================================
// PRELOADER (OPTIONAL)
// ========================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate elements on load
  setTimeout(() => {
    document.querySelectorAll(".glass").forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 100);
    });
  }, 300);
});

// ========================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to expensive scroll operations
const debouncedScroll = debounce(() => {
  // Expensive scroll operations here
  console.log("Scroll event processed");
}, 100);

window.addEventListener("scroll", debouncedScroll);

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log(
  "%c🎓 Gauhati University - IT Department",
  "font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00d9ff, #b430ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
);
console.log(
  "%c✨ Modern Glassmorphism Design",
  "font-size: 14px; color: #00d9ff;"
);
console.log(
  "%c💻 Built with HTML, CSS & JavaScript",
  "font-size: 12px; color: #b8c1ec;"
);

// ========================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ========================================
document.addEventListener("keydown", (e) => {
  // ESC key closes modals and menus
  if (e.key === "Escape") {
    if (mobileMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Tab key adds keyboard navigation indicator
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

// Remove keyboard navigation indicator on mouse click
document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================
const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showNotification("Copied to clipboard!");
  }
};

// ========================================
// NOTIFICATION SYSTEM
// ========================================
const showNotification = (message, type = "success") => {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: rgba(0, 217, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 217, 255, 0.3);
        border-radius: 16px;
        color: #00d9ff;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};

// Add notification animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    body.keyboard-navigation *:focus {
        outline: 2px solid #00d9ff !important;
        outline-offset: 4px !important;
    }
`;
document.head.appendChild(style);

// ========================================
// DYNAMIC CONTENT LOADING
// ========================================
const loadContent = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading content:", error);
    showNotification("Failed to load content", "error");
    return null;
  }
};

// ========================================
// RESOURCE CARD CLICK HANDLERS
// ========================================
document.querySelectorAll(".resource-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const resourceName = card.querySelector("h4").textContent;
    showNotification(`Opening ${resourceName}...`);

    // Simulate navigation delay
    setTimeout(() => {
      // In a real implementation, navigate to the resource
      console.log("Navigating to:", resourceName);
    }, 1000);
  });
});

// ========================================
// SEARCH FUNCTIONALITY (OPTIONAL)
// ========================================
const initSearch = () => {
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const searchQuery = prompt("Enter search query:");
      if (searchQuery && searchQuery.trim() !== "") {
        showNotification(`Searching for: ${searchQuery}`);
        // Implement actual search logic here
      }
    });
  }
};

initSearch();

// ========================================
// SOCIAL SHARE FUNCTIONALITY
// ========================================
const shareContent = (platform) => {
  const url = window.location.href;
  const title = document.title;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  }
};

// Add click handlers to social buttons
document.querySelectorAll(".social-btn").forEach((btn, index) => {
  const platforms = ["facebook", "twitter", "linkedin", "instagram", "youtube"];
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (index < 4) {
      shareContent(platforms[index]);
    } else {
      // YouTube - open channel
      window.open("https://youtube.com", "_blank");
    }
  });
});

// ========================================
// STATISTICS COUNTER ANIMATION
// ========================================
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start) + "+";
    }
  }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const target = parseInt(statNumber.textContent);
        animateCounter(statNumber, target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});

// ========================================
// DOWNLOAD BUTTON HANDLER
// ========================================
document.querySelectorAll("[data-download]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const fileName = btn.getAttribute("data-download");
    showNotification(`Downloading ${fileName}...`);
    // Implement actual download logic
  });
});

// ========================================
// EMAIL COPY FUNCTIONALITY
// ========================================
document.querySelectorAll(".hod-email, .footer-email").forEach((emailLink) => {
  emailLink.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const email = emailLink.textContent.trim();
    copyToClipboard(email);
  });
});

// ========================================
// DARK MODE TOGGLE (OPTIONAL ENHANCEMENT)
// ========================================
const initDarkMode = () => {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (darkModeToggle) {
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
      document.body.classList.add("light-mode");
    }

    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("darkMode", !isLight);
      showNotification(isLight ? "Light mode enabled" : "Dark mode enabled");
    });
  }
};

initDarkMode();

// ========================================
// BACK BUTTON NAVIGATION
// ========================================
window.addEventListener("popstate", () => {
  // Handle browser back button
  closeModal();
  if (mobileMenu.classList.contains("active")) {
    navToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// ========================================
// PRINT PAGE FUNCTIONALITY
// ========================================
const printPage = () => {
  window.print();
};

// Add print button handler if exists
const printBtn = document.querySelector(".print-btn");
if (printBtn) {
  printBtn.addEventListener("click", printPage);
}

// ========================================
// TOOLTIP INITIALIZATION
// ========================================
const initTooltips = () => {
  document.querySelectorAll("[data-tooltip]").forEach((element) => {
    element.addEventListener("mouseenter", (e) => {
      const tooltipText = element.getAttribute("data-tooltip");
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = tooltipText;
      tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 217, 255, 0.9);
                color: #0a0e27;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                pointer-events: none;
                z-index: 10000;
                white-space: nowrap;
            `;

      document.body.appendChild(tooltip);

      const rect = element.getBoundingClientRect();
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

      element._tooltip = tooltip;
    });

    element.addEventListener("mouseleave", () => {
      if (element._tooltip) {
        document.body.removeChild(element._tooltip);
        element._tooltip = null;
      }
    });
  });
};

initTooltips();

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ("PerformanceObserver" in window) {
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("Performance entry:", entry.name, entry.duration);
    }
  });

  perfObserver.observe({ entryTypes: ["measure", "navigation"] });
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  // In production, send to error tracking service
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  // In production, send to error tracking service
});

// ========================================
// CUSTOM EVENTS
// ========================================
const pageLoadedEvent = new CustomEvent("pageFullyLoaded", {
  detail: { timestamp: Date.now() },
});

window.addEventListener("load", () => {
  window.dispatchEvent(pageLoadedEvent);
});

// Listen for custom event
window.addEventListener("pageFullyLoaded", (e) => {
  console.log("Page fully loaded at:", new Date(e.detail.timestamp));
});

// ========================================
// INITIALIZATION
// ========================================
const init = () => {
  console.log("🚀 Website initialized successfully!");

  // Add smooth reveal animation to all sections
  document.querySelectorAll("section").forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";

    setTimeout(() => {
      section.style.transition = "all 0.6s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, index * 150);
  });
};

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// ========================================
// SERVICE WORKER REGISTRATION (OPTIONAL)
// ========================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered:', registration))
    //     .catch(error => console.log('SW registration failed:', error));
  });
}

// ========================================
// EXPORT FOR MODULE USAGE (IF NEEDED)
// ========================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    showNotification,
    copyToClipboard,
    shareContent,
    loadContent,
  };
}
