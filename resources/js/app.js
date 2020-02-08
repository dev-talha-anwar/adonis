import Vue from 'vue'
import axios from 'axios'
window.axios = axios
// axios.defaults.baseURL = 'http://127.0.0.1:3333'
import router from '@/routes/routes'
new Vue({
  el: '#app',
  router
})