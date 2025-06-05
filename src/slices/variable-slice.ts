import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { VariableType } from "../model/variables";
import { v4 as uuidv4 } from "uuid";

interface VariableState {
  variables: VariableType[];
  activeVariable: string;
}

const initialState: VariableState = {
  activeVariable: "global88b1-4b7d-8f7d-1c1d1d",
  variables: [
    {
      id: "global88b1-4b7d-8f7d-1c1d1d",
      name: "Global Variables",
      canNameChange: false,
      variables: [
        {
          variableId: uuidv4(),
          checked: false,
          key: "",
          value: "",
          type: "default",
        },
      ],
    },
    {
      id: uuidv4(),
      name: "New Environment",
      canNameChange: true,
      active: false,
      variables: [
        {
          variableId: uuidv4(),
          checked: false,
          key: "",
          value: "",
          type: "default",
        },
      ],
    },
  ],
};

const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    setActiveVariable(state, action: PayloadAction<string>) {
      state.activeVariable = action.payload;
    },
    setVariable(state, action: PayloadAction<VariableState["variables"]>) {
      state.variables = action.payload;
    },
    updateVariable(
      state,
      action: PayloadAction<{ id: string; value: { [key: string]: string } }>
    ) {
      const variableIndex = state.variables.findIndex(
        (variable) => variable.id === state.activeVariable
      );
      const _variable = state.variables.find(
        (v) => v.id === state.activeVariable
      );
      if (_variable) {
        const variableFieldIndex = _variable.variables.findIndex(
          (variable) => variable.variableId === action.payload.id
        );
        if (variableFieldIndex !== -1) {
          state.variables[variableIndex].variables[variableFieldIndex] = {
            ...state.variables[variableIndex].variables[variableFieldIndex],
            ...action.payload.value,
          };
        }
      }
    },
    addVariableField(state) {
      const variableIndex = state.variables.findIndex(
        (variable) => variable.id === state.activeVariable
      );
      const _variable = state.variables.find(
        (v) => v.id === state.activeVariable
      );

      if (_variable) {
        const lastInput = _variable.variables[_variable.variables.length - 1];
        if (lastInput.key.trim() !== "" || lastInput.value.trim() !== "") {
          state.variables[variableIndex].variables.push({
            variableId: uuidv4(),
            checked: false,
            key: "",
            value: "",
            type: "default",
          });
        }
      }
    },
    addVariable(state) {
      state.variables.push({
        id: uuidv4(),
        name: "New Environment",
        canNameChange: true,
        variables: [
          {
            variableId: uuidv4(),
            checked: false,
            key: "",
            value: "",
            type: "default",
          },
        ],
      });
    },
    removeVariableField(state, action: PayloadAction<string>) {
      const variableIndex = state.variables.findIndex(
        (variable) => variable.id === state.activeVariable
      );
      const _variable = state.variables.find(
        (v) => v.id === state.activeVariable
      );
      if (_variable) {
        state.variables[variableIndex].variables = _variable.variables.filter(
          (variable) => variable.variableId !== action.payload
        );
      }
    },
    checkVariableField(state, action: PayloadAction<string>) {
      const variableIndex = state.variables.findIndex(
        (variable) => variable.id === state.activeVariable
      );
      const _variable = state.variables.find(
        (v) => v.id === state.activeVariable
      );
      if (_variable) {
        const variableFieldIndex = _variable.variables.findIndex(
          (variable) => variable.variableId === action.payload
        );
        if (variableFieldIndex !== -1) {
          state.variables[variableIndex].variables[variableFieldIndex].checked =
            !state.variables[variableIndex].variables[variableFieldIndex]
              .checked;
        }
      }
    },
    setActiveEnvironment(state, action: PayloadAction<string>) {
      state.variables = state.variables.map((variable) => {
        if (variable.id === action.payload) {
          return {
            ...variable,
            active: !variable.active,
          };
        }
        return {
          ...variable,
          active: false,
        };
      });
    },
  },
});

export const { setVariable } = variableSlice.actions;
export const variables = (state: RootState) => state.variables.variables;
export const activeVariable = (state: RootState) =>
  state.variables.activeVariable;
export const {
  addVariableField,
  updateVariable,
  removeVariableField,
  setActiveVariable,
  checkVariableField,
  setActiveEnvironment,
  addVariable,
} = variableSlice.actions;

export default variableSlice.reducer;
