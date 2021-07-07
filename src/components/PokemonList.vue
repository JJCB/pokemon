<template>
  <div class="pokemon-list">
    <article
      v-for="(pokemon, index) in pokemons"
      :key="'poke' + index"
      @click="onClick(pokemon.name)"
      class="pokemon-list__item"
    >
      <span>{{ pokemon.name }}</span>
      <div class="pokemon-list__star">
        <inline-svg
          width="16"
          height="16"
          :src="require(`../assets/icons/star.svg`)"
          fill="#ECA539"
        ></inline-svg>
      </div>
    </article>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiUrl"],
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
    };
  },
  methods: {
    async fetchData() {
      try {
        const resp = await fetch(this.currentUrl);
        const data = await resp.json();
        this.nextUrl = data.next;
        const temp = this.pokemons.concat(data.results);
        this.pokemons = temp;
      } catch (error) {
        console.log("error");
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
      this.fetchData();
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
  height: 150px;
  font-size: 2rem;
  color: #efefef;
}
</style>

