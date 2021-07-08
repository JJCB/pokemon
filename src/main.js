import Vue from 'vue'
import VueClipboard from 'vue-clipboard2';
import InlineSvg from 'vue-inline-svg';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.component('inline-svg', InlineSvg);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
