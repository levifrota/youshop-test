import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mocks/browser";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueClipboards from "vue-clipboards";

loadFonts();
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueClipboards)
  .mount("#app");
