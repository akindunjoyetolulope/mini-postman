import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { ParamType } from "../model/url";
import {
  parseMalformedQueryString,
  toAddQueryString,
  toRemoveQueryString,
} from "../utils/helper";

interface UrlState {
  url: string;
  param: ParamType[];
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

      let parsedParams = parseMalformedQueryString(action.payload);
      let checkedParams = state.param.filter((param) => !param.checked);

      const mergedParams = [...parsedParams, ...checkedParams];

      state.param = [...mergedParams];
    },
    checkQuery(state, action: PayloadAction<string>) {
      state.param.forEach((param) => {
        if (param.id === action.payload) {
          state.url = param.checked
            ? toRemoveQueryString(state.url, param)
            : toAddQueryString(state.url, param);
        }
      });

      const paramIndex = state.param.findIndex((p) => p.id === action.payload);
      if (paramIndex !== -1) {
        state.param[paramIndex].checked = !state.param[paramIndex].checked;
      }
    },
    checkAllQuery(state, action: PayloadAction<boolean>) {
      state.param.forEach((param) => {
        state.url = action.payload
          ? toAddQueryString(state.url, param)
          : toRemoveQueryString(state.url, param);
      });

      state.param.forEach((param) => {
        param.checked = action.payload;
      });
    },
    updateQuery(
      state,
      action: PayloadAction<{ id: string; value: { [key: string]: string } }>
    ) {
      const paramToUpdate = state.param.find((p) => p.id === action.payload.id);
      if (paramToUpdate) {
        Object.assign(paramToUpdate, action.payload.value);
      }
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
export const {
  checkQuery,
  checkAllQuery,
  updateQuery,
  addQueryField,
  removeQueryField,
} = urlSlice.actions;

export default urlSlice.reducer;
