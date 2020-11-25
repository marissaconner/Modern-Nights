import {html, css} from 'lit-element'
import {Root} from './root.lit.js'

class CustomBoi extends Root {
  constructor() {
    super();
  }

  static get styles () {
    return [
      super.styles,
    ]
  }

  render() {
    return html`
    <div>
      <h1>Test!</h1>
      <p>wowwa weewa!</p>
    </div>
    `
  }
}

customElements.define('custom-element', CustomBoi)