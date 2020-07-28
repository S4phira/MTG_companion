<template>
  <div class="box">
    <listCards />
  </div>
</template>

<script>
import listCards from "./ListCards.vue";

export default {
  name: "AddCards",
  components: {
    listCards
  }
};
</script>

<style lang="scss" scoped>
$background_color: #161616;
$background-opacity: rgba(3, 3, 3, 0.6);
$color-text: #fff;
$button-color: rgba(3, 3, 3, 0.774);
.box {
  width: auto;
  height: auto;
  background-color: $background-opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
</style>
