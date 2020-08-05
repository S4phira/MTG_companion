<template>
  <div
    id="scroll-target"
    class="list"
    v-lazy-container="{ selector: 'img', error:urlLazyLoad, loading: urlLazyLoad }"
  >
    <div
      class="card-box"
      v-for="(card,index) of cards"
      :key="card.name"
      @click="showInfo(card.id)"
      v-show="index>=(currentPage-1)*cardsPerPage && index<(currentPage*cardsPerPage)"
    >
      <img :data-src="card.img_small" v-if="!search" />
    </div>
    <div
      class="card-box"
      v-for="(card,index) of filteredCards"
      :key="card.id"
      @click="showInfo(card.id)"
      v-show="index>=(currentPage-1)*cardsPerPage && index<(currentPage*cardsPerPage)"
    >
      <img :data-src="card.img_small" v-if="search" />
    </div>
    <div class="noMatchCards" v-if="filteredCards.length== 0 && search">Brak dopasowanych kart</div>
    <InfoModal />
    <Pagination
      v-if="!search"
      :cards="cards"
      :totalPages="Math.ceil(this.cards.length / this.cardsPerPage)"
      @setCurrentPage="setCurrentPage($event)"
    />
    <Pagination
      v-if="search"
      :cards="cards"
      :totalPages="Math.ceil(this.filteredCards.length / this.cardsPerPage)"
      @setCurrentPage="setCurrentPage($event)"
    />
  </div>
</template>
<script>
import InfoModal from "./CardsModal.vue";
import Pagination from "./Pagination.vue";
export default {
  components: {
    InfoModal,
    Pagination,
  },
  data() {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
      currentPage: 1,
      cardsPerPage: 12,
    };
  },
  props: {
    cards: Array,
    filteredCards: Array,
    search: Boolean,
  },
  methods: {
    showInfo(id) {
      this.$modal.show("info-card", { id: id });
    },
    setCurrentPage(index) {
      this.currentPage = index;
    },
  },
};
</script>
<style lang="scss">
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
  .noMatchCards {
    font-size: 50px;
    padding: 10% 0;
  }
  button.page-link {
    display: inline-block;
  }
  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }
}
</style>