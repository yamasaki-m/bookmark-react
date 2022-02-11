import React from "react";

import styled from "styled-components";

import { DynamicFormContext } from "./dynamicFormContext";
import AddTagForm from "./components/AddTagForm";
import AddLinkForm from "./components/AddLinkForm";
import EditLinkForm from "./components/EditLinkForm";

type DynamicFormProps = {
  className?: string;
  activeForm: string;
};

const DynamicForm = React.memo(
  ({ className, activeForm }: DynamicFormProps) => {
    const forms: any = {
      AddTagForm,
      AddLinkForm,
      EditLinkForm,
    };
    const TheForm = forms[activeForm];

    return activeForm ? (
      <div className={className}>
        <div className="overlay" />
        <div className="forms">
          <TheForm />
        </div>
      </div>
    ) : null;
  }
);

const StyledDynamicForm = styled(DynamicForm)`
  .forms {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 336px;
    margin: var(--space-6);
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35rem;
    height: 35rem;
    border-radius: 8px;
    background: var(--overlay-light);
  }
`;

const DynamicFormContainer: React.FC = () => {
  const { activeForm } = React.useContext(DynamicFormContext);

  return <StyledDynamicForm activeForm={activeForm} />;
};

export default DynamicFormContainer;
