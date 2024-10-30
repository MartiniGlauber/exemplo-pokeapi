import { pokemonList, urlPokeApi } from "../constants/constants.js";
import { fetchDescription, fetchDetails } from "../fetchApi/fetchfunctions.js";
import { getPokemonId } from "../utils/utils.js";

export function createCard(pokemon, index, pokemonTypes) {
  console.log(pokemon);

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";

  const imgPokemon = document.createElement("img");
  imgPokemon.classList.add("card-img-top");
  imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;

  const cardText = document.createElement("h5");
  cardText.classList.add("card-text");
  cardText.classList.add("text-capitalize");

  let stringTypes = pokemonTypes[0].type.name + ((pokemonTypes[1]) ? " / " + pokemonTypes[1].type.name : "");
  
  cardText.textContent = stringTypes;
   

  const btnVerMais = document.createElement("button");
  btnVerMais.textContent = "Ver mais";
  btnVerMais.classList = "btn btn-primary";
  btnVerMais.setAttribute("data-bs-toggle", "modal");
  btnVerMais.setAttribute("data-bs-target", "#exampleModal");
  btnVerMais.addEventListener("click", () => {
    createModal(pokemon.url);
    console.log(pokemon.url);
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
  document.querySelector(".modal-title").innerHTML = responseDetails.name.charAt(0).toUpperCase() + responseDetails.name.slice(1);
  let img = responseDetails["sprites"]["front_default"];
  
  let abilities = responseDetails["abilities"];
  let stringAbilities = "";
  abilities.forEach((ability) => {
    stringAbilities += ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1) + "\n";
    console.log("habilidade: ", ability);
  });
  let speciesUrl = responseDetails["species"].url;
  const description = await fetchDescription(speciesUrl);
  let stringDescription = description;
  console.log("Description", description);

  document.querySelector("#image-pokemon").setAttribute("src", img);
  document.querySelector(".modal-abilities").innerHTML = stringAbilities.replace(/\n/, "<br>");
  document.querySelector(".modal-description").textContent = stringDescription;
}
