<template>
  <div class="container">
    <div class="row">
      <Mushclient class="twothirds"/>
      <div class="sidebar third">
        <Helpfiles />
      </div>
    </div>
  
  <ul class="example">
    <li v-for="stat in attributes.physical">
      {{stat.name}}
      <input 
        v-for="n in 5"
        :id="'attr' + stat.name + n"
        name="'attr-' + stat.name'"
        type="radio"
      />
      <label
        v-for="n in 5"
        :id="'value'+ stat.name + n"
        :for="'attr' + stat.name + n"
      > {{n}}
      </label>
    </li>
  </ul>
  </div>
</template>

<script>
  // import Component from 'filepath';
  // The export default syntax is declaring a component 
  // which can be registered and reused later.
  import Mushclient from './Mushclient.vue'
  import Helpfiles from './Helpfiles.vue'

  export default {
    name: 'App',
    components: { Mushclient, Helpfiles },
    data () {
      return {
        attributes: {
          physical: [
            {name: 'Strength', value: 1},
            {name: 'Dexterity', value: 1},
            {name: 'Stamina', value: 1}
          ],
          social: [
            {name: 'Charisma', value: 1},
            {name: 'Manipulation', value: 1},
            {name: 'Appearance', value: 1}
          ],
          mental: [
            {name: 'Intelligence', value: 1},
            {name: 'Wits', value: 1},
            {name: 'Perception', value: 1},   
          ]
        }
      }
    },
    created() {
    }
  }
</script>

<style>
  :root {
    --main-bg: #333;
    --main-bg-darker: #222;
    --main-bg-lighter: #444; 
    --lowlight: #111;
    --highlight: #555;
    --text: #ccc;
    --text-lighter: #eee;
    --buttonbg: #175f8a;
    --buttonbg-hover: #1a6b9b;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: space-between;
  }

  b {
    font-weight: 700;
    color: var(--text-lighter);
  }

  body, html {
    letter-spacing: .5px;
    height: 100%;
    max-height: 100%;
    background-color: var(--main-bg);
    color: var(--text);
    font-family: "Montserrat", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-lighter);
  }

  input[type=text], textarea {
    border-radius: 5px;
    padding: 5px;
    color: var(--text);
  }

  .third {
    width: 33%
  }

  .twothirds {
    width: 66%
  }

  .button, button {
    border-radius: 5px;
    text-align: center;
    background-color: var(--buttonbg);
    color: var(--text);
    padding: .5em;
    cursor: pointer;
    cursor: hand;
  }

  .button:hover, button:hover {
    background-color: var(--buttonbg-hover);
  }

  .button--block {
    display: block; 
  }

  .neu__element--inset {
    background: linear-gradient(145deg, transparent, var(--main-bg-darker));
    box-shadow: inset 2px 2px 4px var(--lowlight),
                inset -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  }

  .neu__element--outset {
    background: linear-gradient(145deg, transparent, var(--main-bg-darker));
    box-shadow: 3px 3px 4px var(--lowlight),
                -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  }
</style>