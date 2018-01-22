import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import {Config} from './common/validator'

import App from './App'
import router from './router'
import store from './store/index'
import './assets/css/weui.min.css'
import './common/cookie'

import AutoFocus from 'vue-auto-focus'
Vue.use(AutoFocus)

import "swiper/dist/css/swiper.css";
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false
Vue.config.silent=true

Vue.use(VeeValidate, Config)
Vue.use(VueLazyload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
