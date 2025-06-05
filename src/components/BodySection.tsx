import * as React from "react";
import { Input, Radio, RadioChangeEvent } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { body, setBody, setFile } from "../slices/body-slice";
import JsonEditor from "./ui/JsonEditor";

export default function BodySection() {
  const [value, setValue] = React.useState(1);
  const _body = useAppSelector(body);
  const dispatch = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="mb-2">
        <Radio.Group
          name="radiogroup"
          onChange={onChange}
          value={value}
          options={[
            { value: 1, label: "none" },
            { value: 2, label: "raw" },
            { value: 3, label: "form-data" },
            { value: 4, label: "x-www-from-urlencoded" },
          ]}
        />
      </div>

      {value === 2 && (
        <div className="mt-4">
          <Input.TextArea
            value={_body}
            onChange={(e) => dispatch(setBody(e.target.value))}
            placeholder="Body (JSON format)"
            className="w-full p-2 border"
          />
        </div>
      )}

      {value === 1 && (
        <div className="text-center mt-4">
          This request does not have a body
        </div>
      )}

      {/* File Upload Section */}

      {value === 3 && (
        <div className="mt-4">
          <label className="font-semibold mb-2">Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border"
          />
        </div>
      )}

      <JsonEditor />
    </div>
  );
}
