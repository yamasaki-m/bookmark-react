import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { RootState } from "../../app/store";
import { selectAllTagValues } from "../card/cardSlice";
import { filterUpdated } from "./filterSlice";
import { respond } from "../../global-styles/media-query";
import Button from "../../common/components/UI/Button";
import Icon from "../../common/components/UI/Icon";
import Card from "../../common/components/UI/Card";
import FilterOptions from "./components/FilterOptions";

type FilterDropDownProps = {
  className?: string;
  allOptions: unknown[];
  onClick: () => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isDisplayAll: boolean;
  setDisplayAll: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: () => void;
  setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterDropDown: React.FC<FilterDropDownProps> = ({
  className,
  allOptions,
  onClick,
  onFormSubmit,
  isDisplayAll,
  setDisplayAll,
  onChange,
  setCheckedOptions,
}) => {
  return (
    <Card className={className} cardType="default">
      <Button
        className="close-button default plain-xs"
        type="button"
        onClick={onClick}
      >
        <Icon className="sm">close</Icon>
      </Button>

      <form className="form" onSubmit={(event) => onFormSubmit(event)}>
        <ul className="options-list">
          {allOptions.map((option: any) => (
            <FilterOptions
              option={option}
              isDisplayAll={isDisplayAll}
              setDisplayAll={setDisplayAll}
              setCheckedOptions={setCheckedOptions}
              key={option}
            />
          ))}

          <li className="options-list__item">
            <input
              id="all"
              className="options-list__input"
              type="checkbox"
              value="displayAll"
              checked={isDisplayAll}
              onChange={onChange}
            />
            <label className="options-list__label" htmlFor="all">
              すべて表示
            </label>
          </li>
        </ul>

        <Button className="primary circle-md" type="submit">
          <Icon className="md">check</Icon>
        </Button>
      </form>
    </Card>
  );
};

const StyledFilterDropDown = styled(FilterDropDown)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  border: 1px solid var(--color-gray-400);

  position: absolute;
  left: -69px;
  top: 44px;

  ${respond("tablet")} {
    left: 0px;
    top: 55px;
    text-align: left;
  }

  // 吹き出し装飾
  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    width: 1rem;
    height: 1rem;
    background: var(--color-white);
    transform: translateX(-50%) rotate(45deg);
    border-top: 1px solid var(--color-gray-400);
    border-left: 1px solid var(--color-gray-400);
  }

  .close-button {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .filter-dropdown {
    position: absolute;
    left: -80px;
    top: 44px;

    @include respond(tablet) {
      left: -69px;
      top: 55px;
      text-align: left;
    }
  }

  .description {
    max-width: 15rem;
    margin-top: var(--space-10);

    &__text {
      font-size: var(--text-sm);

      &--top {
        display: inline-block;
        margin-bottom: var(--space-6);
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .options-list {
    width: max-content;
    margin-bottom: var(--space-10);

    &__item {
      &:last-child {
        margin-top: var(--space-6);
      }
    }

    &__input {
      display: none;

      &:checked + .options-list__label::after {
        opacity: 1;
      }
    }

    &__label {
      display: inline-block;
      position: relative;
      width: auto;
      padding: 5px 30px;
      font-size: var(--text-sm);
      cursor: pointer;

      // チェックボックス
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 5px;
        height: 16px;
        width: 16px;
        margin-top: -8px;
        border: 1px solid var(--color-gray-400);
        border-radius: 5px;
        background: var(--color-white);
      }

      // チェックマーク
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: rotate(45deg);
        opacity: 0;
        width: 5px;
        height: 9px;
        margin-top: -7px;
        border-right: 2px solid var(--color-black);
        border-bottom: 2px solid var(--color-black);
      }
    }
  }
`;

const FilterDropDownContainer: React.FC<any> = ({ onToggleDropDownClick }) => {
  const dispatch = useDispatch();
  const allOptions = useSelector((state: RootState) =>
    selectAllTagValues(state)
  );
  const storedCheckedOptions = useSelector(
    (state: RootState) => state.filter.storedCheckedOptions
  );
  const [currentCheckedOptions, setCheckedOptions] = useState<string[]>([]);
  const [isDisplayAll, setDisplayAll] = useState(false);

  useEffect(() => {
    const isFiltered = storedCheckedOptions.length;
    setDisplayAll(!isFiltered);
  }, [storedCheckedOptions]);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    dispatch(filterUpdated(currentCheckedOptions));
    onToggleDropDownClick();
  };

  const handleChange = () => setDisplayAll((prevState) => !prevState);
  return (
    <StyledFilterDropDown
      allOptions={allOptions}
      isDisplayAll={isDisplayAll}
      setDisplayAll={setDisplayAll}
      setCheckedOptions={setCheckedOptions}
      onChange={handleChange}
      onClick={onToggleDropDownClick}
      onFormSubmit={handleFormSubmit}
    />
  );
};

export default FilterDropDownContainer;
