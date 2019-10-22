import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'

Vue.use(SuiVue)

if (document.querySelector('#schedule-a'))
  new Vue({
    render: h => h(App)
  }).$mount('#schedule-a')

if (document.querySelector('#schedule-b'))
  new Vue({
    render: h => h(App)
  }).$mount('#schedule-b')