<template>
  <div id="app">
  <h1>Helpfiles</h1>
  <ul>
  <li v-for="helpfile in helpfiles">
    {{ helpfile.category }}
    <ul v-for="entry in helpfile.entries">
      <li>
        {{ entry }}
      </li>
    </ul>
  </li>
  
  </ul>
  </div>
</template>

<script>
import axios from 'axios';

// The export default syntax is declaring a component 
// which can be registered and reused later.
  export default {
    name: 'App',
    data () {
      return {
        helpfiles: {}
      }
    },

    created() {
       axios.get('/api/helpfiles')
      .then(res => this.helpfiles = res.data)
    }
  }
</script>