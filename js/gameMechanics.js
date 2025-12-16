let cardOneID;
let cardTwoID;
let cardOneName;
let cardTwoName;
let clickCount = 0;

function toggleDat(givenID) {
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
    } else {
      console.log("vale");

      setTimeout(function () {
        let cardOne = document.getElementById(cardOneID);
        cardOne.classList.remove("opened");
        cardOne.classList.add("closed");
        let cardTwo = document.getElementById(cardTwoID);
        cardTwo.classList.remove("opened");
        cardTwo.classList.add("closed");

        clickCount = 0;
      }, 1000);
    }
    clickCount = 0;
    cardOneName = "";
    cardTwoName = "";
  }
}
