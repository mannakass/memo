//const memoboard = document.querySelector(".memo-gameboard");
const memoryboard = document.querySelector(".memo-gameboard");
let cardOneID;
let cardTwoID;
let cardOneName;
let cardTwoName;
let clickCount = 0;

function toggleDat(givenID) {
  console.log(document.querySelector(".memo-gameboard"));
  console.log(document.querySelector(".memo-gameboard").children);

  let elementID = document.getElementById(givenID);
  let elementText = elementID.textContent;

  elementID.classList.remove("closed");
  elementID.classList.add("opened");

  checkHowManyClicked(elementText, givenID);
}

function checkHowManyClicked(name, specialId) {
  clickCount++;

  if (clickCount === 1) {
    cardOneName = name;
    cardOneID = specialId;
  }

  if (clickCount === 2) {
    cardTwoName = name;
    cardTwoID = specialId;

    if (cardOneName == cardTwoName) {
      console.log("Yay");
      // Check if all cards are now opened

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
