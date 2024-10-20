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
export async function fetchDetails(urlApi = urlPokeApi, index) {
  try {
    const data = await fetch(urlApi, index);
    const response = await data.json();

    let img = data["sprites"]["front-default"];

    const modalBody = document
      .getElementsByClassName("modal-body")
      .setAttribute("src", img);
    console.log(response);

    return response;
  } catch (error) {
    showError("Ops! Erro inesperado.");
  }
}
