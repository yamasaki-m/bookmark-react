import React from "react";

export const DynamicFormContext = React.createContext<any>({
  activeForm: null,
  cardId: null,
  showForm: null,
  hideForm: null,

  editTarget: null,
  setEditTarget: null,
});
