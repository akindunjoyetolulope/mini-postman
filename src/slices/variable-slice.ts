import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { VariableType } from "../model/variables";
import { v4 as uuidv4 } from "uuid";

interface VariableState {
  variable: VariableType[];
}

const initialState: VariableState = {
  variable: [
    {
      id: uuidv4(),
      checked: false,
      key: "",
      value: "",
      type: "default",
    },
  ],
};

const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setVariable(state, action: PayloadAction<VariableState["variable"]>) {
      state.variable = action.payload;
    },
    updateVariable(
      state,
      action: PayloadAction<{ id: string; value: { [key: string]: string } }>
    ) {
      const variableIndex = state.variable.find(
        (variable) => variable.id === action.payload.id
      );
      if (variableIndex) {
        state.variable = state.variable.map((variable) =>
          variable.id === action.payload.id
            ? { ...variable, ...action.payload.value }
            : variable
        );
      }
    },
    addVariableField(state) {
      const lastInput = state.variable[state.variable.length - 1];
      if (lastInput.key.trim() !== "" || lastInput.value.trim() !== "") {
        state.variable.push({
          id: uuidv4(),
          checked: false,
          key: "",
          value: "",
          type: "default",
        });
      }
    },
    removeVariableField(state, action: PayloadAction<string>) {
      state.variable = state.variable.filter(
        (variable) => variable.id !== action.payload
      );
    },
    checkVariableField(state, action: PayloadAction<string>) {
      const variableIndex = state.variable.findIndex(
        (variable) => variable.id === action.payload
      );
      if (variableIndex !== -1) {
        state.variable[variableIndex].checked =
          !state.variable[variableIndex].checked;
      }
    },
    filterVariable(state, action: PayloadAction<string>) {
      state.variable = state.variable.filter(
        (variable) =>
          variable.key.includes(action.payload.trim()) ||
          variable.value.includes(action.payload.trim())
      );
    },
  },
});

export const { setVariable } = variableSlice.actions;
export const variables = (state: RootState) => state.variables.variable;
export const {
  addVariableField,
  updateVariable,
  removeVariableField,
  checkVariableField,
  filterVariable,
} = variableSlice.actions;

export default variableSlice.reducer;
