import React from "react";

import { EntityId } from "@reduxjs/toolkit";
import styled from "styled-components";

import { selectSortedLinkIds } from "../cardSlice";
import LinkListItem from "./LinkListItem";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

type LinkListContainerProps = {
  cardId: EntityId;
  linkIds: EntityId[];
};
type LinkListProps = {
  className?: string;
  cardId: EntityId;
  sortedLinkIds: EntityId[];
};

const LinkList: React.FC<LinkListProps> = ({
  className,
  cardId,
  sortedLinkIds,
}) => {
  return (
    <ul className={`${className} link-list`}>
      {sortedLinkIds.map((linkId: any) => (
        <LinkListItem cardId={cardId} linkId={linkId} key={linkId} />
      ))}
    </ul>
  );
};

const StyledLinkList = styled(LinkList)`
  max-height: 22.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--space-6) var(--space-6) var(--space-6) 0;
`;

const LinkListContainer: React.FC<LinkListContainerProps> = ({
  cardId,
  linkIds,
}) => {
  const sortedLinkIds = useSelector(
    (state: RootState) => selectSortedLinkIds(state, linkIds),
    shallowEqual
  );

  return <StyledLinkList cardId={cardId} sortedLinkIds={sortedLinkIds} />;
};

export default LinkListContainer;
