import { createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  activeForm: string | null;
  formId: EntityId | null;
};

const initialState: FormState = {
  activeForm: null,
  formId: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formOpened(state, action: PayloadAction<FormState>) {
      state.activeForm = action.payload.activeForm;
      state.formId = action.payload.formId;
    },

    formClosed(state) {
      state.activeForm = null;
      state.formId = null;
    },
  },
});

export const { formOpened, formClosed } = formSlice.actions;
export default formSlice.reducer;
