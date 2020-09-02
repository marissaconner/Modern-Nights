import Vue from 'vue';
import App from "./components/App.vue"

// That is typically your root Vue instance that the rest
// of the application descends from. 
// This hangs off the root element declared in an html document.
let vm = new Vue({
  el: '#app',
  render: h => h(App),
  component: App
})