import Home from "./components/Home.vue";
import Cards from "./components/Cards.vue";
import listCards from "./components/ListCards.vue";
import addCards from "./components/AddCards.vue";
import scanCards from "./components/Scan.vue";
import allCards from "./components/ListCards/AllCardsList.vue";

export const routes = [
  { path: "", component: Home },
  { path: "/cards", component: Cards },
  { path: "/listCards", component: listCards },
  { path: "/addCards", component: addCards },
  { path: "/scanCards", component: scanCards },
  {
    path: "/allCards",
    component: allCards,
  },
];
