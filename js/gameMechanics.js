const memoryboard = document.querySelector(".memo-gameboard");
let cardOneID;
let cardTwoID;
let cardOneName;
let cardTwoName;
let level = 1;
let clickCount = 0;
let musicStarted = false;
const audio = new Audio("../music/pocahontas-soundtrack.mp3");

function showLevel() {
  const level = localStorage.getItem("level") || 1;

  const backgrounds = {
    1: "../img/level1.jpeg",
    2: "../img/level2.jpeg",
    3: "../img/level3.jpg",
    4: "../img/level4.webp",
    5: "../img/level5.jpg",
  };

  document.body.style.backgroundImage = `url('${backgrounds[level]}')`;
}

/* it runs when user clicks on a card */
function toggleDat(givenID) {
  if (!musicStarted) {
    audio.play();
    musicStarted = true;
  }

  /* gets the name and the ID of the character */
  let elementID = document.getElementById(givenID);
  let elementText = elementID.textContent;

  /* changes the class to reveal the character */
  elementID.classList.remove("closed");
  elementID.classList.add("opened");

  checkHowManyClicked(elementText, givenID);
}

function checkHowManyClicked(name, specialId) {
  clickCount++;

  /* if only only one card has been selected, just save the information of the character */
  if (clickCount === 1) {
    cardOneName = name;
    cardOneID = specialId;
  }

  /* if two cards have been selected, save the information of the second character */
  if (clickCount === 2) {
    cardTwoName = name;
    cardTwoID = specialId;

    /* compare the two characters */
    if (cardOneName == cardTwoName) {
      console.log("Yay");

      // Check if all cards are now opened
      const allCards = document.querySelectorAll(".character-div");
      const allOpened = [...allCards].every((card) =>
        card.classList.contains("opened")
      );

      if (allOpened) {
        setTimeout(function () {
          window.location.href = "results.html";
        }, 1000);
      }
      /* if characters weren't the same, close the cards */
    } else {
      console.log("vale");

      setTimeout(function () {
        let cardOne = document.getElementById(cardOneID);
        cardOne.classList.remove("opened");
        cardOne.classList.add("closed");
        let cardTwo = document.getElementById(cardTwoID);
        cardTwo.classList.remove("opened");
        cardTwo.classList.add("closed");

        cardOneID = 0;
        cardTwoID = 0;

        clickCount = 0;
      }, 800);
    }
    clickCount = 0;
    cardOneName = "";
    cardTwoName = "";
  }
}
