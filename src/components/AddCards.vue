<template>
  <div class="container">
    <router-link to="/cards">
      <button class="btn btn--back">Back</button>
    </router-link>
    <p class="container__header">NEW CARDS</p>
    <div class="container__form">
      <input placeholder="name" v-model="search" />
      <button class="btn" @click="searchCards">Search</button>
    </div>
    <div class="container__loader">
      <div v-show="loading" class="loader">Loading...</div>
    </div>
    <p class="container__error">{{error}}</p>
    <div class="container__cards" v-for="card of card" :key="card.id">
      <img :src="card.img" />
      <button class="btn" @click="addCard">ADD</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const urlScryfall = "https://api.scryfall.com/cards/named?fuzzy=";

export default {
  data() {
    return {
      card: [],
      loading: false,
      error: ""
    };
  },
  methods: {
    async searchCards() {
      this.loading = true;
      this.error = "";
      this.cards = [];
      try {
        const res = await axios.get(urlScryfall + this.search);
        this.card = [
          {
            name: res.data.name,
            img: res.data.image_uris.border_crop,
            prize: res.data.prices.usd
          }
        ];
      } catch (error) {
        this.error = error.response.data.details;
      }
      this.loading = false;
      this.search = "";
    },
    async addCards() {
      await axios.post("/public/cards.json", "hello=world");
    }
  }
};
</script>
<style lang="scss">
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);

.btn {
  background: transparent;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  min-width: 130px;
  margin: 10px;
  color: white;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 17px;
  &--back {
    min-width: 70px;
    font-size: 14px;
    border-color: rgb(34, 34, 34);
    color: grey;
  }
}
.container {
  min-width: 900px;
  height: auto;
  background-color: $background-opacity;
  border-radius: 20px;
  &__header {
    color: white;
    font-size: 50px;
    text-align: center;
  }
  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
    input {
      height: 30px;
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
  &__error {
    color: white;
    text-align: center;
  }
  &__cards {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 250px;
      height: 330px;
    }
    .btn {
      min-width: 100px;
      margin-top: 30px;
    }
  }
}
</style>