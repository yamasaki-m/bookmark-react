import React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
};

const BaseIcon = styled.span`
  display: inline-block;
  color: inherit;
  line-height: 1;
  cursor: inherit;

  &.xl {
    font-size: 2.2rem;
  }

  &.lg {
    font-size: 2rem;
  }

  &.md {
    font-size: 1.8rem;
  }

  &.sm {
    font-size: 1.6rem;
  }

  &.xs {
    font-size: 1rem;
  }
`;

const Icon: React.FC<Props> = (props) => {
  return (
    <BaseIcon {...props} className={`material-icons ${props.className}`}>
      {props.children}
    </BaseIcon>
  );
};

export default Icon;

export const MemoizedIcon = React.memo<Props>(Icon);
