import {html, css} from 'lit-element'
import {classMap} from 'lit-html/directives/class-map'
import {Root} from './root.lit.js'

class Accordion extends Root {
  constructor() {
    super();
  }

  static get styles () {
    return [
      super.styles,
     style,
    ]
  }

  static get properties () {
    return {
      id: { type: String },
      isOpen: { type: Boolean },
      title: { type: String }
     }
  }

  handleClick () {
    console.log(this.isOpen)
    this.isOpen = !this.isOpen
  }

  connectedCallback () {
    if (!this.id) {
      console.error('HEY! Give this accordion an ID!')
    }
    if( !this.isOpen ) {
      this.isOpen = false;
    }
    super.connectedCallback()
  }

  render() {
    return html`
      <div class="accordion">
        <label for=${this.id} class="accordion__heading">
          <button
            id=${this.id}
            type="checkbox"
            class=${classMap({
              'accordion__toggle': true,
              'Open': this.isOpen,
              'Closed': !this.isOpen
            })}
            @click=${this.handleClick}
          >
          </button>
            ${this.title}
        </label>
      </div>

      <div
        aria-hidden=${!this.isOpen}
        class=${classMap({
        'accordion__panel': true,
        'Open': this.isOpen,
        'Closed': !this.isOpen
      })}>
        <slot></slot>
      </div>
    </div>
    `
  }
}

const style = css`
  .accordion__heading {
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: var(--color-accent);
    padding: var(--size-sm) 0;
    width: 100%;
    background-color: var(--color-grey);
    border-bottom: 1px solid var(--color-accent);
    font-size: var(--font-height-md);
    cursor: pointer;
    cursor: hand;
  }

  .accordion__panel {
    overflow-y: hidden;
    padding: var(--size-md);
    border-top: none;
    margin-bottom: var(--size-md);
  }

  .accordion__panel.Open {
    max-height: 1000px;
    transition: opacity 0.5s, max-height 0.5s;
    opacity: 1;
  }
  .accordion__panel.Closed {
    opacity: 0;
    max-height: 0;
    transition: opacity 0.5s, max-height 0.5s;
    padding: 0;
    margin-bottom: 0;
  }

  .accordion__toggle {
    width: var(--size-lg);
    height: var(--size-lg);
    margin: 0 var(--size-sm);
    position: relative;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.25s;
  }

  .accordion__toggle:focus {
    border: 2px solid var(--color-accent);
  }

  .accordion__toggle:after {
    width: var(--size-sm);
    height: var(--size-sm);
    display: block;
    position: absolute;
    content: "";
    border: 2px solid var(--color-primary);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    border-right: none;
    border-bottom: none;
    transform-origin: center;
    transition: all 0.25s;
  }
  .accordion__toggle.Open:after {
    -webkit-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    transform: rotate(225deg);
    transition: all 0.25s;
  }
`;

customElements.define('modern-accordion', Accordion)