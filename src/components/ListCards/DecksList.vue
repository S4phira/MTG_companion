<template>
  <div class="list" v-lazy-container="{ selector: 'img', error: urlLazyLoad, loading: urlLazyLoad}">
    <div class="card-box" v-for="(container, index) of containers" :key="container.name">
      <p>{{container.name}} cards: {{container.cards.length}}</p>
      <img @click="getCardId(index)" :data-src="container.img" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";
export default {
  data() {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
      loading: true,
    };
  },
  props: {
    showContainer: Boolean,
    containers: Array,
  },
  methods: {
    getCardId(index) {
      this.sumCards = this.containers[index].cards.length;
      this.containers[index].cards.forEach((card) => this.getCardData(card.id));
      this.$emit("load", this.loading);
    },
    async getCardData(id) {
      this.cards = [];
      const response = await axios.get(urlMultiverse + id);
      this.cards.push({
        id: id,
        name: response.data.name,
        img_small: response.data.image_uris.border_crop,
        img_large: response.data.image_uris.large,
        prize: response.data.prices.usd,
        color: response.data.colors[0],
      });
      this.$emit("sendCardsArray", this.cards);
      // const element = document.getElementById("scroll-target");
      // element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  .card-box {
    img {
      width: 230px;
      height: 310px;
      padding: 15px;
    }
  }
  .card-box img:hover {
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>