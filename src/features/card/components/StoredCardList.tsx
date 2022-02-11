import React from "react";

import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import styled from "styled-components";
import classNames from "classnames";

import { RootState } from "../../../app/store";
import { selectAllCardIds, selectFilteredCardIds } from "../cardSlice";
import { respond } from "../../../global-styles/media-query";
import Card from "../../../common/components/UI/Card";
import Icon from "../../../common/components/UI/Icon";
import CardListItem from "../components/StoredCardListItem";

type CardListProps = {
  className?: string;
  cardIds: EntityId[];
};
const CardList = React.memo<CardListProps>(({ className, cardIds }) => {
  return (
    <ul className={classNames("card-list", className)}>
      {cardIds.map((id: EntityId) => (
        <CardListItem cardId={id} key={id} />
      ))}

      <Link to="/create">
        <Card className="create-card" cardType="default">
          <span className="create-card__text">
            カードを作成<Icon className="sm">add</Icon>
          </span>
        </Card>
      </Link>
    </ul>
  );
});

const StyledCardList = styled(CardList)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 35rem);
  gap: var(--space-16);

  ${respond("tablet")} {
    grid-template-columns: repeat(2, 35rem);
    justify-content: space-around;
    gap: var(--space-20);
    max-width: 80rem;
    margin: 0 auto;
  }

  ${respond("phone")} {
    grid-template-columns: repeat(1, 35rem);
  }

  .card-list {
    &__item {
      &[draggable="true"] {
        cursor: move;
      }
    }
  }

  .create-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35rem;
    height: 35rem;
    opacity: 0.8;
    color: var(--color-black);
    transition: 0.25s var(--ease-out);

    &:hover {
      border-color: var(--color-gray-400);
      background-color: var(--color-gray-400);
      color: var(--color-white);
    }

    &__text {
      display: inline-flex;
      align-items: center;
      color: currentColor;
      font-size: var(--text-md);
    }

    &__icon {
      margin-left: var(--space-6);
      color: currentColor;
    }
  }
`;

const CardListContainer: React.FC = () => {
  const originalCardIds = useSelector(selectAllCardIds);
  const filteredCardIds = useSelector((state: RootState) =>
    selectFilteredCardIds(state)
  );

  const cardIds = filteredCardIds.length ? filteredCardIds : originalCardIds;
  return <StyledCardList cardIds={cardIds} />;
};

export default CardListContainer;
