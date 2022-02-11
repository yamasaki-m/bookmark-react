import React, { forwardRef } from "react";

import styled from "styled-components";
import classNames from "classnames";

import Label from "../UI/Label";

type InputFieldProps = {
  className: string;
  value: string;
  isValidating: boolean;
  isValid: boolean;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  label: string;
  message: string;
  onChange: () => void;
  onBlur: () => void;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      value,
      isValidating,
      isValid,
      id,
      type = "text",
      placeholder = "",
      required,
      label,
      message = "",

      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div
        className={classNames(className, "input-field", {
          valid: isValid,
          invalid: isValidating && !isValid,
        })}
      >
        <Label className="input-field__label" htmlFor={id}>
          {label}
        </Label>
        <input
          className="input-field__input"
          value={value}
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        />
        <p className="input-field__message">{message}</p>
      </div>
    );
  }
);

const StyledInputField = styled(InputField)`
  .input-field {
    &__input {
      width: 100%;
      padding: var(--space-6) var(--space-6);
      border-radius: 4px;
      border: 2px solid var(--color-gray-200);
      background: var(--color-white);
      color: var(--color-gray-900);
      font-family: inherit;
      font-size: var(--text-md);
      transition: border-color 0.3s;

      &:focus {
        border-color: var(--color-gray-400);
      }

      ::placeholder {
        color: var(--color-gray-200);
      }
    }

    &__message {
      opacity: 0;
      font-size: var(--text-sm);
      transition: 0.3s var(--ease-out);
    }
  }

  &.valid {
    .input-field {
      &__label {
        color: var(--color-green);
      }
      &__input {
        border-color: var(--color-green);
      }
    }
  }

  &.invalid {
    .input-field {
      &__label {
        color: var(--color-red);
        animation: shake 0.41s cubic-bezier(0.36, 0.07, 0.19, 0.97);
      }
      &__input {
        border-color: var(--color-red);
      }
      &__message {
        opacity: 1;
        color: var(--color-red);
      }
    }
  }
`;

const InputFieldContainer = forwardRef((props: any, ref: any) => {
  return <StyledInputField {...props} ref={ref} />;
});

export default InputFieldContainer;

export const MemoizedInputField = React.memo(
  forwardRef((props: any, ref: any) => (
    <InputFieldContainer {...props} ref={ref} />
  ))
);
