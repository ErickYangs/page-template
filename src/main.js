import { createApp } from "vue";
import router from "./router";
import i18n from "./i18n";
import store from "./store";
import App from "./App.vue";
import "@/styles/index.scss";
import "@/utils/resize";
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/drawer/style/css'

createApp(App).use(router).use(store).use(i18n).mount("#app");
