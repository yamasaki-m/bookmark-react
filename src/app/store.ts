import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import cardReducer from "../features/card/cardSlice";
import formReducer from "../features/form/dynamicFormSlice";
import filterReducer from "../features/filter/filterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    themeMode: themeReducer,
    card: cardReducer,
    form: formReducer,
    filter: filterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
