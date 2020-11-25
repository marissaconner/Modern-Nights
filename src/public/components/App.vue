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
  :root {
    --main-bg: #fcfcfc;
    --neu-bg: #5c1f1b;
    --neu-fade: #83231e;
    --focus-effect: 0 0 0 3px var(--highlight);
    --main-bg-lighter: #fefefe; 
    --lowlight: #3e1d1b;
    --highlight: #aa231f;
    --text: #212121;
    --text-lighter: #990011;
    --buttonbg: #990011;
    --buttonlabel: #fcfcfc;
    --buttonbg-hover: #AA0011;
    --border-color: #212121;
    --border-radius: 3px;
  }

  * {
    box-sizing: border-box;   
    margin: 0;
    padding: 0; 
  }

  .form__control {
    margin: 0.5rem;
  }
 
  .form__control label {
    cursor: pointer;
    cursor: hand;
  }

  .form__checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  .form__checkbox {
    cursor: pointer;
    cursor: hand;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .form__checkbox label {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: var(--border-radius);
  }

  .form__checkbox input[type="checkbox"]:focus ~ label {
    box-shadow: var(--focus-effect);
  }

  .form__checkgraphic {
    height: 25px;
    width: 25px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 2px;
    box-sizing: border-box;
    border-style: solid;
    border-color: var(--buttonbg);
    background-color: var(--buttonbg);
    position: relative;
  }

  .form__checkgraphic:after {
    content: "";
    position: absolute;
    left: 6px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid #fcfcfc;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .form__checkgraphic.Checked {
    background-color: var(--buttonbg);
  }
  .form__checkgraphic.Unchecked {
    background-color: #fcfcfc;
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
    margin-top: 1.5em;
  }

  p {
    margin: .5em 0;
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
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;
    border-radius: 5px;
    text-align: center;
    background-color: var(--buttonbg);
    color: var(--buttonlabel);
    padding: .5em;
    cursor: pointer;
    cursor: hand;
  }

  .button:hover, button:hover {
    background-color: var(--buttonbg-hover);
  }

  ul li {
    list-style-type: none;
  }

  .button--block {
    display: block; 
  }

  .neu__element--inset {
    background: linear-gradient(145deg, transparent, var(--neu-fade));
    box-shadow: inset 2px 2px 4px var(--lowlight),
                inset -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  }

  .neu__element--outset {
    background: linear-gradient(145deg, transparent, var(--neu-fade));
    box-shadow: 3px 3px 4px var(--lowlight),
                -3px -3px 4px var(--highlight);
    transition: all .25s ease-in-out;
  }
</style>