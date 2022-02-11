import React from "react";

import { EntityId } from "@reduxjs/toolkit";
import styled from "styled-components";

import TagListItem from "./TagListItem";

type TagListContainerProps = {
  cardId: EntityId;
  tagIds: EntityId[];
};
type TagListProps = {
  className?: string;
} & TagListContainerProps;

const TagList: React.FC<TagListProps> = ({ className, cardId, tagIds }) => {
  return (
    <ul className={`${className}`}>
      {tagIds.map((tagId) => (
        <TagListItem cardId={cardId} tagId={tagId} key={tagId} />
      ))}
    </ul>
  );
};

const StyledTagList = styled(TagList)`
  display: flex;
  align-items: center;
  column-gap: var(--space-4);
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  .tag-list {
    &__tag {
      display: inline-flex;
      align-items: center;
      // height: 1.5rem;
      padding: var(--space-2) var(--space-4);
      border-radius: 100vh;
      background: var(--color-gray-200);
      color: var(--color-gray-900);
      font-size: var(--text-xs);
      line-height: 1;
      cursor: pointer;
      transition: 0.25s var(--ease-out);
    }

    &__delete-button {
      padding: 0 0.05rem 0 0.1rem;
      color: var(--color-gray-400);
      transition: 0.25s var(--ease-out);

      &:hover {
        color: var(--color-gray-900);
      }
    }

    &__icon {
      font-size: 1rem;
    }

    &::-webkit-scrollbar {
      height: 4px;
    }
  }
`;

const TagListContainer: React.FC<any> = ({ cardId, tagIds = [] }) => {
  return tagIds.length ? (
    <StyledTagList cardId={cardId} tagIds={tagIds} />
  ) : null;
};

export default TagListContainer;
