import React from "react";

import { EntityId } from "@reduxjs/toolkit";

import LinkList from "../components/LinkList";

type ContainerProps = {
  cardId: EntityId;
  linkIds: EntityId[];
};
type presentationalProps = {} & ContainerProps;

const StoredCardListItemBody: React.FC<presentationalProps> = ({
  cardId,
  linkIds,
}) => {
  return <LinkList cardId={cardId} linkIds={linkIds} />;
};

const StoredCardListItemBodyContainer: React.FC<ContainerProps> = ({
  cardId,
  linkIds,
}) => {
  return <StoredCardListItemBody cardId={cardId} linkIds={linkIds} />;
};

export default StoredCardListItemBodyContainer;
