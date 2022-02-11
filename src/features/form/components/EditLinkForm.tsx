import React, { useEffect, useRef } from "react";

import { DynamicFormContext } from "../dynamicFormContext";
import ModalForm from "../../../common/components/UI/ModalForm";
import { MemoizedInputField } from "../../../common/components/UI/InputField";
import useInput from "../../../common/hooks/use-input";
import { useDispatch } from "react-redux";
import { linkEdited } from "../../card/cardSlice";

import { InputTypes } from "../../../types";

type EditLinkFormProps = {
  className?: string;
  linkTitle: InputTypes;
  linkURL: InputTypes;
  onFormSubmit: (event: React.FormEvent<HTMLInputElement>) => void;
  onCloseFormClick: () => void;
  linkTitleRef: HTMLInputElement;
};

const EditLinkForm: React.FC<EditLinkFormProps> = ({
  className,
  linkTitle,
  linkURL,
  linkTitleRef,
  onFormSubmit,
  onCloseFormClick,
}: any) => {
  return (
    <ModalForm
      className={className}
      title="リンク編集"
      onFormSubmit={onFormSubmit}
      onCloseFormClick={onCloseFormClick}
    >
      <MemoizedInputField
        isValid={linkTitle.isValid}
        isInvalid={linkTitle.isInvalid}
        message={linkTitle.message}
        onChange={linkTitle.handleChange}
        onBlur={linkTitle.handleBlur}
        value={linkTitle.value}
        name="linkTitle"
        label="リンクタイトル"
        type="text"
        placeholder="React"
        required
        ref={linkTitleRef}
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

const EditLinkFormContainer = () => {
  const dispatch = useDispatch();

  const { setValue: setTitle, ...linkTitle } = useInput("required");
  const { setValue: setURL, ...linkURL } = useInput("url");
  const { editTarget, hideForm } = React.useContext(DynamicFormContext);

  const onFormSubmit = (event: any) => {
    event.preventDefault();

    const link = {
      ...editTarget,
      title: linkTitle.value,
      URL: linkURL.value,
    };

    dispatch(linkEdited({ link }));
    hideForm();
  };

  const linkTitleRef: any = useRef(null);
  useEffect(() => {
    setTitle(editTarget.title);
    setURL(editTarget.URL);
    linkTitleRef && linkTitleRef.current.focus();
  }, [setTitle, setURL, editTarget.title, editTarget.URL]);

  return (
    <EditLinkForm
      linkTitle={linkTitle}
      linkURL={linkURL}
      linkTitleRef={linkTitleRef}
      onFormSubmit={onFormSubmit}
      onCloseFormClick={hideForm}
    />
  );
};

export default EditLinkFormContainer;
