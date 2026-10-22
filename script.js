const recommendations = [
  "Flat white + rollito de canela",
  "Cappuccino + tostada de aguacate",
  "Cold brew + bizcocho de limón",
  "Espresso doble + croissant de mantequilla"
];

const dailyPick = document.querySelector("#daily-pick");
const shuffleButton = document.querySelector("#shuffle-pick");
const themeToggle = document.querySelector("#theme-toggle");
const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const secondHand = document.querySelector("#second-hand");
const suggestionTrigger = document.querySelector("#suggestion-trigger");
const suggestionDialog = document.querySelector("#suggestion-dialog");
const suggestionClose = document.querySelector("#suggestion-close");
const suggestionForm = document.querySelector("#suggestion-form");
const suggestionText = document.querySelector("#suggestion-text");
const suggestionCount = document.querySelector("#suggestion-count");
const suggestionStatus = document.querySelector("#suggestion-status");
let currentRecommendation = 0;

shuffleButton.addEventListener("click", () => {
  currentRecommendation = (currentRecommendation + 1) % recommendations.length;
  dailyPick.textContent = recommendations[currentRecommendation];
});

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "Modo claro" : "Modo oscuro";
});

function updateSuggestionCount() {
  suggestionCount.textContent = `${suggestionText.value.length} / 500`;
}

suggestionTrigger.addEventListener("click", () => {
  suggestionDialog.showModal();
  suggestionText.focus();
});

suggestionClose.addEventListener("click", () => {
  suggestionDialog.close();
});

suggestionDialog.addEventListener("close", () => {
  suggestionForm.reset();
  suggestionForm.hidden = false;
  suggestionStatus.textContent = "";
  suggestionText.setCustomValidity("");
  updateSuggestionCount();
});

suggestionText.addEventListener("input", () => {
  suggestionText.setCustomValidity("");
  updateSuggestionCount();
});

suggestionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!suggestionText.value.trim()) {
    suggestionText.setCustomValidity("Escribe una sugerencia antes de enviarla.");
    suggestionText.reportValidity();
    return;
  }

  suggestionForm.hidden = true;
  suggestionStatus.textContent = "Gracias por compartir tu sugerencia. En esta demostración, el texto no se ha enviado ni guardado. No se han solicitado datos personales.";
  suggestionClose.focus();
});

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
}

updateClock();
window.setInterval(updateClock, 1000);