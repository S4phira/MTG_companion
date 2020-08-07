<template>
  <div class="list" v-lazy-container="{ selector: 'img', error: urlLazyLoad, loading: urlLazyLoad}">
    <div class="box" v-for="(container, index) of containers" :key="container.name">
      <div class="box__desc">
        <p>{{container.name}}</p>
        <p>{{container.cards.length}}</p>
      </div>
      <img class="box__img" @click="getCardId(index)" :data-src="container.img" />
    </div>
    <div class="add-box">
      <div>
        <div class="circle-plus">
          <div class="circle">
            <div class="horizontal"></div>
            <div class="vertical"></div>
          </div>
        </div>
      </div>
    </div>
    <modal name="modal" :height="200">
      <div class="modal">
        <a @click="closeModal" class="close"></a>
        <h1>Nie masz żadnych dodanych kart!</h1>
        <router-link to="/addCards">
          <button class="btn">Add card</button>
        </router-link>
      </div>
    </modal>
  </div>
</template>
<script>
import axios from "axios";
const urlMultiverse = "https://api.scryfall.com/cards/multiverse/";
export default {
  data() {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
      loading: true,
      sumValue: 0,
    };
  },
  props: {
    showContainer: Boolean,
    containers: Array,
  },
  methods: {
    getCardId(index) {
      this.sumCards = this.containers[index].cards.length;
      this.sumValue = 0;
      this.containers[index].cards.forEach((card) => {
        this.getCardData(card.id);
      });
      if (this.containers[index].cards.length === 0) {
        this.loading = false;
        this.$modal.show("modal");
      }

      this.$emit("load", this.loading);
    },
    addColors(colors) {
      let collorsArray = [];
      colors.forEach((el) => collorsArray.push(el));
      return collorsArray;
    },
    async getCardData(id) {
      this.cards = [];
      const response = await axios.get(urlMultiverse + id);
      this.cards.push({
        id: id,
        name: response.data.name,
        img_small: response.data.image_uris.border_crop,
        img_large: response.data.image_uris.large,
        prize: response.data.prices.usd,
        color: this.addColors(response.data.colors),
      });
      this.$emit("sendCardsArray", this.cards);
      this.sumValue += Math.round(parseFloat(response.data.prices.usd) || 0);
      this.$emit("sendCardsValue", this.sumValue);
    },
    closeModal() {
      this.$modal.hide("modal");
    },
  },
};
</script>
<style lang="scss" scoped>
$background-opacity: rgba(3, 3, 3, 0.739);
.list {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  .box {
    position: relative;
    padding: 15px;
    &__img {
      width: 230px;
      height: 310px;
    }
    &__img:hover {
      cursor: pointer;
      box-shadow: 10px 10px 30px rgb(0, 0, 0);
      opacity: 0.8;
    }
    &__desc {
      position: absolute;
      bottom: 10px;
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin: 2% 5%;
      z-index: 10;
    }
  }
  .add-box {
    padding: 15px;
  }
  .add-box div {
    background: $background-opacity;
    width: 230px;
    height: 310px;
    margin: auto;
    position: relative;
    .circle-plus {
      background: transparent;
      height: 6em;
      width: 6em;
      font-size: 0.9em;
      margin: auto;
      padding: 4em 0;
      pointer-events: none;
      position: absolute;
      padding: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .circle-plus .circle {
      position: relative;
      width: 4.5em;
      height: 4.5em;
      border-radius: 100%;
      border: solid 0.8em #494949;
    }
    .circle-plus .circle .horizontal {
      position: absolute;
      background-color: #494949;
      width: 2.4em;
      height: 0.7em;
      top: 1.9em;
      left: 1.05em;
    }
    .circle-plus .circle .vertical {
      position: absolute;
      background-color: #494949;
      width: 0.7em;
      height: 2.4em;
      top: 1.05em;
      left: 1.9em;
    }
  }
  .add-box div:hover {
    cursor: pointer;
    .circle-plus .circle {
      border-color: #fff;
    }
    .circle-plus .circle .horizontal {
      background-color: #fff;
    }
    .circle-plus .circle .vertical {
      background-color: #fff;
    }
  }
  .modal {
    background-color: black;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 20px;
  }
}
</style>
<style lang="scss">
.close {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: rgb(255, 255, 255);
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>