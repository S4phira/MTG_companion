import Home from "./components/Home.vue";
import Cards from "./components/Cards.vue";
import listCards from "./components/ListCards.vue";
import addCards from "./components/AddCards.vue";

export const routes = [
  { path: "", component: Home },
  { path: "/cards", component: Cards },
  { path: "/listCards", component: listCards },
  { path: "/addCards", component: addCards },
];
