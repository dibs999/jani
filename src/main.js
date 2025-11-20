import { messages } from "./messages.js";
import { pageCopy } from "./content.js";

const state = {
  isRevealing: false,
};

const elements = {
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  quoteText: document.getElementById("quoteText"),
  quoteWrapper: document.getElementById("quoteWrapper"),
  hint: document.getElementById("hint"),
  footer: document.getElementById("footer"),
  button: document.getElementById("loveButton"),
  buttonLabel: document.querySelector(".btn-label"),
  progress: document.getElementById("progress"),
  progressInner: document.getElementById("progressInner"),
};

function setupCopy() {
  elements.title.textContent = pageCopy.title;
  elements.subtitle.textContent = pageCopy.subtitle;
  elements.quoteText.textContent = pageCopy.introMessage;
  elements.hint.textContent = pageCopy.hint;
  elements.footer.textContent = pageCopy.footer;
  elements.buttonLabel.textContent = pageCopy.buttonIdle;
}

function getRandomMessage() {
  if (messages.length === 0) return "Upsi";
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

function setProgressActive(isActive) {
  elements.progress.classList.toggle("active", isActive);
  elements.progressInner.classList.remove("active");
  void elements.progressInner.offsetWidth;
  if (isActive) {
    elements.progressInner.classList.add("active");
  }
}

function revealMessage() {
  if (state.isRevealing) return;
  state.isRevealing = true;

  const [suspenseStart, suspenseEnd] = pageCopy.suspensePhrases;
  const newMessage = getRandomMessage();

  elements.quoteText.classList.remove("show");
  elements.quoteText.classList.add("loading");
  elements.quoteWrapper.classList.add("revealing");

  setProgressActive(true);
  elements.button.classList.add("thinking");
  elements.buttonLabel.textContent = "...";

  elements.quoteText.textContent = suspenseStart;

  const suspenseDuration = 2600;

  setTimeout(() => {
    elements.quoteText.textContent = suspenseEnd;
  }, suspenseDuration * 0.55);

  setTimeout(() => {
    elements.quoteText.classList.remove("loading");
    elements.quoteText.textContent = newMessage;
    elements.quoteText.classList.remove("bounce");
    void elements.quoteText.offsetWidth;
    elements.quoteText.classList.add("show", "bounce");

    elements.quoteWrapper.classList.add("celebrate");
    setTimeout(() => elements.quoteWrapper.classList.remove("celebrate"), 900);
    setTimeout(() => elements.quoteText.classList.remove("bounce"), 950);

    elements.quoteWrapper.classList.remove("revealing");
    elements.button.classList.remove("thinking");
    elements.buttonLabel.textContent = pageCopy.buttonAfter;

    setProgressActive(false);
    state.isRevealing = false;
  }, suspenseDuration);
}

function init() {
  document.body.classList.add("js-ready");
  setupCopy();
  elements.quoteText.classList.add("show");
  elements.button.addEventListener("click", revealMessage);
}

document.addEventListener("DOMContentLoaded", init);
