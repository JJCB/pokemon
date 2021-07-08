<template>
  <div class="pokemon-container">
    <div class="pokemon__box">
      <PokemonSearch @onClick="getDetailPokemon" />
      <PokemonList
        :apiUrl="apiUrl"
        @onClick="getDetailPokemon"
        :favorites="favorites"
        :type="type"
      />
      <PokemonDetail
        v-if="showDetail"
        :data="pokemonSelected"
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
          <Button @onClick="type = 'all'" iconLeft="vector" text="All"></Button>
          <Button
            @onClick="type = 'avorite'"
            iconLeft="star"
            text="Favorites"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      pokemonSelected: {},
      favorites: [],
      type: "all",
      loading: false,
    };
  },
  methods: {
    getDetailPokemon(name) {
      this.name = name;
      this.fetchDetail();
    },
    clickFavorite(isFavorite, name) {
      this.pokemonSelected = {
        ...this.pokemonSelected,
        isFavorite: isFavorite,
      };
      if (isFavorite) {
        this.favorites.push(name);
      } else {
        const filter = this.favorites.filter((item) => item !== name);
        this.favorites = filter;
      }
    },

    async fetchDetail() {
      try {
        this.loading = true;
        const resp = await fetch(this.apiUrl + this.name);
        if (resp.status === 200) {
          const data = await resp.json();
          this.pokemonSelected = {
            weight: data.weight,
            height: data.height,
            name: data.name,
            types: data.types.map((item) => item.type.name),
            image: data.sprites.other.dream_world.front_default,
            isFavorite: this.favorites.some((item) => item === data.name),
          };
        }
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        this.showDetail = true;
        this.loading = false;
      }
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.pokemonSelected = {};
      this.showDetail = false;
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
