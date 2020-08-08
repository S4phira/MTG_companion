<template>
  <div class="leftMenu">
    <div
      class="color"
      @click="emitColor(logo)"
      v-for="logo of colors"
      :key="logo"
      :class="{ colorSelect: selectedColor==logo && search}"
    >
      <img :src="getImgUrl(logo)" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ["R", "W", "U", "B", "G", "C"],
    };
  },
  props: {
    selectedColor: String,
    search: Boolean,
    cards: Array,
  },
  methods: {
    emitColor(color) {
      this.$emit("selectedColor", color);
    },
    getImgUrl(logo) {
      return require("../../assets/logo/" + logo + ".svg");
    },
  },
};
</script>
<style lang="scss">
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.404);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
.leftMenu {
  position: absolute;
  right: 0;
  width: 130px;
  top: 30%;
  position: fixed;
  .color {
    margin-left: 30px;
    background-color: $background-opacity;
    padding-right: 10px;
    margin-bottom: 5px;
    border-radius: 25px 0 0 25px;
    -webkit-transition: margin 0.5s ease-out;
    -moz-transition: margin 0.5s ease-out;
    -o-transition: margin 0.5s ease-out;
    img {
      width: 70%;
      padding: 10px 0 10px 20px;
    }
  }
  .color:hover {
    margin-left: 0;
    cursor: pointer;
  }
  .colorSelect {
    margin-left: 0;
  }
}
</style>