<template>
  <div class="detail">
    <div class="detail__content">
      <img
        class="detail__close"
        @click="closeDetail"
        src="~@/assets/icons/close.svg"
        alt="close"
      />
      <img
        class="detail__bg"
        alt="background"
        src="~@/assets/images/bg-card.png"
      />
      <img class="detail__image" :src="data.image" alt="" />
      <div class="detail__info">
        <li class="detail__item">
          Name: <span>{{ data.name }}</span>
        </li>
        <div class="detail__line"></div>
        <li class="detail__item">
          Weight: <span>{{ data.weight }}</span>
        </li>
        <div class="detail__line"></div>
        <li class="detail__item">
          Height: <span>{{ data.height }}</span>
        </li>
        <div class="detail__line"></div>
        <li class="detail__item">
          Types: <span>{{ data.types.join(",") }}</span>
        </li>
        <div class="detail__line"></div>
        <div class="detail_btns">
          <Button text="Share to my friends"></Button>
          <inline-svg
            width="26"
            height="26"
            :src="require(`../assets/icons/star.svg`)"
            fill="#ECA539"
          ></inline-svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },
  props: ["data"],
  data: () => {
    return {
      show: false,
    };
  },
  methods: {
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  background: rgba(0, 0, 0, 0.6);
}

.detail__content {
  background-color: white;
  width: 326px;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
  position: relative;
}

.detail__bg {
  width: 100%;
}
.detail__image {
  width: 130px;
  height: 130px;
  position: absolute;
  left: 30%;
  top: 15%;
}

.detail__info {
  padding: 25px;
}

.detail__line {
  background: #e8e8e8;
  height: 1px;
  margin: 10px 0;
}

.detail__info {
  text-align: left;
  list-style-type: none;
  color: $gray;
  font-weight: bold;
  font-size: 18px;
  span {
    font-weight: normal;
  }
}

.detail_btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail__close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>
