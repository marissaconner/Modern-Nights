import {css} from 'lit-element'

export const SharedFormStyles = css`
  .form__control {
    margin: var(--size-sm) 0 var(--size-md) 0;
    width: 100%;
  }
 
  .form__control label {
    cursor: pointer;
    cursor: hand;
  }

  .form__control input[type="text"],
  .form__control input[type="search"],
  .form__control input[type="submit"],
  .form__control textarea,
  .form__control select {
    height: var(--size-lg);
    padding: var(--size-sm);
    border-radius: var(--size-xxs);
    border: 1px solid var(--color-primary);
  }

  .form__control input:focus {
    box-shadow: var(--effect-focus);
    outline: none;
  }

  .form__control label {
    font-size: var(--font-height-md);
    letter-spacing: 1px;
    font-weight: 700;
  }
`;
