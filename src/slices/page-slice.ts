import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { pageTypes } from "../model/pageType";

interface PageState {
  page: pageTypes;
}

const initialState: PageState = {
  page: "Environment",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageType(state, action: PayloadAction<pageTypes>) {
      state.page = action.payload;
    },
  },
});

export const { setPageType } = pageSlice.actions;
export const pageType = (state: RootState) => state.page.page;

export default pageSlice.reducer;
