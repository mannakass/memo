const memoryboard = document.querySelector(".memo-gameboard");
let cardOneID;
let cardTwoID;
let cardOneName;
let cardTwoName;
let clickCount = 0;
let musicStarted = false;

const soundtracks = {
  1: "../music/pocahontas.mp3",
  2: "../music/tangled.mp3",
  3: "../music/lionking.mp3",
  4: "../music/snowwhite.mp3",
  5: "../music/tarzan.mp3",
};

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

let currentLevel = localStorage.getItem("level") || 1;
let audio = new Audio(soundtracks[currentLevel]);
audio.loop = true;

/* get the level to show corresponding background image */
function showLevel() {
  currentLevel = localStorage.getItem("level") || 1;

  document.body.style.backgroundImage = `url('${backgrounds[currentLevel]}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

/* Focus on title and announce */
setTimeout(function () {
  const title = document.getElementById("game-title");
  title.setAttribute(
    "aria-label",
    "Disney Memo. World " + currentLevel + ". Press M to toggle music."
  );
  title.focus();
}, 500);

/* it runs when user clicks on a card */
function toggleDat(givenID) {
  /* gets the name and the ID of the character */
  let elementID = document.getElementById(givenID);
  let elementText = elementID.textContent;

  // Don't allow clicking opened cards
  if (elementID.classList.contains("opened")) {
    return;
  }

  /* play music once user click on a card */
  if (!musicStarted) {
    audio.play();
    musicStarted = true;
  }

  const img = elementID.querySelector(".character-image");
  elementID.setAttribute("aria-label", elementID.dataset.characterName);
  img.alt = elementID.dataset.characterName;

  /* changes the class to reveal the character */
  elementID.classList.remove("closed");
  elementID.classList.add("opened");

  checkHowManyClicked(elementText, givenID);
}

function checkHowManyClicked(elementText, visibleID) {
  clickCount++;

  /* if clicked once, add the character data into variables */
  if (clickCount === 1) {
    cardOneName = elementText;
    cardOneID = visibleID;
    /* if clicked twice add the character data into another variables  */
  } else if (clickCount === 2) {
    cardTwoName = elementText;
    cardTwoID = visibleID;

    /* compare the two characters */
    if (cardOneName === cardTwoName) {
      console.log("õige");
      document.getElementById("announcer").textContent =
        "Match found! " + cardOneName;

      // Check if all cards are now opened
      const allCards = document.querySelectorAll(".character-div");
      const allOpened = [...allCards].every((card) =>
        card.classList.contains("opened")
      );

      /* if all the cards are opened, show results */
      if (allOpened) {
        setTimeout(function () {
          showResults();
        }, 1000);
      }
    } else {
      console.log("vale");
      document.getElementById("announcer").textContent = "No match. Try again.";

      /* if characters are not the same, make them hidden again */
      /*       setTimeout(function () {
        let cardOne = document.getElementById(cardOneID);
        cardOne.classList.remove("opened");
        cardOne.classList.add("closed");
        let cardTwo = document.getElementById(cardTwoID);
        cardTwo.classList.remove("opened");
        cardTwo.classList.add("closed");
      }, 700); */

      setTimeout(function () {
        let cardOne = document.getElementById(cardOneID);
        cardOne.classList.remove("opened");
        cardOne.classList.add("closed");
        cardOne.setAttribute(
          "aria-label",
          "Card " + cardOne.dataset.cardNumber
        );

        let cardTwo = document.getElementById(cardTwoID);
        cardTwo.classList.remove("opened");
        cardTwo.classList.add("closed");
        cardTwo.setAttribute(
          "aria-label",
          "Card " + cardTwo.dataset.cardNumber
        );
      }, 700);
    }

    clickCount = 0;
  }
}

function showResults() {
  document.getElementById("world").textContent = worldNames[currentLevel];
  document.getElementById("movie").textContent = movieNames[currentLevel];

  document.getElementById("game-section").style.display = "none";
  document.getElementById("results-section").style.display = "flex";

  const container = document.getElementById("results-container");
  container.setAttribute(
    "aria-label",
    "You win! You've explored " +
      worldNames[currentLevel] +
      " from " +
      movieNames[currentLevel] +
      ". Press button to explore more."
  );
  container.focus();
}

function nextLevel() {
  let level = Number(localStorage.getItem("level") || 1);

  if (level >= 5) {
    localStorage.setItem("level", 1);
  } else {
    localStorage.setItem("level", level + 1);
  }

  // Reset game
  document.querySelector(".memo-gameboard").innerHTML = "";
  document.getElementById("results-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";

  // Reset click tracking
  clickCount = 0;

  // Update level and background
  showLevel();

  // Generate new cards
  generateCards();

  // Change music
  currentLevel = localStorage.getItem("level");
  audio.src = soundtracks[currentLevel];
  audio.play();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    const focused = document.activeElement;
    if (focused.classList.contains("character-div")) {
      e.preventDefault(); // stop spacebar from scrolling
      toggleDat(focused.id);
    }
  }
});

// Mute button click
document.getElementById("mute-button").addEventListener("click", toggleMusic);

// M key to mute
document.addEventListener("keydown", function (e) {
  if (e.key === "m" || e.key === "M") {
    toggleMusic();
  }
});

function toggleMusic() {
  const button = document.getElementById("mute-button");

  if (audio.paused) {
    audio.play();
    button.textContent = "🔊";
    button.setAttribute("aria-label", "Mute music");
    document.getElementById("announcer").textContent = "Music on";
  } else {
    audio.pause();
    button.textContent = "🔇";
    button.setAttribute("aria-label", "Unmute music");
    document.getElementById("announcer").textContent = "Music off";
  }
}
