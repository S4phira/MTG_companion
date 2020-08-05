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
@import "https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css";
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

  figure {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 10px;
    margin-inline-end: 0;
  }

  #nav {
    position: absolute;
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
