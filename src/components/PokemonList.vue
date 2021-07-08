<template>
  <div class="pokemon-list">
    <article
      v-for="pokemon in pokemons"
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
export default {
  props: ["apiUrl", "favorites", "type"],
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
      totalPokemon: []
    };
  },
  watch: {
    type(next) {
      if(next === "all") {
        this.pokemons = this.totalPokemon
      } else {
        this.totalPokemon = this.pokemons
        this.pokemons = this.favorites
      }
    },
  },
  methods: {
    isFavorite(name) {
      return this.favorites.some((item) => item === name)
        ? "#ECA539"
        : "#BFBFBF";
    },
    async fetchData() {
      try {
        const resp = await fetch(this.currentUrl);
        const data = await resp.json();
        this.nextUrl = data.next;
        const names = data.results.map((item) => item.name);
        const temp = this.pokemons.concat(names);
        this.pokemons = temp;
      } catch (error) {
        console.log("ERROR");
      }
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
      this.currentUrl = this.nextUrl;
      if (this.type === "all") {
        this.fetchData();
      }
    },
    onClick(name) {
      this.$emit("onClick", name);
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchData();
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

