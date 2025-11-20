const heartField = document.getElementById("heartField");
const heartStart = document.getElementById("heartStart");
const heartScoreEl = document.getElementById("heartScore");
const heartTimerEl = document.getElementById("heartTimer");

const mixerButton = document.getElementById("mixerButton");
const mixerOutput = document.getElementById("mixerOutput");
const mixerTags = document.getElementById("mixerTags");

const rouletteButton = document.getElementById("rouletteButton");
const rouletteTrack = document.querySelector(".roulette-track");
const rouletteResult = document.getElementById("rouletteResult");

const heartGame = {
  score: 0,
  time: 10,
  active: false,
  spawnInterval: null,
  countdown: null,
};

const complimentParts = {
  start: [
    "Min kleiner Schatz",
    "Mein liebstes Baby",
    "Mein süßes Katzi",
    "Meine Kuschelheldin",
    "Mein Herzchen",
  ],
  middle: [
    "ist mein Ruheort",
    "macht meinen Tag magisch",
    "glitzert heller als alle Sterne",
    "fühlt sich wie Zuhause an",
    "macht mich so stolz",
  ],
  end: [
    "und ich drück dich gleich ganz fest.",
    "und ich schick dir 1000 Küsse.",
    "und ich will dich jetzt kuscheln.",
    "und ich lieb dich bis zum Mond.",
    "und ich mag jedes Lächeln von dir.",
  ],
  tags: ["glow", "kiss", "cozy", "soft", "sparkle"],
};

const dateIdeas = [
  "Kissenschlacht",
  "Picknick im Bett",
  "Spaziergang mit Kakao",
  "Film mit Decke",
  "Sternchen zählen",
  "Tanz im Wohnzimmer",
  "Pasta-Date mit Kerzen",
  "Liebesbrief schreiben",
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function updateHeartTimer(seconds) {
  heartTimerEl.textContent = `${seconds}s`;
}

function spawnHeart() {
  if (!heartGame.active) return;
  const heart = document.createElement("span");
  heart.className = "heart-token";
  heart.textContent = Math.random() > 0.5 ? "💗" : "💖";

  const maxLeft = heartField.clientWidth - 36;
  const maxTop = heartField.clientHeight - 36;
  heart.style.left = `${Math.max(0, Math.random() * maxLeft)}px`;
  heart.style.top = `${Math.max(0, Math.random() * maxTop)}px`;

  heart.addEventListener("click", () => {
    heart.remove();
    heartGame.score += 1;
    heartScoreEl.textContent = heartGame.score;
    heart.classList.add("popped");
  });

  heartField.appendChild(heart);

  setTimeout(() => heart.remove(), 1400);
}

function startHeartGame() {
  if (heartGame.active) return;
  heartGame.active = true;
  heartGame.score = 0;
  heartGame.time = 10;
  heartScoreEl.textContent = heartGame.score;
  updateHeartTimer(heartGame.time);
  heartField.innerHTML = "";
  heartStart.textContent = "Los geht's!";
  heartStart.classList.add("thinking");

  heartGame.spawnInterval = setInterval(spawnHeart, 280);
  heartGame.countdown = setInterval(() => {
    heartGame.time -= 1;
    updateHeartTimer(heartGame.time);
    if (heartGame.time <= 0) {
      endHeartGame();
    }
  }, 1000);
}

function endHeartGame() {
  heartGame.active = false;
  clearInterval(heartGame.spawnInterval);
  clearInterval(heartGame.countdown);
  heartField.innerHTML = "";
  heartStart.textContent = "Nochmal spielen";
  heartStart.classList.remove("thinking");
  heartTimerEl.textContent = "Fertig";
}

function renderTags(tags) {
  mixerTags.innerHTML = "";
  tags.forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = `#${tag}`;
    mixerTags.appendChild(pill);
  });
}

function mixCompliment() {
  const freshTags = complimentParts.tags
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  renderTags(freshTags);

  const sentence = `${randomItem(complimentParts.start)} ${randomItem(
    complimentParts.middle
  )} ${randomItem(complimentParts.end)}`;

  mixerOutput.textContent = sentence;
  mixerOutput.classList.remove("pop");
  void mixerOutput.offsetWidth;
  mixerOutput.classList.add("pop");
}

function spinRoulette() {
  rouletteButton.disabled = true;
  rouletteButton.classList.add("thinking");

  const spinCount = Math.floor(Math.random() * 3) + 2;
  const optionHeight = 40;
  const trackHeight = rouletteTrack.children.length * optionHeight;
  const targetIndex = Math.floor(Math.random() * rouletteTrack.children.length);

  rouletteTrack.style.transition = "none";
  rouletteTrack.style.transform = "translateY(0)";
  void rouletteTrack.offsetHeight;

  const offset = -(spinCount * trackHeight + targetIndex * optionHeight);
  rouletteTrack.style.transform = `translateY(${offset}px)`;
  rouletteTrack.style.transition = "transform 1.2s cubic-bezier(0.18, 0.7, 0.2, 1)";

  setTimeout(() => {
    rouletteButton.disabled = false;
    rouletteButton.classList.remove("thinking");
    const chosen = rouletteTrack.children[targetIndex].textContent;
    rouletteResult.textContent = `Lass uns ${chosen} machen!`;
    rouletteResult.classList.remove("pop");
    void rouletteResult.offsetWidth;
    rouletteResult.classList.add("pop");
  }, 1300);
}

function init() {
  heartStart.addEventListener("click", startHeartGame);
  mixerButton.addEventListener("click", mixCompliment);
  rouletteButton.addEventListener("click", spinRoulette);

  rouletteTrack.innerHTML = "";
  dateIdeas.forEach((idea) => {
    const option = document.createElement("div");
    option.className = "roulette-option";
    option.textContent = idea;
    rouletteTrack.appendChild(option);
  });

  renderTags(complimentParts.tags.slice(0, 3));
}

document.addEventListener("DOMContentLoaded", init);
