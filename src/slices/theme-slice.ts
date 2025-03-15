import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { themeTypes } from "../model/themeType";

interface ThemeState {
  theme: themeTypes;
}

const initialState: ThemeState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<themeTypes>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const themeType = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
