import React from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import type { RootState } from "../../../app/store";
import { toggleTheme } from "../../theme/themeSlice";
import classNames from "classnames";

type ToggleSwitchContainerProps = {
  className?: string;
};

type ToggleSwitchProps = {
  isOn: boolean;
  onClick: () => void;
} & ToggleSwitchContainerProps;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  className,
  isOn,
  onClick,
}) => {
  return (
    <div
      className={classNames(className, "container", { "is-on": isOn })}
      onClick={onClick}
    >
      <motion.div layout className="handle">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.i
            className="material-icons-outlined mode-icon"
            key={isOn ? "moon" : "sun"}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOn ? "dark_mode" : "light_mode"}
          </motion.i>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const StyledToggleSwitch = styled(ToggleSwitch)`
  justify-content: flex-start;
  height: 40px;
  width: 100px;
  background-color: var(--color-gray-300);
  border-radius: 25px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.3s;

  &.is-on {
    justify-content: flex-end;
  }

  .handle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: grid;
    align-items: center;
    justify-items: center;
    background-color: var(--color-white);
    overflow: hidden;
  }

  .mode-icon {
    color: var(--color-gray-600);
    font-size: var(--text-lg);
  }
`;

const ToggleSwitchContainer: React.FC<ToggleSwitchContainerProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.themeMode.theme);
  const isOn = theme === "dark";

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <StyledToggleSwitch
      className={className}
      isOn={isOn}
      onClick={handleClick}
    />
  );
};

export default ToggleSwitchContainer;
