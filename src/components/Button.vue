<template>
  <div
    class="button"
    :class="{ [type]: type }"
    @click="handleClick"
  >
    <div v-if="iconLeft" class="button__icon">
      <inline-svg
        width="22"
        height="22"
        :src="require(`../assets/icons/${iconLeft}.svg`)"
        fill="inherit"
      ></inline-svg>
    </div>
    <div class="button__text">{{ text }}</div>
  </div>
</template>
<script>
export default {
  props: {
    onClick: {
      type: Function,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
    },
    iconLeft: {
      type: String,
    },
    text: {
      type: String,
      default: "Get started",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick: function () {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 60px;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  font-weight: 900;
  font-size: 14px;
  height: 44px;
}

.button__icon {
  fill: white;
}

.primary {
  background-color: $red;
}

.secondary {
  background-color: $light-gray;
}
</style>