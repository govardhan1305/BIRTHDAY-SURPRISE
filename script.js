
const floating = document.getElementById("floating");

const symbols = ["♥", "♡", "🌸", "✿", "❀", "💗"];

function createFloatingItem() {
  const item = document.createElement("span");
  item.className = "float-item";
  item.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = 16 + Math.random() * 25 + "px";
  item.style.color = ["#ed2875", "#ffffff", "#c52a68"][
    Math.floor(Math.random() * 3)
  ];
  item.style.animationDuration = 5 + Math.random() * 5 + "s";

  floating.appendChild(item);

  setTimeout(() => item.remove(), 11000);
}

for (let i = 0; i < 15; i++) {
  setTimeout(createFloatingItem, i * 250);
}

setInterval(createFloatingItem, 400);


// Arrow dragging animation
const arrow = document.getElementById("arrow");
const heart = document.getElementById("heart");
const explosion = document.getElementById("explosion");
const blackScreen = document.getElementById("blackScreen");
const hint = document.getElementById("hint");

let dragging = false;
let completed = false;
let startX, startY, originalX, originalY;

arrow.addEventListener("pointerdown", (event) => {
  if (completed) return;

  dragging = true;
  arrow.setPointerCapture(event.pointerId);

  const rect = arrow.getBoundingClientRect();

  startX = event.clientX;
  startY = event.clientY;
  originalX = rect.left;
  originalY = rect.top;

  arrow.style.left = originalX + "px";
  arrow.style.top = originalY + "px";
  arrow.style.right = "auto";
  arrow.style.bottom = "auto";

  event.preventDefault();
});

arrow.addEventListener("pointermove", (event) => {
  if (!dragging || completed) return;

  arrow.style.left =
    originalX + event.clientX - startX + "px";

  arrow.style.top =
    originalY + event.clientY - startY + "px";
});

arrow.addEventListener("pointerup", () => {
  if (!dragging || completed) return;

  dragging = false;

  // Let go anywhere: the arrow flies to the heart.
  completed = true;
  arrow.style.pointerEvents = "none";

  const heartRect = heart.getBoundingClientRect();
  const arrowRect = arrow.getBoundingClientRect();

  const targetX =
    heartRect.left + heartRect.width / 2 - arrowRect.width / 2;

  const targetY =
    heartRect.top + heartRect.height / 2 - arrowRect.height / 2;

  arrow.style.transition =
    "left .8s ease, top .8s ease, transform .8s, opacity .2s .8s";

  arrow.style.left = targetX + "px";
  arrow.style.top = targetY + "px";
  arrow.style.transform = "scale(.5) rotate(-20deg)";

  hint.textContent = "A little magic, just for you…";

  setTimeout(() => {
    heart.style.animation = "none";
    heart.style.transform = "scale(1.6)";
    heart.style.opacity = "0";

    const burstSymbols = [
      "♥", "♡", "🌸", "✿", "💗", "❀",
      "♥", "✧", "♡", "🌸", "✦", "♥"
    ];

    burstSymbols.forEach((symbol, index) => {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.textContent = symbol;

      const angle =
        (Math.PI * 2 * index) / burstSymbols.length;

      const distance = 100 + Math.random() * 130;

      particle.style.setProperty(
        "--x",
        Math.cos(angle) * distance + "px"
      );

      particle.style.setProperty(
        "--y",
        Math.sin(angle) * distance + "px"
      );

      explosion.appendChild(particle);
    });

    arrow.style.opacity = "0";
  }, 800);

  // Black screen, then open the main birthday website.
  setTimeout(() => {
    blackScreen.classList.add("show");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1800);
  }, 1550);
});
