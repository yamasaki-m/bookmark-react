import { css } from "styled-components";

export const animations = css`
  .list-enter {
    opacity: 0;
    /* position: absolute !important; */
  }
  .list-enter-active {
    opacity: 1;
    transition: 0.3s var(--ease-out);
    /* position: absolute !important; */
  }
  .list-exit {
    opacity: 1;
    transform: translate(0, 0);
    /* position: absolute !important; */
  }
  .list-exit-active {
    opacity: 0;
    transition: 0.3s var(--ease-out);
    transform: translate(0, 10px);
    /* position: absolute !important; */
  }

  .alert-enter {
    opacity: 0;
  }
  .alert-enter-active {
    opacity: 1;
    transition: opacity 0.3s var(--ease-out);
  }
  .alert-exit {
    opacity: 1;
  }
  .alert-exit-active {
    opacity: 0;
    transition: opacity 0.3s var(--ease-out);
  }

  .fade-enter {
    opacity: 0;
  }
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  @keyframes shake {
    20% {
      transform: translateX(-2px);
    }
    40% {
      transform: translateX(2px);
    }
    60% {
      transform: translateX(-4px);
    }
    80% {
      transform: translateX(4px);
    }
  }
`;
