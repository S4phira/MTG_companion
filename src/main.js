import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { routes } from "./routes.js";
import VModal from "vue-js-modal";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VModal);
Vue.use(VueLazyload);

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
