// Show current level
const level = localStorage.getItem("level") || 1;

const soundtracks = {
  1: "../music/pocahontas.mp3",
  2: "../music/tangled.mp3",
  3: "../music/lionking.mp3",
  4: "../music/snowwhite.mp3",
  5: "../music/tarzan.mp3",
};

const audio = new Audio(soundtracks[level]);
audio.loop = true;

const savedTime = localStorage.getItem("audioTime");
if (savedTime) {
  audio.currentTime = Number(savedTime);
}

audio.play();

// Set background for this level
const backgrounds = {
  1: "../img/level1.jpeg",
  2: "../img/level2.jpeg",
  3: "../img/level3.jpg",
  4: "../img/level4.webp",
  5: "../img/level5.jpg",
};

const worldNames = {
  1: "The New World",
  2: "Corona",
  3: "Pride Lands",
  4: "The Enchanted Forest",
  5: "The Jungle",
};

const movieNames = {
  1: "Pocahontas",
  2: "Tangled",
  3: "The Lion King",
  4: "Snow White",
  5: "Tarzan",
};

document.getElementById("world").textContent = worldNames[level];
document.getElementById("movie").textContent = movieNames[level];

document.body.style.backgroundImage = `url('${backgrounds[level]}')`;
document.body.style.backgroundSize = "cover";

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
