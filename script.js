// 2CALC-IT E-Portfolio – Stephen John Cortez
// Menu, dark mode and image viewer behavior shared by all pages.

const side = document.getElementById("side");
const scrim = document.getElementById("scrim");
const lightbox = document.getElementById("lb");
const lightboxImg = lightbox.querySelector("img");

/* ---------- Side menu ---------- */

function closeMenu() {
  side.classList.remove("open");
  scrim.classList.remove("open");
}

// Highlight the side-menu link that matches the current page and section.
function markActiveLink() {
  const file = location.pathname.split("/").pop() || "index.html";
  const target = file + location.hash;
  const links = [...document.querySelectorAll(".side a")];
  const active =
    links.find((a) => a.getAttribute("href") === target) ||
    links.find((a) => a.getAttribute("href").startsWith(file + "#"));
  links.forEach((a) => a.classList.toggle("on", a === active));
}

markActiveLink();
window.addEventListener("hashchange", markActiveLink);
document.querySelectorAll(".side a").forEach((a) => a.addEventListener("click", closeMenu));
scrim.addEventListener("click", closeMenu);

// Menu button: opens a drawer on phones, shows or hides the side menu on desktop.
document.getElementById("mb").addEventListener("click", () => {
  if (matchMedia("(max-width: 900px)").matches) {
    side.classList.add("open");
    scrim.classList.add("open");
  } else {
    document.body.classList.toggle("nosb");
  }
});

/* ---------- Back to top ---------- */

document.querySelectorAll("[data-top]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  });
});

/* ---------- Dark mode (remembered between pages) ---------- */

document.getElementById("th").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  const isDark = current
    ? current === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = isDark ? "light" : "dark";

  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

/* ---------- Image viewer ---------- */

document.querySelectorAll(".art img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
