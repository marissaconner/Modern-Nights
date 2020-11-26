<template>
  <div class="container">
    <h1>Modern Nights</h1>
    <p>A 20th Anniversary Edition Classic World of Darkness Game</p>
    <div class="row">
      <Mushclient/>
    </div>
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
  * {
    box-sizing: border-box;   
    margin: 0;
    padding: 0; 
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
    color: var(--font-color-text);
  }

  body, html {
    letter-spacing: .5px;
    height: 100%;
    max-height: 100%;
    background-color: #fcfcfc;
    color: #212121;
    font-family: "Montserrat", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #83231e;
    margin-top: 1.5em;
  }

  p {
    margin: .5em 0;
  }

  input[type=text], textarea {
    border-radius: 5px;
    padding: 5px;
    color: #212121;
  }

  .third {
    width: 33%;
  }

  .twothirds {
    width: 66%;
  }

  .button, button {
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    background-color: #212121;
    color: #fcfcfc;
    padding: .5em;
    cursor: pointer;
    cursor: hand;
  }

  .button:hover, button:hover {
    background-color: black;
  }

  ul li {
    list-style-type: none;
  }

  .button--block {
    display: block; 
  }

</style>