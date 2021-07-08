export default {
  async fetchPokemonList({ commit }, url) {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      commit("UPDATE_POKEMON_LIST", data)
    } catch (error) {
      console.log("ERROR", error);
    }
  },

  async fetchDetailByName({ commit, state }, name) {
    try {
      // const favorites = state.favoritesList
      let current = state.pokemonDetailList[name]
      commit("SET_LOADING", true)
      if (!current) {
        const resp = await fetch(`${state.apiUrl}${name}`);
        if (resp.status === 200) {
          const results = await resp.json();
          current = {
            weight: results.weight,
            height: results.height,
            name: results.name,
            types: results.types.map((item) => item.type.name),
            image: results.sprites.other.dream_world.front_default,
          };
          commit("ADD_POKEMON_DETAIL", current)
        }
      }
      commit("SET_POKEMON_SELECTED", {
        ...current,
      })
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      commit("SET_LOADING", false)
      commit("SHOW_MODAL", true)

    }
  },

  setFavorite({ commit, state }, parmas) {
    let favorites = state.favoritesList
    if (!parmas.isFavorite) {
      favorites.push(parmas.name);
    } else {
      const filter = favorites.filter((item) => item !== parmas.name);
      favorites = filter;
    }
    commit("SET_FAVORITES", favorites)
  },
};
