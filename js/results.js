// Show current level
const level = localStorage.getItem("level") || 1;
document.getElementById("level").textContent = level;

// Set background for this level
const backgrounds = {
  1: "../img/level1.jpg",
  2: "../img/level2.jpeg",
  3: "../img/level3.png",
  4: "../img/level4.webp",
  5: "../img/level5.jpg",
};

document.body.style.backgroundImage = `url('${backgrounds[level]}')`;

// When "Play again" is clicked, increase level
document.querySelector(".button").addEventListener("click", function (e) {
  e.preventDefault();

  let newLevel = Number(level) + 1;

  if (newLevel > 5) {
    localStorage.setItem("level", 1);
  } else {
    localStorage.setItem("level", newLevel);
  }

  window.location.href = "index.html";
});
