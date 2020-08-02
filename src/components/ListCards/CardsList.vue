<template>
  <div
    id="scroll-target"
    class="list"
    v-lazy-container="{ selector: 'img', error:urlLazyLoad, loading: urlLazyLoad }"
  >
    <div class="card-box" v-for="card of cards" :key="card.name" @click="showInfo(card.id)">
      <img :data-src="card.img_small" v-if="search" v-show="card.color == selectedColor" />
      <img :data-src="card.img_small" v-else />
    </div>
    <InfoModal />
  </div>
</template>
<script>
import InfoModal from "./CardsModal.vue";
export default {
  components: {
    InfoModal,
  },
  data() {
    return {
      urlLazyLoad:
        "https://filebin.net/m9s8g4xxheas2xf4/back__1___1_.jpg?t=tfqhkkic",
    };
  },
  props: {
    selectedColor: String,
    cards: Array,
    search: Boolean,
  },
  methods: {
    showInfo(id) {
      this.$modal.show("info-card", { id: id });
    },
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