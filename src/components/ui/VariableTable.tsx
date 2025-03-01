import { Button, Checkbox, Input } from "antd";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  param,
  checkQuery,
  updateQuery,
  addQueryField,
  removeQueryField,
  // checkAllQuery,
} from "../../slices/url-slice";
import { ThemedTd, ThemedTh } from "./CustomTable";

export default function VariableTable() {
  const params = useAppSelector(param);
  const dispatch = useAppDispatch();

  const lastInputIndex = params.length - 1;

  return (
    <div>
      <h3 className="font-semibold mb-2">Query Params</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="px-1 py-1">
              <ThemedTh className="text-left font-medium  min-w-[30px]">
                {params.length !== 1 ? (
                  <div className="flex justify-center">
                    <Checkbox
                      name="checked"
                      // checked={params.every((param) => param.checked)}
                      // onChange={(e) =>
                      //   dispatch(checkAllQuery(e.target.checked))
                      // }
                    />
                  </div>
                ) : null}
              </ThemedTh>
              <ThemedTh className="text-left font-medium px-4 py-2  min-w-[150px]">
                Key
              </ThemedTh>
              <ThemedTh className="text-left font-medium px-4 py-2  min-w-[150px]">
                Value
              </ThemedTh>
              <ThemedTh className="text-left  font-medium px-4 py-2  min-w-[150px]">
                Description
              </ThemedTh>
              <ThemedTh className="text-right px-4  min-w-[150px]">
                <Button color="primary" disabled={true} variant="solid">
                  Bulk Edit
                </Button>
              </ThemedTh>
            </tr>
          </thead>
          <tbody>
            {params.map((param, index) => (
              <tr key={param.id}>
                <ThemedTd className="px-1 py-1 ">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-center">
                      <Checkbox
                        name={`checked-${param.id}`}
                        checked={param.checked}
                        onChange={() => dispatch(checkQuery(param.id))}
                      />
                    </div>
                  ) : null}
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Input
                    key={param.id}
                    value={param.key}
                    className="variable-input"
                    placeholder="Key"
                    name={`key-${param.id}`}
                    onChange={(e) => {
                      dispatch(
                        updateQuery({
                          id: param.id,
                          value: { key: e.target.value },
                        })
                      );
                      dispatch(addQueryField());
                    }}
                  />
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Input
                    value={param.value}
                    className="variable-input"
                    placeholder="Value"
                    name={`value-${param.id}`}
                    onChange={(e) => {
                      dispatch(
                        updateQuery({
                          id: param.id,
                          value: { value: e.target.value },
                        })
                      );
                      dispatch(addQueryField());
                    }}
                  />
                </ThemedTd>
                <ThemedTd className="px-1 py-1 ">
                  <Input
                    className="variable-input"
                    value={param.description}
                    placeholder="Description"
                    name={`description-${param.id}`}
                    onChange={(e) => {
                      dispatch(
                        updateQuery({
                          id: param.id,
                          value: { description: e.target.value },
                        })
                      );
                      dispatch(addQueryField());
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
                          onClick={() => dispatch(removeQueryField(param.id))}
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
