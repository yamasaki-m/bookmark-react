import React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  htmlFor?: string;
};

const BaseLabel = styled.label`
  display: inline-block;
  color: var(--color-gray-600);
  font-size: var(--text-sm);
  line-height: 1.1;
  transition: 0.3s var(--ease-out);
`;

const Label: React.FC<Props> = ({ className, htmlFor, children }) => {
  return (
    <BaseLabel className={className} htmlFor={htmlFor}>
      {children}
    </BaseLabel>
  );
};

export default Label;
