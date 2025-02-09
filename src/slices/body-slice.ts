import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface bodyState {
  body: string;
  file: File | null;
}

const initialState: bodyState = {
  body: "{}",
  file: null,
};

const bodySlice = createSlice({
  name: "body",
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setFile(state, action: PayloadAction<File | null>) {
      state.file = action.payload;
    },
  },
});

export const { setBody, setFile } = bodySlice.actions;
export const body = (state: RootState) => state.body.body;
export const file = (state: RootState) => state.body.file;

export default bodySlice.reducer;
