<template>
  <div class="box">
    <div class="box__header">
      <div class="noCards" v-if="userCards.length== 0">
        <p>Nie masz żadnych dodanych kart.</p>
        <p>kliknij "Rozpocznij" aby dodać</p>
        <button @click="show">Rozpocznij</button>
      </div>
      <div class="listCards" v-if="userCards.length!= 0">
        <p class="listCards__header">YOUR DECK</p>
        <p>{{totalItem}} $</p>
        <div class="listCards__list">
          <img v-for="userCard of userCards" :key="userCard.name" :src="userCard.img" />
        </div>
        <button v-if="userCards.length!= 0" @click="show">Add cards</button>
      </div>
    </div>
    <modal class="box__modal" name="add-cards" :width="800" height="auto">
      <div class="modal">
        <p class="modal__header">NEW CARDS</p>
        <div class="modal__form">
          <input v-model="search" />
          <button @click="get">Search</button>
        </div>
        <div v-show="loading" class="modal__loader"></div>
        <div class="modal__element" v-for="card of cards" :key="card.id" v-show="card.img!=null">
          <p>{{card.name}}</p>
          <p>{{card.prize}}</p>
          <img :src="card.img" />
          <button @click="addCard">ADD</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
//const baseUrl = "http://api.magicthegathering.io/v1/cards?name=";
const urlScryfall = "https://api.scryfall.com/cards/named?fuzzy=";
//const proxy = "https://cors-anywhere.herokuapp.com/";
export default {
  name: "AddCards",
  data() {
    return {
      search: "",
      loading: false,
      cards: [],
      sum: 0,
      userCards: [
        // {
        //   name: " Nissa",
        //   prize: "3",
        //   img:
        //     "https://img.scryfall.com/cards/border_crop/front/d/3/d36e87ca-71e1-43d2-841f-b01a58fe27f0.jpg?1595478811"
        // },
        // {
        //   name: " Nissa",
        //   prize: "2",
        //   img:
        //     "https://img.scryfall.com/cards/border_crop/front/d/3/d36e87ca-71e1-43d2-841f-b01a58fe27f0.jpg?1595478811"
        // },
        // {
        //   name: " Nissa",
        //   prize: "1",
        //   img:
        //     "https://img.scryfall.com/cards/border_crop/front/d/3/d36e87ca-71e1-43d2-841f-b01a58fe27f0.jpg?1595478811"
        // }
      ]
    };
  },
  computed: {
    totalItem: function() {
      let sum = 0;
      this.userCards.forEach(card => {
        sum += parseFloat(card.prize);
      });
      return sum;
    }
  },
  methods: {
    show() {
      this.$modal.show("add-cards");
    },
    hide() {
      this.$modal.hide("add-cards");
    },
    mount() {
      this.show();
    },

    async get() {
      this.loading = true;
      this.cards = [];
      const res = await axios.get(urlScryfall + this.search);
      console.log(res);
      this.loading = false;
      this.search = "";
      this.cards = [
        {
          name: res.data.name,
          img: res.data.image_uris.border_crop,
          prize: res.data.prices.usd
        }
      ];
      console.log(this.cards.name);
    },
    addCard() {
      this.userCards.push(...this.cards);
    }
  }
};
</script>

<style lang="scss" scoped>
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
.box {
  width: 80%;
  height: auto;
  background-color: $background-opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  &__header {
    position: relative;
    display: flex;
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
        img {
          width: 230px;
          height: 310px;
        }
      }
    }
  }
  &__modal {
    .modal {
      background-color: $background_color;
      width: 100%;
      height: 100%;
      overflow: hidden;
      &__header {
        color: #fff;
        font-size: 40px;
        text-align: center;
        padding-top: 2%;
      }
      &__form {
        widows: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 75px;
        label {
          font-size: 30px;
        }
        input {
          height: 40px;
          width: 260px;
          margin: 0 3%;
        }
        button {
          height: 40px;
          width: 60px;
        }
      }
      &__element {
        margin: 10px;
        p {
          color: $color-text;
        }
        img {
          width: 230px;
          height: 310px;
        }
      }
      &__loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #cc7728;
        width: 100px;
        height: 100px;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
