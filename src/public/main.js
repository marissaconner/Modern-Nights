import Vue from 'vue';
import App from "./components/App.vue";
import Helpfiles from "./components/Helpfiles.vue";
import Mushclient from "./components/Mushclient.vue";

const routes = {
  '/': App,
  '/play': Mushclient,
  '/help': Helpfiles
}

// That is typically your root Vue instance that the rest
// of the application descends from. 
// This hangs off the root element declared in an html document.
let vm = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      console.log(this.currentRoute)
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})