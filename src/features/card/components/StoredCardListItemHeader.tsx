import React from "react";

import { useDispatch } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import styled from "styled-components";

import { DynamicFormContext } from "../../form/dynamicFormContext";
import {
  deleteCard,
  linkDeleted,
  tagDeleted,
} from "../../../features/card/cardSlice";
import { respond } from "../../../global-styles/media-query";
import Button from "../../../common/components/UI/Button";
import Icon from "../../../common/components/UI/Icon";
import TagList from "./TagList";

type ContainerProps = {
  cardId: EntityId;
  title?: string;
  tagIds?: EntityId[];
  linkIds?: EntityId[];
};

type PresentationalProps = {
  className?: string;
  onDeleteCardClick?: any;
  onShowFormClick?: any;
} & ContainerProps;

const StoredCardListItemHeader: React.FC<PresentationalProps> = ({
  className,
  cardId,
  title,
  tagIds,
  onDeleteCardClick,
  onShowFormClick,
}) => {
  return (
    <header className={className}>
      <div className="tags">
        <Button
          className="rounded-xs secondary"
          onClick={() => onShowFormClick("AddTagForm")}
        >
          <Icon className="sm">sell</Icon>
          <span className="tags__icon-text">+</span>
        </Button>
        {tagIds ? <TagList cardId={cardId} tagIds={tagIds} /> : null}
      </div>

      <div className="title">
        <div className="title__body">
          <h3 className="title__text">{title}</h3>
        </div>

        <Button className="circle-md secondary" onClick={onDeleteCardClick}>
          <Icon className="md">delete</Icon>
        </Button>
      </div>
    </header>
  );
};

const StyledStoredCardListItemHeader = styled(StoredCardListItemHeader)`
  .tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: nowrap;
    column-gap: var(--space-6);
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &__add-button {
      margin-right: var(--space-10);
      padding: 0 0.25rem;
      border: 1px solid var(--color-gray-400);
      border-radius: 100vh;
      background: var(--color-white);
      color: var(--color-gray-600);
      font-family: inherit;
      font-size: var(--text-xs);
      transition: 0.25s var(--ease-out);

      &:hover {
        background: var(--color-black);
        color: var(--color-white);
      }
    }

    &__icon-text {
      font-size: 1.2rem;
    }
  }

  // タイトル
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-gray-200);

    &__body {
      display: flex;
      align-items: flex-end;
      min-width: 25rem;
      margin-top: var(--space-4);
      line-height: 1;
      transition: 0.25s var(--ease-out);

      &:hover {
        .title__edit-button {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    &__text {
      max-width: 24rem;
      color: var(--color-black);
      font-size: var(--text-lg);
      font-weight: bold;
      line-height: 1.1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__edit-button {
      opacity: 0;
      visibility: hidden;
      margin-left: var(--space-6);

      ${respond("phone")} {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const StoredCardListItemHeaderContainer: React.FC<ContainerProps> = ({
  cardId,
  title,
  tagIds,
  linkIds,
}: any) => {
  const dispatch = useDispatch();

  const { showForm } = React.useContext(DynamicFormContext);

  const handleDeleteCardClick = async () => {
    linkIds?.map((linkId: any) => dispatch(linkDeleted({ cardId, linkId })));
    tagIds?.map((tagId: any) => dispatch(tagDeleted({ cardId, tagId })));
    dispatch(await deleteCard(cardId));
  };

  return (
    <StyledStoredCardListItemHeader
      cardId={cardId}
      title={title}
      tagIds={tagIds}
      onDeleteCardClick={handleDeleteCardClick}
      onShowFormClick={showForm}
    />
  );
};

export default StoredCardListItemHeaderContainer;
