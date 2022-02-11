import React from "react";

import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { DynamicFormContext } from "../dynamicFormContext";
import { linkAdded } from "../../card/cardSlice";
import ModalForm from "../../../common/components/UI/ModalForm";
import { MemoizedInputField } from "../../../common/components/UI/InputField";
import useInput from "../../../common/hooks/use-input";
import { InputTypes } from "../../../types";

type AddLinkFormProps = {
  linkTitle: InputTypes;
  linkURL: InputTypes;
  onFormSubmit: (event: React.FormEvent<HTMLInputElement>) => void;
  onCloseFormClick: () => void;
};

const AddLinkForm: React.FC<AddLinkFormProps> = ({
  linkTitle,
  linkURL,
  onFormSubmit,
  onCloseFormClick,
}) => {
  return (
    <ModalForm
      title={"リンク追加"}
      onFormSubmit={onFormSubmit}
      onCloseFormClick={onCloseFormClick}
    >
      <MemoizedInputField
        value={linkTitle.value}
        isValid={linkTitle.isValid}
        isValidating={linkTitle.isValidating}
        message={linkTitle.message}
        id="linkTitle"
        type="text"
        placeholder="React"
        required
        label="リンクタイトル"
        onChange={linkTitle.handleChange}
        onBlur={linkTitle.handleBlur}
      />
      <MemoizedInputField
        value={linkURL.value}
        isValid={linkURL.isValid}
        isValidating={linkURL.isValidating}
        message={linkURL.message}
        id="linkURL"
        type="url"
        placeholder="https://ja.reactjs.org/"
        required
        label="リンクURL"
        onChange={linkURL.handleChange}
        onBlur={linkURL.handleBlur}
      />
    </ModalForm>
  );
};

const AddLinkFormContainer = () => {
  const dispatch = useDispatch();

  const linkTitle = useInput("required");
  const linkURL = useInput("url");
  const { cardId, hideForm } = React.useContext(DynamicFormContext);

  const handleFormSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const link = {
      id: nanoid(),
      title: linkTitle.value,
      URL: linkURL.value,
      clickCount: 0,
    };

    dispatch(linkAdded({ cardId, link }));
    hideForm();
  };

  return (
    <AddLinkForm
      linkTitle={linkTitle}
      linkURL={linkURL}
      onFormSubmit={handleFormSubmit}
      onCloseFormClick={hideForm}
    />
  );
};

export default AddLinkFormContainer;
