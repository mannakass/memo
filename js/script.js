const body = document.querySelector("body");

/* creating memo gameboard*/
function gameboard() {
  for (let i = 0; i < 16; i++) {
    /* getting info from API */
    fetch("https://api.disneyapi.dev/character")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        /* creating new HTML elements */
        const newDiv = document.createElement("div");
        const image = document.createElement("img");
        const name = document.createElement("p");

        /* applying API information to the elements I created*/
        const randomNumber = Math.floor(Math.random() * response.data.length);
        image.src = response.data[randomNumber].imageUrl;
        name.textContent = response.data[randomNumber].name;

        /* putting the information into the HTML */
        newDiv.appendChild(image);
        newDiv.appendChild(name);
        body.appendChild(newDiv);
      });
  }
}

/* calling the function */
gameboard();
