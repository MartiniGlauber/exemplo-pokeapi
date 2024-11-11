export function getPokemonId(urlPokemon) {
  return urlPokemon.split("/")[6];
}

let currentInterval;

export function clearCurrentInterval(){
  if(currentInterval){
    clearInterval(currentInterval);
    currentInterval = null;
  }
}
