const memoboard = document.querySelector(".memo-gameboard");

/* creating memo gameboard*/
function gameboard() {
  for (let i = 0; i < 8; i++) {
    /* getting info from API */
    fetch("https://api.disneyapi.dev/character")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const randomNumber = Math.floor(Math.random() * response.data.length);

        /* creating new HTML elements */
        for (let j = 0; j < 2; j++) {
          const newDiv = document.createElement("div");
          const image = document.createElement("img");
          const name = document.createElement("p");

          /* applying API information to the elements I created*/
          image.src = response.data[randomNumber].imageUrl;
          name.textContent = response.data[randomNumber].name;

          /* putting the information into the HTML */
          newDiv.appendChild(image);
          newDiv.appendChild(name);
          memoboard.appendChild(newDiv);
        }
      });
  }
}

/* calling the function */
gameboard();
