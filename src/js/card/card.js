import { pokemonList, urlPokeApi } from "../constants/constants.js";
import { fetchDescription, fetchDetails } from "../fetchApi/fetchfunctions.js";
import { getPokemonId } from "../utils/utils.js";

export function createCard(pokemon, index, pokemonTypes) {
  console.log(pokemon);

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  card.style.borderRadius = "6px";
  card.style.cursor = "pointer";
  card.title = `Ver detalhes do pokemon ${pokemon.name.toUpperCase()}`;

  const backgroundImgCard = document.createElement("img");
  backgroundImgCard.classList.add("background-img-card");
  // backgroundImgCard.src = "src/assets/images/pokemon9.jpg";
  backgroundImgCard.style.borderRadius = "6px";
  backgroundImgCard.style.backgroundColor = "#FFCB05";

  const titlePokemon = document.createElement("img");
  titlePokemon.classList.add("title-pokemon");
  titlePokemon.src = "src/assets/images/pokemon-title.svg";

  const imgPokemon = document.createElement("img");
  imgPokemon.classList.add("card-img-top");
  imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `${
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }`;

  const cardTypeLabel = document.createElement("h6");
  cardTypeLabel.classList.add("card-type-label");
  cardTypeLabel.textContent = "Types:";

  const cardText = document.createElement("h4");
  cardText.classList.add("card-text");
  cardText.classList.add("text-capitalize");

  let stringTypes =
    pokemonTypes[0].type.name +
    (pokemonTypes[1] ? " / " + pokemonTypes[1].type.name : "");

  cardText.textContent = stringTypes;

  // const btnVerMais = document.createElement("button");
  // btnVerMais.textContent = "Ver mais";
  // btnVerMais.classList = "btn btn-primary";
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#exampleModal");
  card.addEventListener("click", () => {
    createModal(pokemon.url);
    console.log(pokemon.url);
  });
  // card.appendChild(backgroundImgCard);
  // card.appendChild(titlePokemon);
  card.appendChild(cardTitle);
  card.appendChild(imgPokemon);
  // card.appendChild(cardBody);
  card.appendChild(cardTypeLabel);
  card.appendChild(cardText);
  // cardBody.appendChild(btnVerMais);

  pokemonList.appendChild(card);
}

export async function createModal(pokemonUrl) {
  //console.log("TESTE 2");
  const responseDetails = await fetchDetails(pokemonUrl);

  console.log("FetchDetails: ", responseDetails);
  document.querySelector(".modal-title").innerHTML =
    responseDetails.name.charAt(0).toUpperCase() +
    responseDetails.name.slice(1);
  let img = responseDetails["sprites"]["front_default"];

  let abilities = responseDetails["abilities"];
  let stringAbilities = "";
  abilities.forEach((ability) => {
    stringAbilities +=
      ability.ability.name.charAt(0).toUpperCase() +
      ability.ability.name.slice(1) +
      "\n";
    console.log("habilidade: ", ability);
  });
  let speciesUrl = responseDetails["species"].url;
  const description = await fetchDescription(speciesUrl);
  let stringDescription = description;
  console.log("Description", description);

  document.querySelector("#image-pokemon").setAttribute("src", img);
  document.querySelector(".modal-abilities").innerHTML =
    stringAbilities.replace(/\n/, "<br>");
  document.querySelector(".modal-description").textContent = stringDescription;
}
