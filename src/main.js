// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App'
// import Login from './login'
import router from './router'
import VueResource from 'vue-resource'
import DatePicker from 'vue-md-date-picker'

import V2DatePicker from 'v2-datepicker'

Vue.use(V2DatePicker)
Vue.use(VueResource)
Vue.use(VueMaterial)
Vue.use(DatePicker)

// Base URL for API (server)
// 113.52.135.240
Vue.prototype.apiURL = 'http://113.52.135.240:3000/'
// Vue.prototype.apiURL = "http://localhost:3000/";

// Base URL for Client
Vue.prototype.clientURL = "http://113.52.135.240/"
// Vue.prototype.clientURL = "http://localhost:8080/";

Vue.prototype.screenwidth = 1000;

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'light-blue',
      hue: 700
    },
    accent: 'blue'
  },
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});

// new Vue({
//   el: '#app-login',
//   router,
//   template: '<App/>',
//   components: { Login }
// });
