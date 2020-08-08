<template>
  <div class="box">
    <div class="list" v-lazy-container="{ selector: 'img'}">
      <div class="card-box" v-for="card of cards" :key="card.name">
        <img :data-src="card.img_small" />
      </div>
      <Pagination
        :cards="cards"
        :totalPages="Math.ceil(this.sumCards / this.totalCardsPerPage)"
        @setCurrentPage="setCurrentPage($event)"
      />
    </div>
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
  data() {
    return {
      containers: [],
      cards: [],
      currentIndexPage: 1,
      totalCardsPerPage: 18,
      allCards: [],
      sumCards: 0,
    };
  },
  mounted() {
    this.getCards();
    this.getCardData();
  },

  methods: {
    async getCards() {
      try {
        const res = await axios.get("cards-id.json");
        res.data.forEach((dataElement) => {
          this.containers.push(dataElement);
          this.sumCards += dataElement.cards.length;
        });
        this.getCardData();
      } catch (error) {
        alert(error);
      }
    },
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
$background-opacity: rgba(3, 3, 3, 0.404);
.box {
  width: 90%;
  height: auto;
  background-color: $background-opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: relative;
  margin: 1% auto;
  padding: 3% 0 5%;
  min-height: 450px;
}
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