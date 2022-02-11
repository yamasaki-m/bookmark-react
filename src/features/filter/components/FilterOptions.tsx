import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

type FilterOptionsProps = {
  option: string;
  isDisplayAll: boolean;
  setDisplayAll: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  option,
  isDisplayAll,
  setDisplayAll,
  setCheckedOptions,
}) => {
  const [checked, setChecked] = useState(false);
  isDisplayAll && checked && setChecked(false);
  const currentCheckedOptions = useSelector(
    (state: RootState) => state.filter.storedCheckedOptions
  );

  const handleChange = () => {
    setChecked(!checked);
    setDisplayAll(false);
  };

  useEffect(() => {
    const isChecked = currentCheckedOptions.includes(option);
    setChecked(isChecked);
  }, [option, setChecked, currentCheckedOptions]);

  useEffect(() => {
    if (checked) {
      setCheckedOptions((prev: any) => [...prev, option]);
    } else {
      setCheckedOptions((prevOptions: any) =>
        prevOptions.filter((prevOption: any) => prevOption !== option)
      );
    }
  }, [checked, setCheckedOptions, option]);

  return (
    <li className="options-list__item" key={option}>
      <input
        className="options-list__input"
        id={option}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label className="options-list__label" htmlFor={option}>
        {option}
      </label>
    </li>
  );
};

export default FilterOptions;
