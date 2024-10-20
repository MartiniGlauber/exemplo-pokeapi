import { createCard, createModal } from "./card/card.js";
import { urlPokeApi, urlPokeApiImg } from "./constants/constants.js";
import { listAllPokemons, fetchDetails } from "./fetchApi/fetchfunctions.js";

console.log("carregou!");

const { count, results, next, previous } = await listAllPokemons();

console.log("Pokemons: ", results);

results.forEach((pokemon, index) => {
  createCard(pokemon, index + 1);
});

createModalal(urlPokeApi, urlPokeApiImg, index);
