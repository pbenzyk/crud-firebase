import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBgSv1AsHmxsRDsZbcW1ZBwap714RfjFaU",
  authDomain: "paiduay-resume.firebaseapp.com",
  databaseURL: "https://paiduay-resume.firebaseio.com",
  projectId: "paiduay-resume",
  storageBucket: "paiduay-resume.appspot.com",
  messagingSenderId: "411967900038",
  appId: "1:411967900038:web:ed798260ae53de7d2a8407"
};
firebase.initializeApp(firebaseConfig);

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

import './assets/css/position.css';

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
