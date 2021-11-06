import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue,BootstrapVueIcons} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PAJAX from "./components/API";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(PAJAX);

new Vue({
  render: h => h(App),
}).$mount('#app')
