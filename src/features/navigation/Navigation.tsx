import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import type { RootState } from "../../app/store";
import { respond } from "../../global-styles/media-query";
import { toggleTheme } from "../theme/themeSlice";
import { logout } from "../auth/authSlice";
import Button from "../../common/components/UI/Button";
import Icon from "../../common/components/UI/Icon";
import FilterDropDown from "../filter/FilterDropDown";

type ContainerProps = {
  className?: string;
};
type PresentationalProps = {
  theme: string;
  isShowDropDown: Boolean;
  location: any;

  onToggleDropDownClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onToggleThemeClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogoutClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ContainerProps;

const Navigation: React.FC<PresentationalProps> = ({
  className,
  location,
  theme,
  isShowDropDown,

  onToggleDropDownClick,
  onToggleThemeClick,
  onLogoutClick,
}) => {
  const navRef = React.useRef(null);

  return (
    <CSSTransition
      in={location.pathname !== "/auth"}
      timeout={0}
      unmountOnExit
      classNames="alert"
      nodeRef={navRef}
    >
      <nav className={className} id="navigation" ref={navRef}>
        <div className="tabs">
          <NavLink
            className="tabs__link"
            activeClassName="active"
            to="/home"
            exact
          >
            カードリスト
          </NavLink>

          <NavLink className="tabs__link" activeClassName="active" to="/create">
            カードを作成
          </NavLink>
        </div>

        {location.pathname === "/home" && (
          <ul className="actions-list">
            <li className="actions-list__item">
              <Button
                className="secondary circle-md"
                onClick={onToggleThemeClick}
              >
                <Icon className="md">
                  {theme === "light" ? "dark_mode" : "light_mode"}
                </Icon>
              </Button>
              <span className="actions-list__text">モード</span>
            </li>

            <li className="actions-list__item">
              <Button
                className="secondary circle-md"
                onClick={onToggleDropDownClick}
              >
                <Icon className="md">filter_alt</Icon>
              </Button>
              <span className="actions-list__text">タグで絞る</span>

              {isShowDropDown ? (
                <FilterDropDown onToggleDropDownClick={onToggleDropDownClick} />
              ) : null}
            </li>

            <li className="actions-list__item actions-list__item--logout">
              <Button className="secondary circle-lg" onClick={onLogoutClick}>
                <Icon className="lg">logout</Icon>
              </Button>
              <span className="actions-list__text">ログアウト</span>
            </li>
          </ul>
        )}
      </nav>
    </CSSTransition>
  );
};

const StyledNavigation = styled(Navigation)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  max-height: 6rem;
  width: 100%;
  padding: var(--space-10);
  background: var(--color-base);
  border-bottom: 1px solid var(--color-gray-200);

  /* transition: 0.25s var(--ease-out); */

  ${respond("tablet")} {
    flex-direction: column;
    row-gap: var(--space-16);
    max-height: max-content;
  }

  &.hide {
    transform: translateX(-50%) translateY(-100%);
  }

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: max-content;

    &__link {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--space-6) var(--space-16);
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 100vh;
      background: var(--color-white);
      color: var(--color-gray-300);
      font-size: var(--text-md);
      font-weight: bold;
      transition: 0.25s var(--ease-out);

      &:hover {
        color: var(--color-gray-600);
      }

      &:first-child {
        margin-right: var(--space-6);
        border-radius: 100vh 0 0 100vh;
      }

      &:last-child {
        border-radius: 0 100vh 100vh 0;
      }

      &.active {
        border-color: currentColor;
        color: var(--color-black);
        pointer-events: none;
      }
    }
  }

  .actions-list {
    display: flex;
    align-items: center;
    position: absolute;
    right: 7%;

    ${respond("tablet")} {
      position: initial;
      justify-content: space-around;
      column-gap: var(--space-10);
    }

    ${respond("phone")} {
      column-gap: 0;
    }

    &__item {
      position: relative;

      ${respond("tablet")} {
        text-align: center;
        flex: 5.5rem 1 0;

        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &:not(:last-child) {
        margin-right: var(--space-10);

        ${respond("tablet")} {
          margin-right: 0;
        }
      }

      &--logout {
        margin-left: var(--space-6);

        ${respond("tablet")} {
          margin-left: 0;

          .base-button.size-lg {
            // padding: 0.6rem;
            font-size: 1.8rem;
          }
        }
      }
    }

    &__icon {
      &.filter-dropdown {
        &.disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      }
    }

    &__text {
      display: none;

      ${respond("tablet")} {
        display: inline-block;
        font-size: 1rem;
        margin-top: var(--space-2);
      }
    }

    &__period-counter {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 3.4rem;
      height: 3.4rem;
      border: 1px solid var(--border-gray);
      border-radius: 50%;
      padding: 0.6rem;
      background: var(--color-white);
      color: var(--color-gray-400);
      font-size: var(--text-sm);
      font-weight: bold;
      transition: 0.25s var(--ease-out);
      cursor: pointer;

      &:hover {
        border-color: var(--color-black);
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
`;

const NavigationContainer: React.FC<ContainerProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const theme = useSelector((state: RootState) => state.themeMode.theme);
  const onToggleThemeClick = () => {
    dispatch(toggleTheme());
  };

  const onLogoutClick = () => {
    dispatch(logout());
    history.replace("/auth");
  };

  const [isShowDropDown, setShowDropDown] = useState(false);

  const handleToggleDropDownClick = () => {
    setShowDropDown((isShowDropDown) => !isShowDropDown);
  };

  return (
    <StyledNavigation
      location={location}
      theme={theme}
      isShowDropDown={isShowDropDown}
      onToggleDropDownClick={handleToggleDropDownClick}
      onToggleThemeClick={onToggleThemeClick}
      onLogoutClick={onLogoutClick}
    />
  );
};

export default NavigationContainer;
