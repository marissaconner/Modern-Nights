<template>
 <ul>
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
</template>

<script>
  export default {
    name: 'Attributes',
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
</style>