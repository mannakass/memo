const img = document.querySelector("img");
const p = document.querySelector("p");

fetch("https://api.disneyapi.dev/character")
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    const randomNumber = Math.floor(Math.random() * response.data.length);

    img.src = response.data[randomNumber].imageUrl;
    p.textContent = response.data[randomNumber].name;
  });
