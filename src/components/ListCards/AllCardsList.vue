<template>
  <div class="list" v-lazy-container="{ selector: 'img'}">
    <div class="card-box" v-for="card of cards" :key="card.name">
      <img :data-src="card.img_small" />
    </div>
    <Pagination
      :cards="cards"
      :totalPages="Math.ceil(this.sumAllCards / this.totalCardsPerPage)"
      @setCurrentPage="setCurrentPage($event)"
    />
  </div>
</template>
<script>
import axios from "axios";
const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";

import Pagination from "./Pagination.vue";
export default {
  components: {
    Pagination,
  },
  props: {
    containers: Array,
    sumAllCards: Number,
  },
  data() {
    return {
      cards: [],
      currentIndexPage: 1,
      totalCardsPerPage: 18,
      allCards: [],
    };
  },
  mounted() {
    this.getCardData();
  },
  methods: {
    getCardData() {
      this.containers.forEach((el) => {
        el.cards.forEach((card) => this.allCards.push(card.id));
      });
      this.getCardsArrays();
    },
    getCardsArrays() {
      for (
        let i = this.totalCardsPerPage * (this.currentIndexPage - 1);
        i <= this.totalCardsPerPage * this.currentIndexPage - 1;
        i++
      ) {
        this.displayCards(this.allCards[i]);
      }
    },
    addColors(colors) {
      let collorsArray = [];
      colors.forEach((el) => collorsArray.push(el));
      return collorsArray;
    },
    setCurrentPage(index) {
      this.getCardsArrays();
      this.currentIndexPage = index;
    },
    async displayCards(id) {
      this.cards = [];
      const response = await axios.get(urlMultiverse + id);
      this.cards.push({
        id: id,
        name: response.data.name,
        img_small: response.data.image_uris.border_crop,
        img_large: response.data.image_uris.large,
        prize: response.data.prices.usd,
        color: this.addColors(response.data.colors),
      });
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

  .card-box {
    img {
      width: 230px;
      height: 310px;
      padding: 5px;
    }
  }
}
</style>