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