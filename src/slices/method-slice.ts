import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { methodTypes } from "../model/methodType";

interface MethodState {
  method: methodTypes;
}

const initialState: MethodState = {
  method: "GET",
};

const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethodType(state, action: PayloadAction<methodTypes>) {
      state.method = action.payload;
    },
  },
});

export const { setMethodType } = methodSlice.actions;
export const methodType = (state: RootState) => state.method.method;

export default methodSlice.reducer;
