<template>
  <div class="pokemon-container">
    <PokemonSearch @onClick="getDetailPokemon" />
    <PokemonList
      :imageUrl="imageUrl"
      :apiUrl="apiUrl"
      @onClick="getDetailPokemon"
    />
    <PokemonDetail
      v-if="showDetail"
      :data="pokemonSelected"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
    />
  </div>
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";
import PokemonDetail from "@/components/PokemonDetail.vue";
import PokemonSearch from "@/components/PokemonSearch.vue";

export default {
  data: () => {
    return {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: process.env.VUE_APP_API_ROOT + "v2/pokemon/",
      showDetail: false,
      name: "",
      pokemonSelected: {},
    };
  },
  components: {
    PokemonSearch,
    PokemonList,
    PokemonDetail,
  },
  methods: {
    getDetailPokemon(name) {
      this.name = name;
      this.fetchDetail();
    },

    async fetchDetail() {
      try {
        const resp = await fetch(this.apiUrl + this.name);
        const data = await resp.json();
        this.showDetail = true
        this.pokemonSelected = {
          weight: data.weight,
          height: data.height,
          name: data.name,
          types: data.types.map((item) => item.type.name),
          image: data.sprites.other.dream_world.front_default
        };
      } catch (error) {
        console.log("error", error);
      }
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pokemon-container {
  padding: 35px 30px;
  background: #e5e5e5;
}
</style>
