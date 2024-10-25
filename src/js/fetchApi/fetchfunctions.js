import { urlPokeApi } from "../constants/constants.js";
import { showError } from "../errors/errors.js";

export async function listAllPokemons(urlApi = urlPokeApi) {
  try {
    const data = await fetch(urlApi);
    const response = await data.json();

    return response;
  } catch (error) {
    showError("Ops! Erro inesperado");
  }
}
export async function fetchDetails(urlApi = urlPokeApi) {
  try {
    const data = await fetch(urlApi);

    const response = await data.json();

    console.log("Response details: ", response);

    return response;
  } catch (error) {
    showError("Ops! Erro inesperado.");
  }
}
