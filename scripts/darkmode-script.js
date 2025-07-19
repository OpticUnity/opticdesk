//--------------- Dark Mode toggle logic with save ---------------

const darkToggle = document.querySelector(".dark-mode-btn i");
const colorText = document.querySelectorAll(".color-text");
const clLightModeImg = document.querySelectorAll(".contact-lens-lightmode-icon");
const clDarkModeImg = document.querySelectorAll(".contact-lens-darkmode-icon");
const formulaLightModeImg = document.querySelectorAll(".light-img");
const formulaDarkModeImg = document.querySelectorAll(".dark-img");
const root = document.querySelector(":root");

// Default colors for light mode (CSS variables)
const defaultLightModeColors = [
  "#fff",       // --white
  "#000000",    // --text-color
  "#000",       // --primary-color
  "#272B2F",    // --secondary-color
  "#fff"        // --ui-bg
];

// Function to apply theme colors
function applyThemeColors(colors) {
  root.style.setProperty("--white", colors[0]);
  root.style.setProperty("--text-color", colors[1]);
  root.style.setProperty("--primary-color", colors[2]);
  root.style.setProperty("--secondary-color", colors[3]);
  root.style.setProperty("--ui-bg", colors[4]);
}

// Function to toggle dark mode classes
function toggleDarkMode(darkModeStyle) {
  const method = darkModeStyle ? "add" : "remove";
  colorText.forEach(el => el.classList[method]("darkMode"));
}

// Function to enable dark mode
function enableDarkMode(colorData) {
  darkToggle.classList.replace("fa-moon", "fa-sun");
  toggleDarkMode(true);
  applyThemeColors(colorData);
  darkToggle.parentElement.title = "Light Mode";
  clLightModeImg.forEach(img => img.classList.add('hidden'));
  clDarkModeImg.forEach(img => img.classList.remove('hidden'));
  formulaLightModeImg.forEach(img => img.classList.add('hidden'));
  formulaDarkModeImg.forEach(img => img.classList.remove('hidden'));
  localStorage.setItem("darkMode", "true"); // Save state
}

// Function to disable dark mode
function disableDarkMode() {
  darkToggle.classList.replace("fa-sun", "fa-moon");
  toggleDarkMode(false);
  applyThemeColors(defaultLightModeColors);
  darkToggle.parentElement.title = "Dark Mode";
  clLightModeImg.forEach(img => img.classList.remove('hidden'));
  clDarkModeImg.forEach(img => img.classList.add('hidden'));
  formulaLightModeImg.forEach(img => img.classList.remove('hidden'));
  formulaDarkModeImg.forEach(img => img.classList.add('hidden'));
  localStorage.setItem("darkMode", "false"); // Save state
}

// Handle dark mode toggle
darkToggle.addEventListener("click", () => {
  const isDarkMode = darkToggle.classList.contains("fa-moon");
  const colorData = darkToggle.getAttribute("data-color").split(" ");

  if (isDarkMode) {
    enableDarkMode(colorData);
  } else {
    disableDarkMode();
  }
});

// Apply saved mode on load
document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkMode");
  const colorData = darkToggle.getAttribute("data-color").split(" ");
  if (savedMode === "true") {
    enableDarkMode(colorData);
  } else {
    disableDarkMode();
  }
});
