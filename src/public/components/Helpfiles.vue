<template>
  <div class="newsfiles">
  <h1>Rules And Help</h1>
  <form @submit.prevent="onSubmit">
    <input v-model="query" type="search" />
    <input type="submit" @click="search"/>
  </form>
  <div class="newsfiles__filterlist">
    <div v-for="(category, index) in buckets">
      <input type="checkbox" checked
        :id="category.bucket"
        v-bind:class="[category.selected ? 'newsfiles__filter--active' : 'newsfiles__filter--inactive', 'newsfiles__filter']"
        @click="toggleFilter" :data-index="index" :data-name="category.bucket" />
      <label :for="category.bucket">{{category.bucket}}</label>
    </div>
  </div>
  <ul class="newsfiles__list">
    <li v-for="helpfile in helpfiles" :key="helpfile.id">
      <ul class="newsfiles__list" v-for="entry in helpfile.entries"  v-bind:class="[ filters[entry.bucket] === true ? 'newsfiles__entry' : 'newsfiles__entry--hidden']">
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
  export default {
    name: 'Helpfiles',
    data () {
      return {
        helpfiles: [],
        buckets: [],
        filters: {},
        query: "Search"
      }
    },
    created() {
       axios.get('/api/helpfiles')
      .then(res => this.helpfiles = res.data)

      axios.get('/api/helpfiles/buckets')
      .then((res) => {
        this.buckets = res.data
        for( let i = 0; i < this.buckets.length; i += 1 ) {
          let key = this.buckets[i].bucket;
          this.filters[key] = true
        }
      })
    },
    methods: {
      toggleFilter: function(e) {
        let idx = e.target.getAttribute('data-index');
        let key = e.target.getAttribute('data-name');
        let boolean = !this.buckets[idx].selected
        this.buckets[idx].selected = boolean;
        if( boolean ) {
          this.filters[key] = true
        } else {
          delete this.filters[key]
        }
      },
      search: function() {
        axios.get('/api/helpfiles/search', {
          params: { 
           search: this.query
          }
        })
        .then( res => this.helpfiles = res.data )
      }
    },
    /* computed: {
      filteredfiles: function() {
        if(!this.isMounted) {
          return;
        }
        
        return this.helpfiles.map((category) => {
          return category.entries.filter((thisCat) => {
            return this.actives[thisCat.bucket] === undefined 
          })
        })  
      }
    } */
  }
</script>

<style scoped>
  .newsfiles {
    margin: 1em;
  }

  .newsfiles__filterlist {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
  }

  .newsfiles__entry {
    transition: all .25s ease-in-out;
    height: auto;
    opacity: 1;
  }

  .newsfiles__entry--hidden {
    height: 0px !important;
    opacity: 0;
    overflow-y: hidden;
    transition: all .25s ease-in-out;
  }

  .newsfiles__filter--active {
    background: black;
    background: linear-gradient(145deg, transparent, var(--main-bg-darker));
    box-shadow: inset 2px 2px 4px var(--lowlight),
                inset -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  }

  .newsfiles__filter--inactive {
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