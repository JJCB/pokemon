const UPDATE_POKEMON_LIST = 'UPDATE_POKEMON_LIST'

export default {
  [UPDATE_POKEMON_LIST](state, pokemonList = []) {
    const names = pokemonList.results.map((item) => item.name);

    state.pokemonList = [...state.pokemonList, ...names ]
    state.nextUrl = pokemonList.next
  }
}
