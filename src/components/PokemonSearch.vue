<template>
  <div class="search">
    <div class="search__icon" @click="onSubmit">
      <inline-svg
        width="16"
        height="16"
        :src="require(`../assets/icons/search.svg`)"
      ></inline-svg>
    </div>
    <form class="search__form" @submit.prevent="onSubmit">
      <input
        placeholder="Search"
        class="search__input"
        type="text"
        v-model="value"
      />
    </form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      value: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.value !== "")
        this.$emit("onClick", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
}

.search__input {
  border: none;
  outline: none;
  width: calc(100% - 50px);
  font-size: 1rem;
}
</style>
