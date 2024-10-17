import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";

console.log("carregou!")

const {count, results, next, previous} = await listAllPokemons();

console.log("Pokemons: ", results);

results.forEach((pokemon, index) => {
    createCard(pokemon, index + 1);    
});

