const memoboard = document.querySelector(".memo-gameboard");

/* creating memo gameboard*/
function gameboard() {
  /* getting info from API */
  fetch("https://api.disneyapi.dev/character")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (let i = 0; i < 8; i++) {
        const randomNumber = Math.floor(Math.random() * response.data.length);

        /* creating new HTML elements */
        for (let j = 0; j < 2; j++) {
          const newDiv = document.createElement("div");
          const image = document.createElement("img");
          //const name = document.createElement("p");

          image.classList.add("character-image");
          newDiv.classList.add(i);
          console.log(newDiv);
          //name.classList.add("character-name");

          /* applying API information to the elements I created*/
          image.src = response.data[randomNumber].imageUrl;
          //name.textContent = response.data[randomNumber].name;

          /* putting the information into the HTML */
          newDiv.appendChild(image);
          //newDiv.appendChild(name);
          memoboard.appendChild(newDiv);
        }
      }
    });

  //have to delay it because pictures display slower
  setTimeout(shuffleBoard, 400);
}

function shuffleBoard() {
  const cards = Array.from(memoboard.children);
  cards.sort(() => Math.random() - 0.5);
  cards.forEach((card) => memoboard.appendChild(card));
}

/* calling the function */
gameboard();
