import {html, css} from 'lit-element'
import {classMap} from 'lit-html/directives/class-map'
import {Root} from '../root.lit.js'
import {SharedFormStyles} from './formcontrol.lit.js'

class SearchBar extends Root {
  constructor() {
    super();
  }

  static get styles () {
    return [
      super.styles,
      SharedFormStyles,
      style,
    ]
  }

  static get properties () {
    return {
      id: { type: String },
     }
  }

  handleInput () {
    const onSearchInput = new CustomEvent('modern-searchbar-input', {
      detail: { query: this.query },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(onSearchInput)
  }

  connectedCallback () {
    if (!this.id) {
      console.error('HEY! Give this search input an ID!')
    }
    this.label = this.textContent.trim()
    super.connectedCallback()
  }

  firstUpdated () {
    this.addEventListener('click', this.handleInput)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.handleInput)
  }

  render() {
    return html`
    <div class="form__control">
      <label for="${this.id}">
          ${this.label}
       </label>
      <div class="form__searchbar">
        <input
          type="search"
          id="${this.id}"
        />
        <input
          type="submit"
        >
      </div>
    </div>
    `
  }
}

const style = css`
  .form__control input[type="submit"] {
    color: var(--color-background);
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);
    padding: var(--size-sm);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    letter-spacing: 0.5px;
  }

  .form__control input[type="submit"]:hover,
  .form__control input[type="submit"]:focus {
    background-color: var(--color-background);
    color: var(--color-primary); 
  }

  .form__searchbar {
    display: flex;
    width: 100%;
  }

  .form__searchbar input[type="search"] {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    width: 100%;
  }
`;

customElements.define('modern-searchbar', SearchBar)