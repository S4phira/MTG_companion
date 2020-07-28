<template>
  <div style="width:90%">
    <div class="leftMenu">
      <div
        class="color color--red"
        @click="searchColor('R')"
        :class="{ colorSelect: selectedColor=='R' && search}"
      >
        <img src="../assets/logo/R.svg" />
      </div>
      <div
        class="color color--white"
        @click="searchColor('W')"
        :class="{ colorSelect: selectedColor=='W' && search}"
      >
        <img src="../assets/logo/W.svg" />
      </div>
      <div
        class="color color--blue"
        @click="searchColor('U')"
        :class="{ colorSelect: selectedColor=='U'&& search}"
      >
        <img src="../assets/logo/U.svg" />
      </div>
      <div
        class="color color--black"
        @click="searchColor('B')"
        :class="{ colorSelect: selectedColor=='B' && search}"
      >
        <img src="../assets/logo/B.svg" />
      </div>
      <div
        class="color color--green"
        @click="searchColor('G')"
        :class="{ colorSelect:selectedColor=='G' && search}"
      >
        <img src="../assets/logo/G.svg" />
      </div>
    </div>
    <div class="box">
      <div class="noCards" v-if="cards.length == 0">
        <p>Nie masz żadnych dodanych kart.</p>
        <p>kliknij "Rozpocznij" aby dodać</p>
        <router-link to="/addCards">
          <button>Rozpocznij</button>
        </router-link>
      </div>
      <div class="listCards" v-if="cards.length != 0">
        <p class="listCards__header">YOUR DECK</p>
        <p v-if="!search">cards:{{cards.length}} prize:{{totalItems(cards)}} $</p>
        <p v-else>cards:{{selectedCards.length}} prize:{{totalItems(selectedCards)}} $</p>
        <div class="listCards__loader">
          <div v-if="loading" class="loader"></div>
        </div>
        <div class="listCards__list" v-show="!loading">
          <div class="card-box" v-for="cards of cards" :key="cards.name">
            <img :src="cards.img" v-if="search" v-show="cards.color == selectedColor" />
            <img :src="cards.img" v-else />
          </div>
        </div>
        <router-link to="/addCards">
          <button class="btn btn--back">Add card</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";
export default {
  data() {
    return {
      loading: false,
      selectedColor: "",
      selectedCards: [],
      search: false,
      cards: [],
    };
  },
  mounted() {
    this.getCardsId();
  },
  methods: {
    async getCardsId() {
      this.loading = true;
      try {
        const res = await axios.get("cards-id.json");
        res.data.forEach((card) => {
          this.getCardData(card.id);
        });
      } catch (error) {
        alert(error);
      }
    },
    async getCardData(id) {
      const response = await axios.get(urlMultiverse + id);
      this.cards.push({
        name: response.data.name,
        img: response.data.image_uris.border_crop,
        prize: response.data.prices.usd,
        color: response.data.colors[0],
      });
      this.loading = false;
    },
    searchColor(color) {
      console.log(this.selectedColor === color);
      if (this.selectedColor === color || this.selectedColor == "") {
        this.search = !this.search;
      }
      this.selectedCards = this.cards.filter((card) => card.color === color);
      this.selectedColor = color;
    },
    totalItems(array) {
      let sum = 0;
      array.forEach((card) => {
        sum += parseFloat(card.prize) || 0;
      });
      return Math.round(sum);
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
.leftMenu {
  position: absolute;
  left: 0;
  width: 3.5%;
  top: 30%;
  .color {
    background-color: $background-opacity;
    padding-right: 10px;
    margin-bottom: 5px;
    border-radius: 0 25px 25px 0;
    img {
      padding: 10px 0;
    }
  }
  .color:hover {
    width: 100px;
    img {
      width: 70px;
      height: 70px;
      margin-left: 20px;
    }
  }
  .colorSelect {
    width: 100px;
    img {
      width: 70px;
      height: 70px;
      margin-left: 20px;
    }
  }
}
</style>