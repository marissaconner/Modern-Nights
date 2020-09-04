<template>
  <div class="container">
  <Mushclient />
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
  export default {
    name: 'App',
    components: { Mushclient},
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
  body, html {
    height: 100%;
    max-height: 100%;
  }

  .neu__element--inset {
    background: linear-gradient(145deg, transparent, #fafafa);
    box-shadow: inset 2px 2px 4px rgba(0, 64, 64, 0.35),
                inset -3px -3px 4px rgba(255,255,255,0.35);
    transition: all .25s ease-in-out;
  }

  .neu__element--outset {
    background: linear-gradient(145deg, transparent, #fafafa);
    box-shadow: 3px 3px 4px rgba(0, 64, 64, 0.35),
                -3px -3px 4px rgba(255,255,255,0.35);
    transition: all .25s ease-in-out;
  }
</style>