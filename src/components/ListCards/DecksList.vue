<template>
  <div
    v-show="showContainer"
    class="list"
    v-lazy-container="{ selector: 'img', error: urlLazyLoad, loading: urlLazyLoad}"
  >
    <div class="card-box" v-for="(container, index) of containers" :key="container.name">
      <p>{{container.name}} cards: {{container.cards.length}}</p>
      <img @click="getCardId(index)" :data-src="container.img" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
    };
  },
  props: {
    showContainer: String,
    containers: Array,
  },
};
</script>
<style lang="scss">
.list {
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
</style>