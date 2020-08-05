<template>
  <div style="width:90%">
    <LeftMenu
      v-show="!loading && showCards"
      :selectedColor="selectedColor"
      :cards="cards"
      :search="search"
      @selectedColor="searchColor($event)"
    />
    <div class="box">
      <div class="noCards" v-if="containers.length == 0">
        <p>Nie masz żadnych dodanych kart.</p>
        <p>kliknij "Rozpocznij" aby dodać</p>
        <router-link to="/addCards">
          <button>Rozpocznij</button>
        </router-link>
      </div>
      <div class="listCards" v-if="containers.length != 0">
        <button v-show="showCards" class="btn" @click="showContainer=true, showCards = false">BACK</button>
        <p class="listCards__allCards" v-if="!showCards">All cards: {{sumAllCars}}</p>
        <p class="listCards__allCards" v-if="showCards && !search">Value: {{sumValue}} $</p>
        <DecksList
          v-show="showContainer"
          :containers="containers"
          @sendCardsArray="getCardsArray($event)"
          @load="showLoader($event)"
          @sendCardsValue="getCardsValue($event)"
        />
        <Loader v-if="loading" />
        <CardsList
          v-show="!loading && showCards"
          :filteredCards="filteredCards"
          :cards="cards"
          :search="search"
        />
        <!-- <router-link to="/addCards">
          <button class="card btn btn--back">Add card</button>
        </router-link>
        <router-link to="/scanCards">
          <button class="btn btn--back">Scan card</button>
        </router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import LeftMenu from "./ListCards/LeftMenu.vue";
import DecksList from "./ListCards/DecksList.vue";
import CardsList from "./ListCards/CardsList.vue";
import Loader from "./ListCards/Loader.vue";

export default {
  components: {
    LeftMenu,
    DecksList,
    CardsList,
    Loader,
  },
  data() {
    return {
      showContainer: true,
      showCards: false,
      loading: false,
      selectedColor: "",
      search: false,
      cards: [],
      filteredCards: [],
      containers: [],
      sumCards: 0,
      sumAllCars: 0,
      sumValue: 0,
    };
  },
  mounted() {
    this.getCardsContainer();
  },
  methods: {
    showLoader(show) {
      this.loading = show;
    },
    async getCardsContainer() {
      try {
        const res = await axios.get("cards-id.json");
        res.data.forEach((dataElement) => {
          this.containers.push(dataElement);
          this.sumAllCars += dataElement.cards.length;
        });
      } catch (error) {
        alert(error);
      }
    },
    filterColor(color) {
      this.filteredCards = [];
      this.cards.forEach((el) => {
        if (el.color == color) {
          this.filteredCards.push(el);
        }
      });
    },
    getCardsArray(cardsArray) {
      this.cards = cardsArray;
      this.showContainer = false;
      this.loading = false;
      this.showCards = true;
    },
    getCardsValue(cardsValue) {
      this.sumValue = cardsValue;
    },
    searchColor(color) {
      if (
        this.selectedColor === color ||
        this.selectedColor == "" ||
        (this.selectedColor != color && !this.search)
      ) {
        this.search = !this.search;
      }

      this.selectedColor = color;
      this.filterColor(color);
    },
  },
};
</script>
<style lang="scss" scoped>
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
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
  .noCards {
    p {
      color: $color-text;
      margin: 0;
      font-size: 30px;
      text-align: center;
      line-height: 2;
    }
    button {
      border: none;
      border-radius: 10px;
      font-size: 25px;
      position: relative;
      overflow: hidden;
      background-color: $button-color;
      width: 200px;
      height: 50px;
      margin: 10px;
      outline: none;
      color: $color-text;
      align-items: center;
      position: absolute;
      top: 150px;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
    .btn:hover {
      box-shadow: 1px 1px 30px 0px #fe8400;
    }
  }
  .listCards {
    display: flex;
    color: $color-text;
    flex-direction: column;
    align-items: center;

    &__header {
      font-size: 30px;
    }
    &__allCards {
      font-size: 24px;
      align-self: flex-end;
      padding-right: 30px;
      text-transform: uppercase;
    }
  }
}
</style>