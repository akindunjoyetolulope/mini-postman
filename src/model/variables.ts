export interface VariableType {
  id: string;
  name: string;
  canNameChange: boolean;
  active?: boolean;
  variables: {
    variableId: string;
    checked: boolean;
    key: string;
    value: string;
    type: "default" | "secret";
  }[];
}
