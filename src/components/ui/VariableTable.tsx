import * as React from "react";
import { Checkbox, Input } from "antd";
import "./variableTable.css";
import { Trash2 } from "lucide-react";

interface Value {
  key: string;
  value: string;
  description: string;
}

// interface Props {
//   title: string;
// }

export default function VariableTable() {
  const [inputs, setInputs] = React.useState([
    {
      id: 1,
      value: {
        key: "",
        value: "",
        description: "",
      },
    },
  ]);

  const handleInputChange = (id: number, newValue: Value) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  React.useEffect(() => {
    const lastInput = inputs[inputs.length - 1];
    if (
      (lastInput.value.key.trim() !== "" ||
        lastInput.value.value.trim() !== "" ||
        lastInput.value.description.trim() !== "") &&
      inputs.length > 1
    ) {
      setInputs((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          value: {
            key: "",
            value: "",
            description: "",
          },
        },
      ]);
    }
  }, [inputs]);

  //   const addInputField = () => {
  //     setInputs((prev) => [
  //       ...prev,
  //       {
  //         id: prev.length + 1,
  //         value: {
  //           key: "",
  //           value: "",
  //           description: "",
  //         },
  //       },
  //     ]);
  //   };

  return (
    <div>
      <h3 className="font-semibold mb-2">Query Params</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-red-500">
          <thead>
            <tr className="px-1 py-1">
              <th className="text-left font-medium border border-gray-300">
                <div className="flex justify-center">
                  <Checkbox />
                </div>
              </th>
              <th className="text-left font-medium px-4 py-2 border border-gray-300">
                Key
              </th>
              <th className="text-left font-medium px-4 py-2 border border-gray-300">
                Value
              </th>
              <th className="text-left  font-medium px-4 py-2 border border-gray-300">
                Description
              </th>
              <th className="text-right px-4 py-2 border border-gray-300">
                <button type="button">Bulk Edit</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((input) => (
              <tr key={input.id}>
                <td className="px-1 py-1 border-gray-300 border">
                  <div className="flex justify-center">
                    {/* {(input.value.key ||
                      input.value.value ||
                      input.value.description) && } */}
                    <Checkbox />
                  </div>
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
                  <div className="flex justify-end">
                    <button type="button">
                      <Trash2 size={20} strokeWidth={1} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
