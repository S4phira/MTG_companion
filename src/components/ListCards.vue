<template>
  <div style="width:90%">
    <infoModal />
    <leftMenu
      :selectedColor="selectedColor"
      :cards="cards"
      v-on:selectedColor="searchColor($event)"
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
        <p v-show="!showCards" class="listCards__header">YOUR DECK {{selectedColor}}</p>
        <p v-if="!showCards">All cards: {{sumAllCars}}</p>

        <DecksList :containers="containers" :showContainer="showContainer" />
        <div class="listCards__loader">
          <div v-if="loading" class="loader"></div>
        </div>
        <div
          id="scroll-target"
          class="listCards__list"
          v-lazy-container="{ selector: 'img', error:'https://cutt.ly/Ks5PTdD', loading: 'https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic' }"
        >
          <div
            v-show="!loading && showCards"
            class="card-box"
            v-for="card of cards"
            :key="card.name"
            @click="showInfo(card.id)"
          >
            <img :data-src="card.img_small" v-if="search" v-show="card.color == selectedColor" />
            <img :data-src="card.img_small" v-else />
          </div>
        </div>
        <router-link to="/addCards">
          <button class="card btn btn--back">Add card</button>
        </router-link>
        <router-link to="/scanCards">
          <button class="btn btn--back">Scan card</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import infoModal from "./InfoCardsModal.vue";
import LeftMenu from "./ListCards/LeftMenu.vue";
import DecksList from "./ListCards/DecksList.vue";

const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";
export default {
  components: {
    infoModal,
    LeftMenu,
    DecksList,
  },
  data() {
    return {
      showContainer: true,
      showCards: false,
      loading: false,
      selectedColor: "",
      selectedCards: [],
      search: false,
      cards: [],
      containers: [],
      sumCards: 0,
      sumAllCars: 0,
    };
  },
  mounted() {
    this.getCardsContainer();
  },
  methods: {
    showInfo(id) {
      this.$modal.show("info-card", { id: id });
    },
    async getCardsContainer() {
      try {
        const res = await axios.get("cards-id.json");
        res.data.forEach((dataElement) => {
          this.containers.push(dataElement);
        });
      } catch (error) {
        alert(error);
      }
    },
    getCardId(index) {
      this.sumCards = this.containers[index].cards.length;
      this.containers[index].cards.forEach((card) => this.getCardData(card.id));
    },
    async getCardData(id) {
      this.loading = true;
      this.showCards = true;
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
      this.loading = false;
      this.showContainer = false;

      const element = document.getElementById("scroll-target");
      element.scrollIntoView({ behavior: "smooth" });
    },

    totalCards() {
      for (let property in this.containers) {
        property.forEach((el) => console.log(el));
      }
      //let sum = 0;
      console.log(this.containers);
      this.containers.forEach((el) => console.log(el));
      //  return Math.round(sum);
    },
    searchColor(color) {
      if (
        this.selectedColor === color ||
        this.selectedColor == "" ||
        (this.selectedColor != color && !this.search)
      ) {
        this.search = !this.search;
      }
      this.selectedCards = this.cards.filter((card) => card.color === color);

      this.selectedColor = color;
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
  margin: 3% auto;
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
    min-height: 900px;

    &__header {
      font-size: 30px;
    }
    &__list {
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
    &__loader {
      .loader,
      .loader:before,
      .loader:after {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        -webkit-animation: load7 1.8s infinite ease-in-out;
        animation: load7 1.8s infinite ease-in-out;
      }
      .loader {
        color: #ffffff;
        font-size: 10px;
        margin: 0 auto 80px;
        position: relative;
        text-indent: -9999em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      .loader:before,
      .loader:after {
        content: "";
        position: absolute;
        top: 0;
      }
      .loader:before {
        left: -3.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .loader:after {
        left: 3.5em;
      }
      @-webkit-keyframes load7 {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
          box-shadow: 0 2.5em 0 0;
        }
      }
      @keyframes load7 {
        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
          box-shadow: 0 2.5em 0 0;
        }
      }
    }
  }
}
</style>