import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authTypes } from "../model/authorizationType";
import { RootState } from "../store/store";

interface AuthorizationState {
  authType: authTypes;
  apiKey: string;
  bearerToken: string;
}

const initialState: AuthorizationState = {
  authType: "none",
  apiKey: "",
  bearerToken: "",
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setAuthType(state, action: PayloadAction<authTypes>) {
      state.authType = action.payload;
    },
    setApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload;
    },
    setBearerToken(state, action: PayloadAction<string>) {
      state.bearerToken = action.payload;
    },
  },
});

export const { setAuthType, setApiKey, setBearerToken } =
  authorizationSlice.actions;
export const authType = (state: RootState) => state.authorization.authType;
export const apiKey = (state: RootState) => state.authorization.apiKey;
export const bearerToken = (state: RootState) =>
  state.authorization.bearerToken;
export default authorizationSlice.reducer;
