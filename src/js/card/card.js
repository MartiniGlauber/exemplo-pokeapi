import { pokemonList, urlPokeApi } from "../constants/constants.js";

export function createCard(pokemon, index) {
  console.log(pokemon);

  const card = `<div class="card" style="width: 18rem;">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                        <button data-url = ${pokemon.url}  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver mais</button>
                    </div>
                </div>`;

  pokemonList.innerHTML += card;
}

export function createModal(urlApi = urlPokeApi, urlPokeApiImg, index) {
  const modalTitle = (document.querySelector(".modal-title").innerHTML =
    "Nome do Pokemon");
  const modalBody = (document.querySelector(".modal-body").innerHTML =
    urlPokeApiImg);
  const modalBody2 = (document.querySelector("modalBody2").innerHTML = urlApi);
}

//<a href="${pokemon.url}" class="btn btn-primary ">Ver mais</a>
