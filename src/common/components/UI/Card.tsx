import React from "react";
import styled from "styled-components";

type CardProps = {
  cardType: "default" | "narrow";
  className?: string;
};
type ComponentProps = {
  className?: string;
};

const BaseCard = styled.div`
  padding: var(--space-20);
  border: 1px solid var(--border-gray);
  border-radius: 8px;
  background: var(--color-white);
`;

const NarrowCard = styled(BaseCard)`
  padding: var(--space-32);
`;

const cardStyleLists: { [key: string]: React.FC } = {
  default: BaseCard,
  narrow: NarrowCard,
};

const Card: React.FC<CardProps> = ({ cardType, className, children }) => {
  const Component: React.FC<ComponentProps> = cardStyleLists[cardType];

  return <Component className={className}> {children} </Component>;
};

export default Card;
