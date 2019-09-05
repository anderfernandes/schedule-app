import Vue from 'vue'
import App from './App.vue'

if (document.querySelector('#schedule-a'))
  new Vue({
    render: h => h(App)
  }).$mount('#schedule-a')

if (document.querySelector('#schedule-b'))
  new Vue({
    render: h => h(App)
  }).$mount('#schedule-b')