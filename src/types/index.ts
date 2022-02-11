import { EntityId } from "@reduxjs/toolkit";
import React from "react";

export type ButtonTypes = {
  children?: any;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export type InputTypes = {
  value: string;
  isValidating: boolean;
  isValid: boolean;
  message: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
};

export type CardTypes = {
  id: EntityId;
  index?: any;
  title: string;
  tags?: EntityId[];
  links: EntityId[];
};

export type LinkTypes = {
  id: EntityId;
  title: string;
  URL: string;
  clickCount: any;
};
