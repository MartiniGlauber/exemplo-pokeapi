import { createCard, createModal } from "./card/card.js";
import { urlPokeApi, urlPokeApiImg } from "./constants/constants.js";
import { showError } from "./errors/errors.js";
import { listAllPokemons, fetchDetails } from "./fetchApi/fetchfunctions.js";
import { getPokemonId } from "./utils/utils.js";

console.log("carregou!");

const { count, results, next, previous } = await listAllPokemons();

let nextPage = next;

const btnCarregarMais = document.querySelector("#btnCarregarMais");

console.log("Pokemons: ", results);

for (const pokemon of results) {
  const pokemonId = getPokemonId(pokemon.url);
  const {types} = await fetchDetails(pokemon.url);
  await createCard(pokemon, pokemonId, types);
}

btnCarregarMais.addEventListener("click", async (event) => {
  try {
    const data = await fetch(nextPage);
    const response = await data.json();

    // Cria os cards e adiciona à página -- USAR FOR OF
    response.results.forEach(async (pokemon) => {
      const pokemonId = getPokemonId(pokemon.url);
      const {types} = await fetchDetails(pokemon.url);
      createCard(pokemon, pokemonId, types);
    });
    // Atualiza o URL da próxima página
    nextPage = response.next;

    // Verifica se há mais páginas
    if (!response.next) {
      btnCarregarMais.disabled = true;
    }

    console.log(response);
  } catch (error) {
    console.log("Erro: ", error);
    showError("Ops! Erro inesperado");
  }
});
