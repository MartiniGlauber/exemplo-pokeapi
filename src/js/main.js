import { createCard, createModal } from "./card/card.js";
import {
  pokemonList,
  telaCarregamento,
  urlPokeApi,
} from "./constants/constants.js";
import { showError } from "./errors/errors.js";
import {
  listAllPokemons,
  fetchDetails,
  searchPokemon,
  selectByTypes,
} from "./fetchApi/fetchfunctions.js";
import { getPokemonId } from "./utils/utils.js";

const { count, results, next, previous } = await listAllPokemons();

let nextPage = next;

const btnCarregarMais = document.querySelector("#btnCarregarMais");
const formSearch = document.getElementById("searchPokemon");
const selectTypes = document.getElementsByClassName("form-select")[0];

selectTypes.addEventListener("change", async (event) => {
  telaCarregamento.classList.toggle("isLoading");
  const selectValue = event.target.value;
  if (selectValue === "Ou escolha pelo tipo") {
    listAllPokemons(urlPokeApi);
  } else {
    const pokemonsFiltered = await selectByTypes(selectValue);
    pokemonList.innerHTML = "";
    for (const pokemon of pokemonsFiltered) {
      const pokemonId = getPokemonId(pokemon.url);
      const { types } = await fetchDetails(pokemon.url);
      await createCard(pokemon, pokemonId, types);
    }
  }
  telaCarregamento.classList.toggle("isLoading");
});

export let intervalId;
export function setIntervalId(novoIntervalId) {
  intervalId = novoIntervalId;
}
const btnFechaModal = document.querySelectorAll(".btnFechaModal");
btnFechaModal.forEach((btnFechar) => {
  btnFechar.addEventListener("click", () => {
    clearInterval(intervalId);
  });
});

// evento digitação para subir um label

searchInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;

  const helpText = document.getElementById("helpText");

  if (inputValue != "") {
    helpText.innerText = "Digite o nome do Pokemon";
  } else {
    helpText.innerText = "";
  }
});

// Evento clique no botão pesquisar do nav
formSearch.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = event.target.searchInput.value.trim().toLowerCase();

  if (inputValue !== "") {
    await searchPokemon(inputValue);
  }
});

for (const pokemon of results) {
  const pokemonId = getPokemonId(pokemon.url);
  const { types } = await fetchDetails(pokemon.url);
  await createCard(pokemon, pokemonId, types);
}

btnCarregarMais.addEventListener("click", async (event) => {
  try {
    const data = await fetch(nextPage);
    const response = await data.json();

    // Cria os cards e adiciona à página --
    for (const pokemon of response.results) {
      const pokemonId = getPokemonId(pokemon.url);
      const { types } = await fetchDetails(pokemon.url);
      createCard(pokemon, pokemonId, types);
    }

    // Atualiza o URL da próxima página
    nextPage = response.next;

    // Verifica se há mais páginas
    if (!response.next) {
      btnCarregarMais.disabled = true;
    }
  } catch (error) {
    showError("Ops! Erro inesperado");
  }
});
