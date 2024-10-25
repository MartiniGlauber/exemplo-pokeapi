import { pokemonList, urlPokeApi } from "../constants/constants.js";
import { fetchDetails } from "../fetchApi/fetchfunctions.js";

export function createCard(pokemon, index) {
  console.log(pokemon);

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const imgPokemon = document.createElement("img");
  imgPokemon.classList.add("card-img-top");
  imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${pokemon.name}`; //está certo???

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent =
    "Some quick example text to build on the card title and make up the bulk of the"; // tem que puxar descrição de forma dinamica

  const btnVerMais = document.createElement("button");
  btnVerMais.textContent = "Ver mais";
  btnVerMais.classList = "btn btn-primary";
  btnVerMais.setAttribute("data-bs-toggle", "modal");
  btnVerMais.setAttribute("data-bs-target", "#exampleModal");
  btnVerMais.addEventListener("click", () => {
    createModal(pokemon.url);
  });

  card.appendChild(imgPokemon);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(btnVerMais);

  pokemonList.appendChild(card);
}

export async function createModal(pokemonUrl) {
  const responseDetails = await fetchDetails(pokemonUrl);
  console.log("FetchDetails: ", responseDetails);
  document.querySelector(".modal-title").innerHTML = responseDetails.name;
  let img = responseDetails["sprites"]["front_default"];
  
  let abilities = responseDetails["abilities"];
  let stringAbilities = "";
  abilities.forEach((ability) => {
    stringAbilities += ability.ability.name + "    ";
    console.log("habilidade: ", ability);
  });
  console.log("habilidades: ", abilities);

  document.querySelector("#image-pokemon").setAttribute("src", img);
  document.querySelector(".modal-abilities").textContent = stringAbilities;
}
