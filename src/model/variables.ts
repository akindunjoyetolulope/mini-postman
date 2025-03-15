export interface VariableType {
  id: string;
  checked: boolean;
  key: string;
  value: string;
  type: "default" | "secret";
}
