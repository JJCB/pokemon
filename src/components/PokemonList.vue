<template>
  <div class="pokemon-list">
    <article
      v-for="pokemon in items"
      :key="pokemon"
      @click="onClick(pokemon)"
      class="pokemon-list__item"
    >
      <span>{{ pokemon }}</span>
      <div class="pokemon-list__star">
        <inline-svg
          width="16"
          height="16"
          :src="require(`../assets/icons/star.svg`)"
          :fill="isFavorite(pokemon)"
        ></inline-svg>
      </div>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["favorites", "type"],
  data: () => {
    return {};
  },
  computed: {
    ...mapState("pokemon", ["pokemonList", "apiUrl", "nextUrl"]),
    items() {
      if (this.type === "all") {
        console.log("pokemonList", this.pokemonList)
        return this.pokemonList;
      } else {
        return this.favorites;
      }
    },
  },
  methods: {
    isFavorite(name) {
      return this.favorites.some((item) => item === name)
        ? "#ECA539"
        : "#BFBFBF";
    },

    async fetchData(url) {
      this.$store.dispatch("pokemon/fetchPokemonList", url);
    },

    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });

      observer.observe(this.$refs.infinitescrolltrigger);
    },

    next() {
      if (this.type === "all") {
        this.fetchData(this.nextUrl);
      }
    },
    onClick(name) {
      this.$emit("onClick", name);
    },
  },
  created() {
    this.fetchData(this.apiUrl);
  },
  mounted() {
    this.scrollTrigger();
  },
};
</script>

<style lang="scss" scoped>
.pokemon-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 20px;
  cursor: pointer;
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
}

#scroll-trigger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  font-size: 2rem;
  color: #efefef;
}
</style>

