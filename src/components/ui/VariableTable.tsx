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

export default function VariableTable() {
  const params = useAppSelector(param);
  const dispatch = useAppDispatch();

  const lastInputIndex = params.length - 1;

  return (
    <div>
      <h3 className="font-semibold mb-2">Query Params</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-red-500">
          <thead>
            <tr className="px-1 py-1">
              <th className="text-left font-medium border border-gray-300 min-w-[30px]">
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
              </th>
              <th className="text-left font-medium px-4 py-2 border border-gray-300 min-w-[150px]">
                Key
              </th>
              <th className="text-left font-medium px-4 py-2 border border-gray-300 min-w-[150px]">
                Value
              </th>
              <th className="text-left  font-medium px-4 py-2 border border-gray-300 min-w-[150px]">
                Description
              </th>
              <th className="text-right px-4 border border-gray-300 min-w-[150px]">
                <Button color="primary" disabled={true} variant="solid">
                  Bulk Edit
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {params.map((param, index) => (
              <tr key={param.id}>
                <td className="px-1 py-1 border-gray-300 border">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-center">
                      <Checkbox
                        name={`checked-${param.id}`}
                        checked={param.checked}
                        onChange={() => dispatch(checkQuery(param.id))}
                      />
                    </div>
                  ) : null}
                </td>
                <td className="px-1 py-1 border-gray-300 border">
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
                </td>
                <td className="px-1 py-1 border-gray-300 border">
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
                </td>
                <td className="px-1 py-1 border-gray-300 border">
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
                </td>
                <td className="px-4 py-1 border-gray-300 border">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
