import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Dispatch, RootState } from "../../app/store";

type ThemeState = {
  theme: string;
};
const initialState: ThemeState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    themeLoaded(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },

    themeToggled(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { themeLoaded, themeToggled } = themeSlice.actions;
export default themeSlice.reducer;

export const loadTheme = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const theme = localStorage.getItem("theme") || "light";
    renderTheme(theme);
    dispatch(themeLoaded(theme));
  };
};

export const toggleTheme = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(themeToggled());
    const theme = getState().themeMode.theme;
    localStorage.setItem("theme", theme);
    renderTheme(theme);
  };
};

const renderTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.setAttribute("theme-mode", "dark");
  } else {
    document.documentElement.setAttribute("theme-mode", "light");
  }

  window.matchMedia("(prefers-color-scheme: dark)").addListener((event) => {
    if (event.matches) {
      document.documentElement.setAttribute("theme-mode", "dark");
    } else {
      document.documentElement.setAttribute("theme-mode", "light");
    }
  });
};
