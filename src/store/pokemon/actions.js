export default {
  async fetchPokemonList({ commit }, url) {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      commit("UPDATE_POKEMON_LIST", data)
    } catch (error) {
      console.log("ERROR", error);
    }
  }
};
