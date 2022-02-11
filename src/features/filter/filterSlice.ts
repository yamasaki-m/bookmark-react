import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterState = {
  storedCheckedOptions: string[];
};
const initialState: FilterState = {
  storedCheckedOptions: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterUpdated(state, action: PayloadAction<string[]>) {
      state.storedCheckedOptions = Array.from(new Set(action.payload));
    },
  },
});

export const { filterUpdated } = filterSlice.actions;

export default filterSlice.reducer;
