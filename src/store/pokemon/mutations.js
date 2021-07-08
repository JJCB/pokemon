const UPDATE_POKEMON_LIST = 'UPDATE_POKEMON_LIST'
const SET_LOADING = 'SET_LOADING'
const SHOW_MODAL = 'SHOW_MODAL'
const ADD_POKEMON_DETAIL = 'ADD_POKEMON_DETAIL'
const SET_POKEMON_SELECTED = 'SET_POKEMON_SELECTED'

export default {
  [UPDATE_POKEMON_LIST](state, pokemonList = []) {
    const names = pokemonList.results.map((item) => item.name);
    state.pokemonList = [...state.pokemonList, ...names ]
    state.nextUrl = pokemonList.next
  },

  [SET_LOADING](state, status) {
   state.loading = status
  },

  [SHOW_MODAL](state, status) {
   state.showModal = status
  },

  [ADD_POKEMON_DETAIL](state, detail) {
    state.pokemonDetailList[detail.name] = detail
  },

  [SET_POKEMON_SELECTED](state, data) {
    state.pokemonSelected = data
  }
}
