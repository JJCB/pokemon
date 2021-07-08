export default {
  pokemonList: [],
  pokemonDetailList: {},
  favoritesList: [],
  apiUrl: `${process.env.VUE_APP_API_ROOT}v2/pokemon/`,
  nextUrl: '',
  loading: false,
  showModal: false,
  pokemonSelected: {},
};
