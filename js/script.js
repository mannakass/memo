const memoboard = document.querySelector(".memo-gameboard");
let matrix = [];

function game() {
  generateCards();
}

async function isImageValid(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

/* creating memo gameboard*/
async function generateCards() {
  /* getting info from API */
  const response = await fetch("https://api.disneyapi.dev/character");
  const data = await response.json();

  /* filter out characters who don't have a picture */
  const validCharacters = data.data.filter((character) => character.imageUrl);

  for (let i = 0; i < 8; i++) {
    let randomNumber;
    let imageWorks = false;

    // Keep picking until we find a working image
    while (!imageWorks) {
      randomNumber = Math.floor(Math.random() * validCharacters.length);
      // This goes to function isImageValid to try and catch the error if there is one
      imageWorks = await isImageValid(validCharacters[randomNumber].imageUrl);
    }
    //const randomNumber = Math.floor(Math.random() * validCharacters.length);

    /* creating new HTML elements */
    for (let j = 0; j < 2; j++) {
      const newDiv = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("p");

      /* adding classes */
      newDiv.classList.add("character-div");
      image.classList.add("character-image");
      name.classList.add("character-name");

      /* applying API information to the elements I created*/
      image.src = validCharacters[randomNumber].imageUrl;
      name.textContent = validCharacters[randomNumber].name;

      /* putting the information into the HTML */
      newDiv.appendChild(image);
      newDiv.appendChild(name);
      memoboard.appendChild(newDiv);
    }
  }

  /* shuffle the cards */
  shuffleBoard();
}

/* shuffle the cards */
function shuffleBoard() {
  const cards = Array.from(memoboard.children);
  cards.sort(() => Math.random() - 0.5);

  /* put shuffled cards into the matrix */
  matrix = [
    cards.slice[(0, 4)],
    cards.slice[(4, 8)],
    cards.slice[(8, 12)],
    cards.slice[(12, 16)],
  ];

  cards.forEach((card) => memoboard.appendChild(card));
}

game();
