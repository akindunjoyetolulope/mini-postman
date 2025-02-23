import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";
// const uniqueId = uuidv4();

interface UrlState {
  url: string;
  param: {
    id: string;
    checked: boolean;
    key: string;
    value: string;
    description: string;
  }[];
}

const initialState: UrlState = {
  url: "",
  param: [
    {
      id: uuidv4(),
      checked: false,
      key: "",
      value: "",
      description: "",
    },
  ],
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    checkQuery(state, action: PayloadAction<string>) {
      state.param = state.param.map((param) =>
        param.id === action.payload
          ? { ...param, checked: !param.checked }
          : param
      );
    },
    updateQuery(
      state,
      action: PayloadAction<{ id: string; value: { [key: string]: string } }>
    ) {
      state.param = state.param.map((param) =>
        param.id === action.payload.id
          ? { ...param, ...action.payload.value }
          : param
      );
    },
    addQueryField(state) {
      const lastInput = state.param[state.param.length - 1];
      if (
        lastInput.key.trim() !== "" ||
        lastInput.value.trim() !== "" ||
        lastInput.description.trim() !== ""
      ) {
        state.param.push({
          id: uuidv4(),
          checked: false,
          key: "",
          value: "",
          description: "",
        });
      }
    },
    removeQueryField(state, action: PayloadAction<string>) {
      state.param = state.param.filter((param) => param.id !== action.payload);
    },
  },
});

export const { setUrl } = urlSlice.actions;
export const url = (state: RootState) => state.url.url;
export const param = (state: RootState) => state.url.param;
export const { checkQuery, updateQuery, addQueryField, removeQueryField } =
  urlSlice.actions;

export default urlSlice.reducer;
