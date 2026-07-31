const revealItems = document.querySelectorAll(".reveal");
const sparkleLayer = document.querySelector(".sparkle-layer");
const giftBox = document.querySelector("#giftBox");
const noteCard = document.querySelector("#noteCard");
const openDetails = document.querySelector("#openDetails");
const backHome = document.querySelector("#backHome");
const sparkleButton = document.querySelector("#sendSparkles");
const memoryOutput = document.querySelector("#memoryOutput");
const memoryButtons = document.querySelectorAll(".memory-chip");

const memoryText = {
  morning: "If I could keep one thing forever, it would be every moment we've shared together. The hours spent with you feel like poetry written by time itself—too beautiful to rush, too precious to forget. In your laughter, I find peace; in your eyes, I find home; and in every second beside you, I find another reason to fall in love with you all over again.",
  evening: "Some of my favorite memories aren't the grand moments—they're the simple ones. Sharing lunch across the table, stealing glances, taking photos we'll smile at years from now, and laughing over things only we understand. If love could be measured, mine would be counted in those quiet moments where the world disappeared, and it was only you and me."
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

function createSparkles(amount = 18, originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  if (!sparkleLayer) return;

  for (let index = 0; index < amount; index += 1) {
    const sparkle = document.createElement("span");
    const spreadX = (Math.random() - 0.5) * 260;
    const spreadY = (Math.random() - 0.5) * 140;

    sparkle.className = "sparkle";
    sparkle.style.left = `${originX + spreadX}px`;
    sparkle.style.top = `${originY + spreadY}px`;
    sparkle.style.background = ["#ff4f88", "#ff7a5c", "#f7b84b", "#74d7bd"][index % 4];
    sparkle.style.animationDelay = `${Math.random() * 0.2}s`;

    sparkleLayer.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove());
  }
}

function smoothNavigate(url) {
  document.body.classList.add("is-leaving");
  window.setTimeout(() => {
    window.location.href = url;
  }, 360);
}

giftBox?.addEventListener("click", (event) => {
  giftBox.classList.toggle("open");
  noteCard?.classList.toggle("visible");
  createSparkles(24, event.clientX, event.clientY);
});

sparkleButton?.addEventListener("click", (event) => {
  createSparkles(36, event.clientX, event.clientY);
});

openDetails?.addEventListener("click", () => {
  smoothNavigate("details.html");
});

backHome?.addEventListener("click", () => {
  smoothNavigate("index.html");
});

memoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    memoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (memoryOutput) {
      memoryOutput.style.opacity = "0";
      window.setTimeout(() => {
        memoryOutput.textContent = memoryText[button.dataset.memory];
        memoryOutput.style.opacity = "1";
      }, 180);
    }
  });
});

window.addEventListener("load", () => {
  createSparkles(12, window.innerWidth * 0.82, window.innerHeight * 0.22);
});
