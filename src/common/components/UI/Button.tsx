import React from "react";
import styled from "styled-components";

import { ButtonTypes } from "../../../types/index";

type ButtonProps = {
  className?: string;
} & ButtonTypes;

const BaseButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  transition: 0.25s var(--ease-out);
  cursor: pointer;

  &.rounded {
    &-md {
      border-radius: 100vh;
      min-width: 15rem;
      min-height: 4rem;
      padding: var(--space-10) var(--space-16);
      font-size: var(--text-md);
    }

    &-sm {
      border-radius: 100vh;
      min-width: 125px;
      min-height: 35px;
      padding: var(--space-10);
      font-size: var(--text-sm);
    }

    &-xs {
      border-radius: 100vh;
      padding: var(--space-2) var(--space-6);
    }
  }

  &.circle {
    border-radius: 50%;
    &-lg {
      border-radius: 50%;
      padding: var(--space-10);
    }

    &-md {
      border-radius: 50%;
      padding: var(--space-8);
    }
  }

  &.plain {
    &-md {
      padding: var(--space-8);
    }

    &-sm {
      padding: var(--space-6);
    }

    &-xs {
      padding: var(--space-1);
    }
  }

  // テーマ
  &.primary {
    background: var(--color-black);
    color: var(--color-white);
    font-weight: 600;

    &:hover {
      background: var(--color-gray-600);
    }
  }

  &.secondary {
    background: var(--color-white);
    color: var(--color-gray-400);
    box-shadow: inset 0px 0px 0px 1px var(--border-gray);

    &:hover {
      background: var(--color-black);
      color: var(--color-white);
    }
  }

  &.accent {
    background: var(--color-white);
    color: var(--color-black);
    box-shadow: inset 0px 0px 0px 2px var(--color-black);

    &:hover {
      background: var(--color-black);
      color: var(--color-white);
    }
  }

  &.tertiary {
    box-shadow: inset 0px 0px 0px 1px var(--border-gray);
    color: var(--color-gray-400);
    font-weight: 600;

    &:hover {
      box-shadow: inset 0px 0px 0px 1px currentColor;
      color: var(--color-gray-600);
    }
  }

  &.default {
    color: var(--color-gray-400);

    &:hover {
      color: var(--color-gray-600);
    }
  }

  &:disabled,
  &:disabled:hover {
    background-color: var(--color-gray-200);
    color: var(--color-gray-400);
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  return <BaseButton {...props}>{props.children}</BaseButton>;
};

export default Button;

export const MemoizedButton = React.memo<ButtonProps>(Button);
