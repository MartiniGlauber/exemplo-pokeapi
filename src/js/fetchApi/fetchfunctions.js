import { createModal } from "../card/card.js";
import { urlPokeApi } from "../constants/constants.js";
import { showError } from "../errors/errors.js";

export async function searchPokemon(searchValue) {
  const pokemonQuery = `https://pokeapi.co/api/v2/pokemon/${searchValue}`;

  try {
    await createModal(pokemonQuery);
  } catch (error) {
    showError("Certifique-se de que digitou o nome do pokemon corretamente")
  }
}

export async function listAllPokemons(urlApi = urlPokeApi) {
  try {
    const data = await fetch(urlApi);
    const response = await data.json();

    return response;
  } catch (error) {
    showError("Ops! Erro no listAll bicho do inferno");
  }
}

export async function fetchDetails(urlApi = urlPokeApi) {
  try {
    const data = await fetch(urlApi);

    const response = await data.json();

    return response;
  } catch (error) {
    showError("Ops! Erro no fetch Details.");
  }
}

export async function fetchDescription(urlApi) {
  try {
    const data = await fetch(urlApi);
    const responseDescription = await data.json();
    return responseDescription.flavor_text_entries[0].flavor_text;
  } catch (error) {
    showError("Ops! Erro no fetch Descrition.");
  }
}
