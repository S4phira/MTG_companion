<template>
  <div class="leftMenu">
    <div
      class="color color--red"
      @click="emitColor('R'),searchColor('R')"
      :class="{ colorSelect: selectedColor=='R' && search}"
    >
      <img src="../../assets/logo/R.svg" />
    </div>
    <div
      class="color color--white"
      @click="emitColor('W'),searchColor('W')"
      :class="{ colorSelect: selectedColor=='W' && search}"
    >
      <img src="../../assets/logo/W.svg" />
    </div>
    <div
      class="color color--blue"
      @click="emitColor('U'),searchColor('U')"
      :class="{ colorSelect: selectedColor=='U'&& search}"
    >
      <img src="../../assets/logo/U.svg" />
    </div>
    <div
      class="color color--black"
      @click="emitColor('B'),searchColor('B')"
      :class="{ colorSelect: selectedColor=='B' && search}"
    >
      <img src="../../assets/logo/B.svg" />
    </div>
    <div
      class="color color--green"
      @click="emitColor('G'),searchColor('G')"
      :class="{ colorSelect:selectedColor=='G' && search}"
    >
      <img src="../../assets/logo/G.svg" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedColor: String,
    select: Boolean,
    cards: Array,
  },
  methods: {
    emitColor(color) {
      this.$emit("selectedColor", color);
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
  left: 0;
  width: 3.5%;
  top: 30%;
  position: fixed;
  .color {
    background-color: $background-opacity;
    padding-right: 10px;
    margin-bottom: 5px;
    border-radius: 0 25px 25px 0;
    img {
      padding: 10px 0;
    }
  }
  .color:hover {
    width: 100px;
    cursor: pointer;
    img {
      width: 70px;
      height: 70px;
      margin-left: 20px;
    }
  }
  .colorSelect {
    width: 100px;
    img {
      width: 70px;
      height: 70px;
      margin-left: 20px;
    }
  }
}
</style>