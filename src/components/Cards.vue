<template>
  <div class="box">
    <div class="box__header">
      <p>Nie masz żadnych dodanych kart.</p>
      <p>kliknij "Rozpocznij" aby dodać</p>
      <button @click="show">Rozpocznij</button>
    </div>
    <modal class="modal_style" name="add-cards" :width="1500" height="auto">
      <div class="modal">
        <p class="modal__header">NOWA KARTA</p>
        <div class="modal__form">
          <label>Nazwa:</label>
          <input v-model="search" />
          <button @click="get">Dodaj</button>
        </div>
        <div class="list">
          <div class="list__element" v-for="cardsName of cards" :key="cardsName.id">
            <div v-if="loading" class="loader"></div>
            <div>
              <img :src="cardsName.img" />
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://api.magicthegathering.io/v1/cards?name=";
const proxy = "https://cors-anywhere.herokuapp.com/";
export default {
  name: "AddCards",
  methods: {
    show() {
      this.$modal.show("add-cards");
    },
    hide() {
      this.$modal.hide("add-cards");
    },
    async get() {
      this.cards = [];
      this.loading = true;

      const res = await axios.get(proxy + baseUrl + this.search);
      this.loading = false;
      res.data.cards.forEach(element => {
        this.cards.push({
          name: element.name,
          img: element.imageUrl,
          id: element.multiverseid
        });
      });
    }
  },
  mount() {
    this.show();
  },
  data() {
    return {
      search: "",
      loading: false,
      cards: [
        {
          name: "",
          img: "",
          id: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
.box {
  width: 70%;
  height: 70%;
  background-color: $background-opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  &__header {
    position: relative;
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
  .modal_style {
    background-color: rgba(3, 3, 3, 0);
  }
  .modal {
    background-color: grey;
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
  }
  .list {
    display: flex;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
    &__element {
      margin: 10px;
      img {
        width: 230px;
        height: 310px;
      }
      .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #cc7728;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
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
