import { Button } from "antd";
import { useState, useEffect } from "react";

const EnvironmentSettings = ({
  onSave,
}: {
  onSave: (env: Record<string, string>) => void;
}) => {
  const [envVars, setEnvVars] = useState<Record<string, string>>(() => {
    return JSON.parse(localStorage.getItem("envVars") || "{}");
  });

  useEffect(() => {
    localStorage.setItem("envVars", JSON.stringify(envVars));
  }, [envVars]);

  const handleAddVariable = () => {
    setEnvVars({ ...envVars, new_key: "" });
  };

  const handleChange = (key: string, value: string) => {
    const updatedVars = { ...envVars, [key]: value };
    setEnvVars(updatedVars);
    onSave(updatedVars);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">Environment Variables</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="flex space-x-2 mt-2">
          <input value={key} disabled className="p-2 border bg-gray-100" />
          <input
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="p-2 border"
          />
        </div>
      ))}

      <div className="mt-2">
        <Button onClick={handleAddVariable} loading={false}>
          Add Variable
        </Button>

        <div className="grid grid-cols-4 gap-4">
          <div>01</div>

          <div>09</div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSettings;
