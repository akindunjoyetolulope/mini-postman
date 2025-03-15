import { Checkbox, Input, Select } from "antd";
import { ThemedTd, ThemedTh } from "./CustomTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addVariableField,
  checkVariableField,
  removeVariableField,
  updateVariable,
  filterVariable,
  variables,
} from "../../slices/variable-slice";
import { Ellipsis, Search, Trash2 } from "lucide-react";

export default function VariableTable() {
  const _variables = useAppSelector(variables);
  const dispatch = useAppDispatch();

  const lastInputIndex = _variables.length - 1;

  return (
    <div>
      <div className="w-[250px] my-2">
        <Input
          prefix={<Search size={20} strokeWidth={1} />}
          placeholder="Filter variable"
          onChange={(e) => dispatch(filterVariable(e.target.value))}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="px-1 py-1">
              <ThemedTh className="text-left font-medium  min-w-[30px]">
                {/* {params.length !== 1 ? (
                <div className="flex justify-center">
                  <Checkbox
                    name="checked"
                    // checked={params.every((param) => param.checked)}
                    // onChange={(e) =>
                    //   dispatch(checkAllQuery(e.target.checked))
                    // }
                  />
                </div>
              ) : null} */}
              </ThemedTh>
              <ThemedTh className="text-left font-medium px-4 py-2  min-w-[150px]">
                Variable
              </ThemedTh>
              <ThemedTh className="text-left font-medium px-4 py-2  min-w-[150px]">
                Type
              </ThemedTh>
              <ThemedTh className="text-left  font-medium px-4 py-2  min-w-[150px]">
                Value
              </ThemedTh>
              <ThemedTh className="text-right px-4  min-w-[150px]">
                <div className="flex justify-end cursor-pointer">
                  <Ellipsis />
                </div>
              </ThemedTh>
            </tr>
          </thead>
          <tbody>
            {_variables.map((variable, index) => (
              <tr key={variable.id}>
                <ThemedTd className="px-1 py-1 ">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-center">
                      <Checkbox
                        name={`checked-${variable.id}`}
                        checked={variable.checked}
                        onChange={() =>
                          dispatch(checkVariableField(variable.id))
                        }
                      />
                    </div>
                  ) : null}
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Input
                    key={variable.id}
                    value={variable.key}
                    className="variable-input"
                    placeholder="add new variable"
                    name={`key-${variable.id}`}
                    onChange={(e) => {
                      dispatch(
                        updateVariable({
                          id: variable.id,
                          value: { key: e.target.value },
                        })
                      );
                      dispatch(addVariableField());
                    }}
                  />
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Select
                    className="variable-input"
                    style={{ width: "100%" }}
                    value={variable.type}
                    onChange={(e) =>
                      dispatch(
                        updateVariable({
                          id: variable.id,
                          value: { type: e },
                        })
                      )
                    }
                    options={[
                      {
                        label: "Default",
                        value: "default",
                      },
                      {
                        label: "Secret",
                        value: "secret",
                      },
                    ]}
                  />
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Input
                    className="variable-input"
                    value={variable.value}
                    placeholder="variable value"
                    name={`value-${variable.id}`}
                    onChange={(e) => {
                      dispatch(
                        updateVariable({
                          id: variable.id,
                          value: { value: e.target.value },
                        })
                      );
                      dispatch(addVariableField());
                    }}
                  />
                </ThemedTd>
                <ThemedTd className="px-4 py-1 ">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-end">
                      <button type="button">
                        <Trash2
                          size={20}
                          strokeWidth={1}
                          onClick={() =>
                            dispatch(removeVariableField(variable.id))
                          }
                        />
                      </button>
                    </div>
                  ) : null}
                </ThemedTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
