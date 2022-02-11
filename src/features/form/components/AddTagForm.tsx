import React from "react";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { DynamicFormContext } from "../dynamicFormContext";
import { tagAdded } from "../../card/cardSlice";
import ModalForm from "../../../common/components/UI/ModalForm";
import { MemoizedInputField } from "../../../common/components/UI/InputField";
import useInput from "../../../common/hooks/use-input";
import { InputTypes } from "../../../types";

type AddTagFormProps = {
  tagValue: InputTypes;
  onFormSubmit: (event: React.FormEvent<HTMLInputElement>) => void;
  onCloseFormClick: () => void;
};

const AddTagForm: React.FC<AddTagFormProps> = ({
  tagValue,
  onFormSubmit,
  onCloseFormClick,
}: any) => {
  return (
    <ModalForm
      title={"タグ追加"}
      onFormSubmit={onFormSubmit}
      onCloseFormClick={onCloseFormClick}
    >
      <MemoizedInputField
        value={tagValue.value}
        isValid={tagValue.isValid}
        isValidating={tagValue.isValidating}
        message={tagValue.message}
        id="tagValue"
        type="text"
        placeholder="プログラミング"
        required
        label="タグ名"
        onChange={tagValue.handleChange}
        onBlur={tagValue.handleBlur}
      />
    </ModalForm>
  );
};

const AddTagFormContainer = () => {
  const dispatch = useDispatch();

  const tagValue = useInput("required");

  const { cardId, hideForm } = React.useContext(DynamicFormContext);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const tag = {
      id: nanoid(),
      tag: tagValue.value,
    };

    dispatch(tagAdded({ cardId, tag }));
    hideForm();
  };

  return (
    <AddTagForm
      tagValue={tagValue}
      onFormSubmit={handleFormSubmit}
      onCloseFormClick={hideForm}
    />
  );
};

export default AddTagFormContainer;
