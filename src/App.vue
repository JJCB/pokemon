<template>
  <div id="app">
    <Welcome />
  </div>
</template>

<script>
import Welcome from "./views/Welcome.vue";
export default {
  name: "App",
  components: {
    Welcome,
  },
};
</script>

<style lang="scss" >
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900");
#app {
  font-family: $lato;
}
</style>
