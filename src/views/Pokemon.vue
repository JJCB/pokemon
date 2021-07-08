<template>
  <div class="pokemon-container">
    <div class="pokemon__box">
      <PokemonSearch @onClick="getDetailPokemon" />
      <PokemonList
        :apiUrl="apiUrl"
        @onClick="getDetailPokemon"
        :favorites="favoritesList"
        :type="type"
      />
      <PokemonDetail
        v-if="showModal"
        :data="{
          ...pokemonSelected,
          isFavorite: favoritesList.some((item) => item === pokemonSelected.name),
        }"
        @closeDetail="closeDetail"
        @clickFavorite="clickFavorite"
      />
      <div class="pokemon__loading" v-if="loading">
        <img
          class="detail__bg"
          alt="background"
          src="~@/assets/images/pokeball.png"
        />
      </div>
      <div class="pokemon-footer">
        <div class="pokemon-footer__box">
          <Button
            :type="type === 'all' ? 'primary' : 'secondary'"
            @onClick="type = 'all'"
            iconLeft="vector"
            text="All"
          ></Button>
          <Button
            @onClick="type = 'favorite'"
            :type="type === 'favorite' ? 'primary' : 'secondary'"
            iconLeft="star"
            text="Favorites"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PokemonList from "@/components/PokemonList.vue";
import PokemonDetail from "@/components/PokemonDetail.vue";
import PokemonSearch from "@/components/PokemonSearch.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    PokemonSearch,
    PokemonList,
    PokemonDetail,
    Button,
  },
  data: () => {
    return {
      apiUrl: process.env.VUE_APP_API_ROOT + "v2/pokemon/",
      showDetail: false,
      name: "",
      type: "all",
    };
  },
  computed: {
    ...mapState("pokemon", [
      "loading",
      "showModal",
      "pokemonSelected",
      "favoritesList",
    ]),
  },
  methods: {
    ...mapMutations("pokemon", ["SHOW_MODAL", "SET_POKEMON_SELECTED"]),

    getDetailPokemon(name) {
      this.fetchDetail(name);
    },

    clickFavorite(isFavorite, name) {
      this.$store.dispatch("pokemon/setFavorite", { isFavorite, name });
    },

    async fetchDetail(name) {
      this.$store.dispatch("pokemon/fetchDetailByName", name);
    },
    closeDetail() {
      this.SET_POKEMON_SELECTED({});
      this.SHOW_MODAL(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-container {
  padding: 35px 30px 0 30px;
  background: #e5e5e5;
  min-height: 100vh;
}
.pokemon__box {
  max-width: 550px;
  margin: 0 auto;
}

.pokemon-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
  padding: 15px 5%;
  background: white;
}

.pokemon-footer__box {
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  margin: 0 auto;
  gap: 15px;
  .button {
    width: 50%;
    max-width: 150px;
  }
}

@keyframes loading {
  50% {
    transform: scale(0.7);
  }
}
.pokemon__loading {
  position: fixed;
  left: 0;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000096;
  z-index: 2;

  img {
    animation: loading 2s infinite;
  }
}
</style>
