import Vue from "vue";

import FastClick from 'fastclick';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.use(MuseUI);
Vue.config.productionTip = false;
FastClick.attach(document.body);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");


