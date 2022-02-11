import React, { useState } from "react";

import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import styled from "styled-components";
import classNames from "classnames";

import { RootState } from "../../../app/store";
import { selectCardById } from "../cardSlice";
import DynamicForm from "../../form/DynamicForm";
import Card from "../../../common/components/UI/Card";
import StoredCardListItemHeader from "./StoredCardListItemHeader";
import StoredCardListItemBody from "./StoredCardListItemBody";
import AddButton from "./StoredCardListItemAddButton";
import { CardTypes } from "../../../types";
import { DynamicFormContext } from "../../form/dynamicFormContext";

type CardItemContainerProps = {
  cardId: EntityId;
};

type CardItemProps = {
  className?: string;
  card?: CardTypes;
};

const CardItem = React.memo<CardItemProps>(
  ({ className, card = { id: "", tags: [], title: "noData", links: [] } }) => {
    const { id: cardId, tags, title, links } = card;

    return (
      <Card
        className={classNames(className, "bookmark-card")}
        cardType="default"
      >
        <StoredCardListItemHeader
          cardId={cardId}
          tagIds={tags}
          linkIds={links}
          title={title}
        />
        <StoredCardListItemBody cardId={cardId} linkIds={links} />
        <AddButton />
        <DynamicForm />
      </Card>
    );
  }
);

const StyledCardItem = styled(CardItem)`
  position: relative;
  width: 35rem;
  height: 35rem;
  transition: 0.3s var(--ease-out);
`;

const CardItemContainer = React.memo<CardItemContainerProps>(({ cardId }) => {
  const card: CardTypes | undefined = useSelector((state: RootState) => {
    return selectCardById(state, cardId);
  });
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<any>(null);

  const showForm = (activeForm: string) => {
    setActiveForm(activeForm);
  };

  const hideForm = () => {
    setActiveForm(null);
  };

  return (
    <DynamicFormContext.Provider
      value={{
        cardId,
        activeForm,
        editTarget,
        setEditTarget,
        showForm,
        hideForm,
      }}
    >
      <StyledCardItem card={card} />
    </DynamicFormContext.Provider>
  );
});

export default CardItemContainer;
