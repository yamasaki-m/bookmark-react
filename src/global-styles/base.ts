import { css } from "styled-components";

export const baseStyles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    max-width: 1080px;
    margin: 0 auto;
    overflow-y: scroll;
    overflow-x: hidden;

    box-sizing: border-box;

    background-color: var(--color-base);
    color: var(--color-black);
    font-family: "游ゴシック体", "Yu Gothic", YuGothic, "Noto Serif JP",
      sans-serif;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }

  ol,
  ul {
    list-style: none;
  }

  input {
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    background: none;
    border: none;
    outline: none;
    appearance: none;
    font-family: inherit;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  ::-webkit-scrollbar {
    width: 16px;
  }
  ::-webkit-scrollbar-track {
    border-left: 0.5px solid var(--color-white);
    background: var(--color-gray-100);
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 1px 3px 2px rgba(255, 255, 255, 0.3);
    background: var(--color-gray-300);
    border-radius: 10px;
  }
`;
