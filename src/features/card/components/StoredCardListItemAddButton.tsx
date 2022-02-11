import React from "react";

import styled from "styled-components";

import { DynamicFormContext } from "../../form/dynamicFormContext";
import Button from "../../../common/components/UI/Button";
import Icon from "../../../common/components/UI/Icon";

type AddButtonProps = {
  className?: string;
  onShowFormClick: any;
};

const AddButton = React.memo<AddButtonProps>(
  ({ className, onShowFormClick }) => {
    return (
      <div className={className}>
        <Button
          className="accent circle-lg"
          onClick={() => onShowFormClick("AddLinkForm")}
        >
          <Icon className="xl">add</Icon>
        </Button>
      </div>
    );
  }
);

const StyledAddButton = styled(AddButton)`
  position: absolute;
  bottom: var(--space-10);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-10);
  border-radius: 50%;
`;

const AddButtonContainer = React.memo(() => {
  const { showForm } = React.useContext(DynamicFormContext);

  return <StyledAddButton onShowFormClick={showForm} />;
});

export default AddButtonContainer;
