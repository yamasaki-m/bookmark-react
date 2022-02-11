import React, { useMemo, ReactNode } from "react";

import styled from "styled-components";

import Icon from "./Icon";
import Button from "./Button";
import Card from "./Card";

type ModalFormProps = {
  children: ReactNode;
  className?: string;
  title: string;
  onCloseFormClick: () => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const ModalForm: React.FC<ModalFormProps> = ({
  children,
  className,
  title,
  onCloseFormClick,
  onFormSubmit,
}) => {
  const MemoizedCloseButton = useMemo(() => {
    return (
      <Button
        className="modal-form__close-button default plain-xs"
        onClick={onCloseFormClick}
      >
        <Icon className="md">close</Icon>
      </Button>
    );
  }, [onCloseFormClick]);

  const MemoizedSubmitButton = useMemo(() => {
    return (
      <Button
        className="primary circle-lg modal-form__submit-button"
        type="submit"
      >
        <Icon className="lg">check</Icon>
      </Button>
    );
  }, []);

  return (
    <Card className={`${className} modal-form`} cardType="default">
      {MemoizedCloseButton}

      <h2 className="modal-form__title">{title}</h2>

      <form
        className="modal-form__body"
        onSubmit={(event) => onFormSubmit(event)}
      >
        {children}

        {MemoizedSubmitButton}
      </form>
    </Card>
  );
};

const StyledModalForm = styled(ModalForm)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: var(--space-16);

  .modal-form {
    &__close-button {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    &__title {
      font-size: var(--text-md);
      line-height: 1;
      letter-spacing: 0.05em;
    }

    &__body {
      display: flex;
      flex-direction: column;
      row-gap: var(--space-10);
    }

    &__submit-button {
      align-self: center;
    }
  }
`;

const ModalFormContainer = (props: any) => {
  return <StyledModalForm {...props} />;
};

export default ModalFormContainer;
