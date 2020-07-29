<template>
  <modal name="info-card" :focus-trap="true" width="60%" height="90%" @before-open="beforeOpen">
    <div class="panel" v-for="card of cardInfo" :key="card.name">
      <div class="panel-left">
        <img :src="card.image_uris.large" />
      </div>
      <div class="panel-right">
        <p>{{card.name}}</p>
        <p>{{card.prices.usd}} $</p>
        <p>Set: {{card.set}}</p>
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
    img {
      width: 100%;
      padding: 20px 0 0 20px;
    }
  }
  .panel-right {
    width: 50%;
    float: right;
    p {
      text-align: center;
    }
  }
}
</style>