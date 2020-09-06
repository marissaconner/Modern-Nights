<template>
  <div class="newsfiles">
  <h1>Helpfiles</h1>

  <form @submit.prevent="onSubmit">
    <input v-model="query" type="search" />
    <input type="submit" @click="search"/>
  </form>

  <div class="newsfiles__taglist">
    <div v-for="(category, index) in buckets">
      <span v-bind:class="[category.selected ? 'newsfiles__tag--active' : 'newsfiles__tag--inactive', 'newsfiles__tag', 'button']" @click="toggleFilter" :data-index="index" :data-selected="category.selected">{{category.bucket}}</span>
    </div>
  </div>

  <ul class="newsfiles__list">
    <li v-for="helpfile in helpfiles">
      <h2>{{ helpfile.category }}</h2>
     <ul class="newsfiles__list" v-for="entry in helpfile.entries">
        <li>
          <h3>{{ entry.name }} ({{entry.bucket}})</h3>
          <div v-html="entry.contents" />
        </li>
      </ul>
    </li>
  </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Helpfiles',
    data () {
      return {
        helpfiles: {},
        buckets: [],
        query: "Search"
      }
    },
    created() {
       axios.get('/api/helpfiles')
      .then(res => this.helpfiles = res.data)

      axios.get('/api/helpfiles/buckets')
      .then(res => this.buckets = res.data)
    },
    methods: {
      toggleFilter: function(e) {
        let idx = e.target.getAttribute('data-index');
        this.buckets[idx].selected = !this.buckets[idx].selected 
      },
      search: function() {
        axios.get('/api/helpfiles/search', {
          params: { 
           search: this.query
          }
        })
        .then( res => this.helpfiles = res.data )
      }
    }
  }
</script>

<style scoped>
  .newsfiles {
    margin: 1em;
  }

  .newsfiles__taglist {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
  }

  .newsfiles__tag {

  }

  .newsfiles__tag--active {
    background: linear-gradient(145deg, transparent, var(--main-bg-darker));
    box-shadow: inset 2px 2px 4px var(--lowlight),
                inset -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  
  }

  .newsfiles__tag--inactive {
    background: linear-gradient(145deg, transparent, var(--main-bg-darker));
    box-shadow: 3px 3px 4px var(--lowlight),
                -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
    color: var(--main-bg-lighter);
  }

  .newsfiles__list {
    padding-inline-start: 0px; 
  }
    
  ul li {
    list-style-type: none;
  }
</style>