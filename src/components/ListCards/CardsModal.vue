<template>
  <modal name="info-card" :focus-trap="true" width="50%" :height="600" @before-open="beforeOpen">
    <div class="panel" v-for="card of cardInfo" :key="card.name">
      <div class="panel-left" v-lazy-container="{ selector: 'img', error: urlLazyLoad}">
        <img :data-src="card.image_uris.large" />
      </div>
      <div class="panel-right">
        <div class="header">
          <p class="header__name">{{card.name}}</p>
          <p class="header__rarity">{{card.rarity}}</p>
        </div>
        <div class="stripe"></div>
        <div class="body">
          <p>{{card.prices.usd}} $</p>
          <p>Set: {{card.set_name}}</p>
        </div>
        <div class="stripe"></div>
        <div class="footer">
          <p>Released at: {{card.released_at}}</p>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import axios from "axios";
const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";
export default {
  data: function () {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
      id: "",
      cardInfo: [],
    };
  },
  computed: {
    itemId: function () {
      return this.id;
    },
  },
  methods: {
    beforeOpen(event) {
      this.id = event.params.id;
      this.getCardData(this.id);
    },
    async getCardData(id) {
      this.cardInfo = [];
      const response = await axios.get(urlMultiverse + id);
      this.cardInfo.push(response.data);
    },
  },
};
</script>
<style lang="scss">
.panel {
  background-color: black;
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 30px;

  .panel-left {
    width: 50%;
    float: left;
    height: 100%;
    img {
      width: 85%;
      margin: 5%;
      border-radius: 5%;
    }
  }
  .panel-right {
    width: 45%;
    float: right;
    padding: 2% 2%;
    text-align: center;
    .header {
      &__name {
        font-size: 40px;
        text-transform: uppercase;
      }
      &__rarity {
        font-size: 20px;
        margin-top: -10%;
      }
    }
    .stripe {
      margin: auto;
      width: 85%;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.527);
    }
    .footer {
      position: absolute;
      bottom: 0;
      right: 30px;
      font-size: 20px;
      color: rgb(66, 66, 66);
    }
  }
}
</style>