import {html, css} from 'lit-element'
import {classMap} from 'lit-html/directives/class-map'
import {Root} from '../root.lit.js'
import {SharedFormStyles} from './formcontrol.lit.js'

class Checkbox extends Root {
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
      checkmark: { type: Boolean }
    }
  }

  handleClick (event) {
    const item = event.target
    if (!item.disabled) {
      const onCheckboxToggle = new CustomEvent('modern-checkbox-toggle', {
        detail: { id: this.id },
        bubbles: true,
        composed: true
      })
      this.dispatchEvent(onCheckboxToggle)
    }
  }

  firstUpdated () {
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.handleClick)
  }

  connectedCallback () {
    if (!this.id) {
      console.error('HEY! Give this checkbox an ID!')
    }
    this.label = this.textContent.trim()
    super.connectedCallback()
  }

  render() {
    return html`
    <div class="form__control">
      <div class="form__checkbox">
        <input
          type="checkbox"
          id="${this.id}"
        />
        <label for="${this.id}">
          <span class=${classMap({
            'form__checkgraphic': true,
            'Checked': this.checkmark,
            'Unchecked': !this.checkmark,
          })}
          >
          </span>
          ${this.label}
       </label>
      </div>
    </div>
    `
  }
}

const style = css`
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
    padding: var(--size-xxs);
    border-radius: var(--border-radius);
  }

  .form__checkbox input[type="checkbox"]:focus ~ label span {
    box-shadow: var(--effect-focus);
  }

  .form__checkgraphic {
    height: var(--size-md);
    width: var(--size-md);
    padding: var(--size-sm);
    display: inline-block;
    margin-right: var(--size-sm);
    border-radius: var(--border-radius);
    border-width: 1px;
    box-sizing: border-box;
    border-style: solid;
    border-color: var(--color-primary);
    position: relative;
  }

  .form__checkgraphic:after {
    content: "";
    position: absolute;
    left: var(--size-xs);
    bottom: var(--size-xxxs);
    width: var(--size-xxxs);
    height: var(--size-sm);
    border: solid var(--color-background);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .form__checkgraphic.Checked {
    background-color: var(--color-primary);
  }
  .form__checkgraphic.Unchecked {
    background-color: var(--color-background);
  }
`;

customElements.define('modern-checkbox', Checkbox)