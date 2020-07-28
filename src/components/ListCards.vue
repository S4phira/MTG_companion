<template>
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
      <p>{{totalItem}} $</p>
      <div class="listCards__list">
        <img v-for="cards of cards" :key="cards.name" :src="userCard.img" />
      </div>
      <button @click="show">Add cards</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      cards: []
    };
  },
  // computed: {
  //   totalItem: function() {
  //     let sum = 0;
  //     this.userCards.forEach(card => {
  //       sum += parseFloat(card.prize);
  //     });
  //     return sum;
  //   }
  // },
  method: {
    async getCards() {
      const res = await axios.get("json/cards.json", {
        baseURL: window.location.origin
      });
      console.log(res);
      this.cards = [
        {
          name: res.data.name,
          img: res.data.image_uris.border_crop,
          prize: res.data.prices.usd
        }
      ];
    }
  }
};
</script>
<style lang="scss">
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
.box {
  min-width: 900px;
  min-height: auto;
  background-color: $background-opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: relative;
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
</style>