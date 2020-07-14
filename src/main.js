// =========================================================
// * PineApp - v1.0.0
// =========================================================
/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import "./plugins/vue-world-map";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import VueLoading from "vuejs-loading-plugin";
import VAvatarUploader from "vuetify-avatar-uploader";
import "../src/assets/global.scss";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import moment from "moment";

Vue.prototype.moment = moment;
Vue.config.productionTip = false;
Vue.use(VueLoading);
Vue.use(VAvatarUploader);
Vue.use(VueSweetalert2);

console.log(process.env.VUE_APP_API_URL_BACKEND);

export const EventBus = new Vue();

router.beforeEach(async (to, from, next) => {
  const rutaProtegida = await to.matched.some(
    record => record.meta.requiere_auth
  );
  /* const logueado = localStorage.getItem('logueado') */

  if (rutaProtegida && store.state.token === "") {
    next({ name: "Login" });
  } else if (!rutaProtegida && store.state.token !== "") {
    next("/app");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
