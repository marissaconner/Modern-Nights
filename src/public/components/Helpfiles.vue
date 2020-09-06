<template>
  <div class="newsfiles">
  <h1>Helpfiles</h1>

  <form>
    <input type="search" />
  </form>

  <div v-for="(category, index) in buckets">
    <span @click="toggleFilter" :data-index="index" :data-selected="category.selected">{{category.bucket}} {{category.selected}}</span>
  </div>

  <ul class="newsfiles__list">
    <li v-for="helpfile in helpfiles">
      <h2>{{ helpfile.category }}</h2>
     <ul class="newsfiles__list" v-for="entry in helpfile.entries">
        <li>
          <h3>{{ entry.name }}</h3>
          <div v-html="entry.contents" />
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
    name: 'Helpfiles',
    data () {
      return {
        helpfiles: {},
        buckets: []
      }
    },
    created() {
       axios.get('/api/helpfiles')
      .then(res => this.helpfiles = res.data)

      axios.get('/api/helpfiles/buckets')
      .then(res=> this.buckets = res.data)
    },
    methods: {
      toggleFilter: function(e) {
        let idx = e.target.getAttribute('data-index');
        this.buckets[idx].selected = !this.buckets[idx].selected 
      }
    }
  }
</script>

<style scoped>
  .newsfiles {
    margin: 1em;
  }

  .newsfiles__list {
    padding-inline-start: 0px; 
  }
    
  ul li {
    list-style-type: none;
  }
</style>