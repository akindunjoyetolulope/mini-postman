import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface HeadersState {
  headers: string;
}

const initialState: HeadersState = {
  headers: "{}",
};

const headersSlice = createSlice({
  name: "headers",
  initialState,
  reducers: {
    setHeaders(state, action: PayloadAction<string>) {
      state.headers = action.payload;
    },
  },
});

export const { setHeaders } = headersSlice.actions;
export const headers = (state: RootState) => state.headers.headers;

export default headersSlice.reducer;
