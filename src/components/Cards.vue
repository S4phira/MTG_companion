<template>
  <listCards />
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
</style>
