<template>
  <div class="welcome">
    <img
      class="welcome__image"
      alt="pikachu"
      src="~@/assets/images/pikachu.png"
    />
    <h1 class="welcome__title">Welcome to Pokédex</h1>
    <h2 class="welcome__subtitle">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </h2>
    <div class="welcome__btn">
      <Button></Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },
  props: {},
};
</script>

<style lang="scss" scoped>
.welcome {
  padding-top: 20px;
  max-width: 540px;
  margin: 0 auto;
}

.welcome__title {
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  color: $dark-gray;
  line-height: 31px;
  margin-top: 60px;
  margin-bottom: 30px;
  text-align: center;
}

.welcome__subtitle {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 31px;
  color: $gray;
  text-align: center;
  margin: 0;
}

.welcome__image {
  display: block;
  margin: 0 auto;
}

.welcome__btn {
  text-align: center;
  margin-top: 60px;
}
</style>
