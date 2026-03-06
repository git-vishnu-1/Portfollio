const toggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
} else if (prefersDark) {
  document.documentElement.setAttribute("data-theme", "dark");
}

toggle.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";

toggle.addEventListener("click", () => {
  const theme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  toggle.textContent = theme === "dark" ? "☀️" : "🌙";
});
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((section) => observer.observe(section));
window.addEventListener("scroll", () => {
  document.querySelector(".nav")
    .classList.toggle("scrolled", window.scrollY > 20);
});

// CUSTOM CURSOR
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    // Show cursor on first move
    if (!cursor.classList.contains("visible")) {
      cursor.classList.add("visible");
    }
    // Update position smoothly
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  });

  // Add hover effect for interactive elements
  const interactables = document.querySelectorAll(
    "a, button, .skills li, .project"
  );
  
  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}