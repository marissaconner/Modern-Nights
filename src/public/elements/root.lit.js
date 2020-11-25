import { LitElement, css, unsafeCSS } from 'lit-element'

export const Root = class BaseElement extends LitElement {

  static get styles() {
    return [reset]
  }
}

const ratio = 1.25;
const size = 1;
const baselineText = '1.4em';
const baselineDisplay = '1.3em'

const scale = function(power) {
  let size = Math.pow(ratio,power);
  return size.toFixed(3);
}

const heightsm = `${size / ratio}rem`;
const heightmd = `${size}rem`;
const heightlg = `${scale(1)}rem`;
const heightxl = `${scale(2)}rem`;
const heightxxl = `${scale(3)}rem`;
const heightxxxl = `${scale(4)}rem`;
const heightxxxxl = `${scale(5)}rem`;

const sizexxxs = `${size / 5}rem`;
const sizexxs = `${size / 4}rem`;
const sizexs = `${size / 3}rem`;
const sizesm = `${size / 2}rem`;
const sizemd = `${size}rem`;
const sizelg = `${size * 2}rem`;
const sizexl = `${size * 3}rem`;
const sizexxl = `${size * 4}rem`;
const sizexxxl = `${size * 5}rem`;

// language=CSS
const reset = css`
  :host {
    /* Colors */
    --color-background: #fcfcfc;
    --color-shadow: rgba(0,0,0,0.5);

    --color-primary: #83231e;
    --color-primary-light: #aa231f;
    --color-primary-dark: #5c1f1b;

    --color-accent: #212121;
    --color-accent-light: #343334;
    --color-accent-dark: #000000;

    --color-caution: #e62325;
    --color-success: #175d8d;
    --color-error: var(--color-caution);

    --font-color-text: #212121;
    --font-color-display: var(--color-primary);

    --font-height-sm: ${unsafeCSS(sizesm)};
    --font-height-md: ${unsafeCSS(sizemd)};
    --font-height-lg: ${unsafeCSS(sizelg)};
    --font-height-xl: ${unsafeCSS(sizexl)};
    --font-height-xxl: ${unsafeCSS(sizexxl)};
    --font-height-xxxl: ${unsafeCSS(sizexxxl)};

    --size-xxxs: ${unsafeCSS(sizexxxs)};
    --size-xxs: ${unsafeCSS(sizexxs)};
    --size-xs: ${unsafeCSS(sizexs)};
    --size-sm: ${unsafeCSS(sizesm)};
    --size-md: ${unsafeCSS(sizemd)};
    --size-lg: ${unsafeCSS(sizelg)};
    --size-xl: ${unsafeCSS(sizexl)};
    --size-xxl: ${unsafeCSS(sizexxl)};
    --size-xxxl: ${unsafeCSS(sizexxxl)};

    --effect-focus: 0 0 0 2px var(--color-accent);
    --border-radius: var(--size-xxxs);

    h1, h2, h3, h4, h5, h6 {
      line-height: ${unsafeCSS(baselineDisplay)};
      margin-top: var(--size-md);
      margin-bottom: var(--size-xs);
    }
    p, span, a, rt, rp, dfn, abbr, q, cite, em, time, var,
    samp, i, b, sub, sup, small, strong, mark, ruby, ins, del,
    bdi, bdo, s, kbd, wbr, h1, h2, h3, h4, h5, h6 {
      font-family: "Montserrat", sans-serif
    }
    p {
      font-size: var(--font-height-md);
      line-height: ${unsafeCSS(baselineText)};
      margin-bottom: var(--size-md);
      margin-top: var(--size-xs);
    }  
  }
`;