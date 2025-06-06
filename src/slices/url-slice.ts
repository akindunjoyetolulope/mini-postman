import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { ParamType } from "../model/url";
import {
  filterUncheckedParams,
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

      let checkedParams = parseMalformedQueryString(action.payload);
      let unCheckedParams = state.param.filter((param) => !param.checked);
      let updateParams = filterUncheckedParams(checkedParams, unCheckedParams);

      const mergedParams = [...checkedParams, ...updateParams];

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
          ? action.payload !== param.checked
            ? toAddQueryString(state.url, param)
            : state.url
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

        const checkedParams = state.param.filter((param) => param.checked);
        const queryStart = state.url.indexOf("?");
        const base = state.url.slice(0, queryStart);

        state.url =
          checkedParams.length > 0
            ? `${base}?${checkedParams
                .map((p) => `${p.key}=${p.value}`)
                .join("&")}`
            : state.url;
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
      state.param.forEach((param) => {
        if (param.id === action.payload) {
          state.url = toRemoveQueryString(state.url, param);
        }
      });

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
