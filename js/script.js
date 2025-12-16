const memoboard = document.querySelector(".memo-gameboard");

/* creating memo gameboard*/
function gameboard() {
  /* getting info from API */
  fetch("https://api.disneyapi.dev/character")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      /* filter out characters who don't have a picture */
      const validCharacters = response.data.filter(
        (character) => character.imageUrl
      );

      for (let i = 0; i < 8; i++) {
        const randomNumber = Math.floor(Math.random() * validCharacters.length);

        /* creating new HTML elements */
        for (let j = 0; j < 2; j++) {
          const newDiv = document.createElement("div");
          const image = document.createElement("img");
          const name = document.createElement("p");

          /* adding classes */
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
    });

  //have to delay it because pictures display slower
  setTimeout(shuffleBoard, 600);
}

function shuffleBoard() {
  const cards = Array.from(memoboard.children);
  cards.sort(() => Math.random() - 0.5);
  cards.forEach((card) => memoboard.appendChild(card));
}

/* calling the function */
gameboard();
