export function getRandomPokemonImageUrl() {
  const id = Math.floor(Math.random() * 150) + 1;

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
