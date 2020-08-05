<template>
  <div id="app">
    <Menu :nav-links="navLinks" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => ({
    navLinks: [
      {
        text: "Add cards",
        path: "/addCards",
      },
      {
        text: "Scan Cards",
        path: "/scanCards",
      },
      {
        text: "Decks List",
        path: "/cards",
      },
    ],
  }),
};
</script>

<style lang="scss">
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: "Rowdies", cursive;
  background-image: url(assets/backgrounds/1.jpg);
  height: auto;
  min-height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
