import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Checkbox, Input } from "antd";
import { Trash2 } from "lucide-react";

interface Value {
  key: string;
  value: string;
  description: string;
}

export default function VariableTable() {
  const uniqueId = uuidv4();

  const [inputs, setInputs] = React.useState([
    {
      id: uniqueId,
      checked: false,
      value: {
        key: "",
        value: "",
        description: "",
      },
    },
  ]);

  React.useEffect(() => {
    const lastInput = inputs[inputs.length - 1];
    if (
      lastInput.value.key.trim() !== "" ||
      lastInput.value.value.trim() !== "" ||
      lastInput.value.description.trim() !== ""
    ) {
      setInputs((prev) => [
        ...prev,
        {
          id: uniqueId,
          checked: false,
          value: {
            key: "",
            value: "",
            description: "",
          },
        },
      ]);
    }
  }, [inputs]);

  const handleInputChange = (id: string, newValue: Value) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  const removeInputField = (id: string) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
  };

  const checkInputFieldRow = (id: string) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, checked: !input.checked } : input
      )
    );
  };

  const lastInputIndex = inputs.length - 1;

  return (
    <div>
      <h3 className="font-semibold mb-2">Query Params</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-red-500">
          <thead>
            <tr className="px-1 py-1">
              <th className="text-left font-medium border border-gray-300 min-w-[30px]">
                {inputs.length !== 1 ? (
                  <div className="flex justify-center">
                    <Checkbox />
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
              <th className="text-right px-4 py-2 border border-gray-300 min-w-[150px]">
                <button type="button">Bulk Edit</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((input, index) => (
              <tr key={input.id}>
                <td className="px-1 py-1 border-gray-300 border">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-center">
                      <Checkbox
                        checked={input.checked}
                        onChange={() => checkInputFieldRow(input.id)}
                      />
                    </div>
                  ) : null}
                </td>
                <td className="px-1 py-1 border-gray-300 border">
                  <Input
                    key={input.id}
                    value={input.value.key}
                    className="variable-input"
                    placeholder="Key"
                    onChange={(e) =>
                      handleInputChange(input.id, {
                        ...input.value,
                        key: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="px-1 py-1 border-gray-300 border">
                  <Input
                    value={input.value.value}
                    className="variable-input"
                    placeholder="Value"
                    onChange={(e) =>
                      handleInputChange(input.id, {
                        ...input.value,
                        value: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="px-1 py-1 border-gray-300 border">
                  <Input
                    className="variable-input"
                    value={input.value.description}
                    placeholder="Description"
                    onChange={(e) =>
                      handleInputChange(input.id, {
                        ...input.value,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="px-4 py-1 border-gray-300 border">
                  {lastInputIndex !== index ? (
                    <div className="flex justify-end">
                      <button type="button">
                        <Trash2
                          size={20}
                          strokeWidth={1}
                          onClick={() => removeInputField(input.id)}
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
