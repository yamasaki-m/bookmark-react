import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import styled from "styled-components";
import classNames from "classnames";

import type { RootState } from "../../../app/store";
import {
  linkDeleted,
  countIncremented,
  selectLinkById,
} from "../../../features/card/cardSlice";
import { DynamicFormContext } from "../../form/dynamicFormContext";
import { respond } from "../../../global-styles/media-query";
import { LinkTypes } from "../../../types";
import Button from "../../../common/components/UI/Button";
import Icon from "../../../common/components/UI/Icon";

type LinkListItemContainerProps = {
  cardId: EntityId;
  linkId: EntityId;
};

type LinkListItemProps = {
  className?: string;
  cardId: EntityId;
  link: LinkTypes;
  actionsRef: any;
  showActionsBox?: any;
  hideActionsBox?: () => void;
  onClickOpenEditLinkForm?: any;
  onClickDeleteLink?: any;
  onClickLink?: any;
  counterRef?: any;
};

const LinkListItem = React.memo<LinkListItemProps>(
  ({
    className,
    cardId,
    link,
    counterRef,
    actionsRef,

    showActionsBox,
    hideActionsBox,
    onClickOpenEditLinkForm,
    onClickDeleteLink,
    onClickLink,
  }) => {
    const { id, title, URL, clickCount } = link;

    return (
      <li className={classNames(className, "link-list-item")} key={id}>
        <div className="link">
          <span className="link__counter" ref={counterRef}>
            {clickCount}
          </span>

          <a
            className="link__body"
            href={URL}
            target="blank"
            onClick={(event) =>
              onClickLink({ event, cardId, linkId: id, url: URL })
            }
          >
            <span className="link__title">{title}</span>
          </a>

          <Button
            className="link__show-actions-button default plain-sm"
            onClick={(event) => showActionsBox(event)}
          >
            <Icon className="md">more_vert</Icon>
          </Button>
        </div>

        <div className="actions" ref={actionsRef}>
          <div className="actions__body">
            <Button
              className="secondary circle-md"
              onClick={() => onClickDeleteLink({ cardId, linkId: id })}
            >
              <Icon className="md">delete</Icon>
            </Button>

            <Button
              className="secondary circle-md"
              onClick={() => onClickOpenEditLinkForm({ linkId: id })}
            >
              <Icon className="md">edit</Icon>
            </Button>
          </div>

          <Button className="default plain-xs" onClick={hideActionsBox}>
            <Icon className="md">chevron_right</Icon>
          </Button>
        </div>
      </li>
    );
  }
);

const StyledLinkListItem = styled(LinkListItem)`
  position: relative;

  .link {
    display: flex;
    align-items: center;
    padding: var(--space-6);
    border-radius: 100vh;
    transition: 0.25s var(--ease-out);

    &:hover {
      background-color: var(--color-gray-100);

      .link__show-actions-button {
        opacity: 1;
      }
    }

    &__counter {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      margin-right: var(--space-6);
      border-radius: 50%;
      background: var(--color-gray-300);
      color: var(--color-white);
      font-size: var(--text-sm);
      font-weight: bold;
      text-align: center;
      transition: 0.25s var(--ease-out);
    }

    &__body {
      display: flex;
      align-items: center;
      width: 22rem;
      color: var(--color-black);
      font-size: var(--text-md);
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: 0.25s var(--ease-out);
    }

    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__show-actions-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;

      &:hover {
        color: var(--color-gray-600);
      }

      ${respond("phone")} {
        opacity: 1;
      }
    }
  }

  .actions {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: var(--space-4) 0 var(--space-4) var(--space-6);
    border: 1px solid var(--color-gray-400);
    border-radius: 100vh;
    background: var(--color-white);
    line-height: 1;
    transition: all 0.25s var(--ease-out);

    &.show {
      opacity: 1;
      visibility: visible;
      pointer-events: initial;
      z-index: 10;

      .link__show-actions-button {
        display: none;
      }
    }

    &__body {
      display: flex;
      column-gap: var(--space-6);
    }

    &__icon {
      padding: var(--space-6);
      color: var(--color-gray-400);

      &:first-child {
        margin-right: var(--space-6);
      }
    }

    &__hide-button {
      font-size: 1.6rem;
      font-weight: bold;
      color: var(--color-gray-400);

      &:hover {
        color: var(--color-black);
      }
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
`;

const LinkListItemContainer: React.FC<LinkListItemContainerProps> = ({
  cardId,
  linkId,
}) => {
  const dispatch = useDispatch();

  const link: any = useSelector((state: RootState) =>
    selectLinkById(state, linkId)
  );
  const [showingBox, setShowingBox] = useState<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const { showForm, setEditTarget } = React.useContext(DynamicFormContext);

  const handleEditLinkClick = () => {
    showForm("EditLinkForm");
    setEditTarget(link);
    hideActionsBox();
  };

  const handleShowActionsClick = (event: any) => {
    showingBox && hideActionsBox();

    const box: any = actionsRef.current;
    box.classList.add("show");
    setShowingBox(box);
  };

  const hideActionsBox = () => {
    showingBox && showingBox.classList.remove("show");
    setShowingBox(null);
  };

  const onClickDeleteLink = ({ cardId, linkId }: any) => {
    dispatch(linkDeleted({ cardId, linkId }));
  };

  const onClickLink = ({ event, url, cardId, linkId }: any) => {
    event.preventDefault();
    // window.open(url, "_blank");

    dispatch(countIncremented({ linkId }));
  };

  const setCounterColor = (counter: HTMLSpanElement | null) => {
    if (!counter) return;

    const count: Number = Number(counter?.textContent);
    const colorIs = () => {
      if (count >= 10) {
        return "var(--color-red)";
      } else if (count >= 5) {
        return "var(--color-yellow)";
      } else if (count >= 3) {
        return "var(--color-green)";
      } else if (count >= 1) {
        return "var(--color-blue)";
      } else {
        return "var(--color-gray-300)";
      }
    };
    counter.style.backgroundColor = colorIs();
  };

  useEffect(() => {
    counterRef && setCounterColor(counterRef.current);
  }, [link]);

  return (
    <StyledLinkListItem
      cardId={cardId}
      link={link}
      actionsRef={actionsRef}
      counterRef={counterRef}
      onClickLink={onClickLink}
      onClickDeleteLink={onClickDeleteLink}
      onClickOpenEditLinkForm={handleEditLinkClick}
      showActionsBox={handleShowActionsClick}
      hideActionsBox={hideActionsBox}
    />
  );
};

export default LinkListItemContainer;
