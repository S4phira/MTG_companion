<template>
  <div class="list" v-lazy-container="{ selector: 'img', error:urlLazyLoad }">
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
        "https://cdn.discordapp.com/attachments/719513391219343370/740696234796515348/back_1_1.jpg",
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

  img[lazy="loading"] {
    opacity: 0.3;
  }
  img[lazy="loaded"] {
    opacity: 0.4;
    animation-name: fadein;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-timing-function: ease-out;
    @keyframes fadein {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
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