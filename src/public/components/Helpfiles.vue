<template>
  <div class="newsfiles">
    <h1>Rules And Help</h1>

    <modern-searchbar
      id="news-help-search"
      v-on:modern-searchbar-submit="submitQuery"
      v-on:modern-searchbar-input="updateQuery"
    >
      Search
    </modern-searchbar>
      
    <h2>Filters</h2>
    <div class="newsfiles__filterlist">
      <div v-for="(category, index) in buckets">
        <modern-checkbox
          v-on:modern-checkbox-toggle="toggleFilter(category.bucket)"
          @click.prevent
          :id="category.bucket"
          :data-index="index"
          :data-name="category.bucket"
          :checkmark="buckets[index].selected"
        >
          {{category.bucket}}
        </modern-checkbox>
      </div>
    </div>

    <ul class="newsfiles__list">
      <li v-for="helpfile in helpfiles" :key="helpfile.id">
        <h3>{{ helpfile.category }}</h3>
        <ul>
          <li
            class="newsfiles__list"
            v-for="(entry, index) in helpfile.entries"
            v-bind:class="[ filters[entry.bucket] === true ? 'newsfiles__entry' : 'newsfiles__entry Hidden']"
          >
            <modern-accordion
              :title="entry.name"
              :id="'helpfile-' + entry.name.replace(/\s/g,'')"
            >
              <div v-html="entry.contents" />
            </modern-accordion>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import '../elements/forms/checkbox.lit.js';
  import '../elements/forms/searchbar.lit.js';
  import '../elements/accordion.lit.js';

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
      toggleFilter: function(id) {
        const e = document.querySelector(`#${id}`);
        let idx = e.getAttribute('data-index');
        let key = e.getAttribute('data-name');
        let boolean = !this.buckets[idx].selected
        this.buckets[idx].selected = boolean;
        if( boolean ) {
          this.filters[key] = true
        } else {
          delete this.filters[key]
        }
      },
      updateQuery: function(e) {
        console.log("updating query")
        this.query = e.detail.query;
      },
      submitQuery: function(e) {
        console.log("search");
        console.log(this.query);
        axios.get('/api/helpfiles/search', {
          params: { 
           search: this.query
          }
        })
        .then( res => this.helpfiles = res.data )
      }
    },
  }
</script>

<style>
  .newsfiles {
    margin: 1em;
  }

  .newsfiles__filterlist {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
  }

  .newsfiles__entry.Hidden {
    display: none;
  }



</style>