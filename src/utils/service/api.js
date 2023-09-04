import axios from "axios";

async function getAllPokemon({ limit = 20, offset = 0 }) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
}

async function getDetailPokemon(pokemon) {
  const response = await axios.get(pokemon);

  return response.data;
}

export { getAllPokemon, getDetailPokemon };
