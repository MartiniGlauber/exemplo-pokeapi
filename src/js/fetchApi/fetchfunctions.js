import { urlPokeApi } from "../constants/constants.js";
import { showError } from "../errors/errors.js";

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
  try{
    const data = await fetch(urlApi);
    const responseDescription = await data.json();
    return responseDescription.flavor_text_entries[0].flavor_text;
    
    // const flavorText = responseDescription.flavor_text_entries.find(entry => entry.language.name === `en`); 
    // const description = flavorText ? flavorText.flavor_text_entries : "No description avaianble";
    // return description;
    
  }  catch (error) {
    showError("Ops! Erro no fetch Descrition.");
  }
}