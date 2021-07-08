<template>
  <div class="detail">
    <div class="detail__content">
      <div v-if="Object.entries(data).length">
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
            Types: <span>{{ (data.types || []).join(", ") }}</span>
          </li>
          <div class="detail__line"></div>
          <div class="detail_btns">
            <Button
              v-clipboard:copy="copy(data)"
              text="Share to my friends"
            ></Button>
            <div class="detail_star" @click="onClickFavorite()">
              <inline-svg
                width="26"
                height="26"
                :src="require(`../assets/icons/star.svg`)"
                :fill="data.isFavorite ? '#ECA539' : '#BFBFBF'"
              ></inline-svg>
            </div>
          </div>
        </div>
      </div>
      <div class="detail__failed" v-else>
        <div class="detail__failed-title">Uh-oh!</div>
        <span class="detail__failed-info">You look lost on your journey!</span>
        <Button @onClick="closeDetail" text="Go back home"></Button>
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
    copy(data) {
      return `Name: ${data.name}, Weight: ${data.weight}, Height:${data.height}`;
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
    onClickFavorite() {
      this.$emit("clickFavorite", !this.data.isFavorite, this.data.name);
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
  z-index: 2;
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
  margin-top: 20px;
}

.detail__close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.detail_star {
  cursor: pointer;
}

.detail__failed {
  padding: 20px 0;
}
.detail__failed-title {
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: $dark-gray;
  text-align: center;
}

.detail__failed-info {
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: $gray;
  margin: 15px 0 25px 0;
  display: block;
}
</style>
