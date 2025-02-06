import React, { useState } from "react";
import { sendRequest } from "../utils/apiClient";
// import { replaceEnvVariables } from "../utils/envHelper";
// import EnvironmentSettings from "./EnvironmentSettings";
import { Button, Input, Select, Tabs, TabsProps } from "antd";
import { SendHorizontal } from "lucide-react";
import AuthorizationSection from "./AuthorizationSection";
import { useAppSelector } from "../store/hooks";
import { apiKey, authType, bearerToken } from "../slices/authorization-slice";
import HeadersSection from "./HeadersSection";
import { headers } from "../slices/header-slice";

const RequestForm = ({ onResponse }: { onResponse: (res: any) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("{}");

  // for headers
  const _headers = useAppSelector(headers);

  // for authorization
  const _authType = useAppSelector(authType);
  const _apiKey = useAppSelector(apiKey);
  const _bearerToken = useAppSelector(bearerToken);

  const [file, setFile] = useState<File | null>(null);

  // const [envVars, setEnvVars] = useState<Record<string, string>>(() => {
  //   return JSON.parse(localStorage.getItem("envVars") || "{}");
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    let parsedHeaders = _headers ? JSON.parse(_headers) : {};
    let parsedBody = body ? JSON.parse(body) : {};

    // Add authentication headers based on selection
    if (_authType === "apiKey" && _apiKey) {
      parsedHeaders["Authorization"] = _apiKey;
    } else if (_authType === "bearer" && _bearerToken) {
      parsedHeaders["Authorization"] = `Bearer ${_bearerToken}`;
    }

    // If file is selected, send it using FormData
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      parsedBody = formData;
      parsedHeaders["Content-Type"] = "multipart/form-data";
    }

    const response = await sendRequest(method, url, parsedHeaders, parsedBody);

    onResponse(response);
    setIsLoading(false);
  };

  // const handleEnvVarsChange = (newEnvVars: Record<string, string>) => {
  //   setEnvVars(newEnvVars);
  //   localStorage.setItem("envVars", JSON.stringify(newEnvVars));
  // };

  const onChange = (key: string) => {
    console.log(key);
  };

  const methods = ["GET", "POST", "PUT", "DELETE"] as const;

  const methodOptions = methods.map((method) => ({
    label: method,
    value: method,
  }));

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Params",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Authorization",
      children: <AuthorizationSection />,
    },
    {
      key: "3",
      label: "Headers",
      children: <HeadersSection />,
    },
    {
      key: "4",
      label: "Body",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div className="space-y-6 p-[8px]">
      <form onSubmit={handleSubmit}>
        {/* Method & URL Input */}
        <div className="flex border p-2 border-gray-300 rounded-lg  items-center space-x-2 gap-[5px]">
          <Select
            defaultValue="GET"
            style={{ width: 120 }}
            value={method}
            onChange={(e) => setMethod(e)}
            options={methodOptions}
          />

          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="flex-grow p-2"
          />

          <div>
            <Button
              icon={<SendHorizontal size={16} strokeWidth={1} />}
              disabled={isLoading}
              htmlType="submit"
              loading={isLoading}
              color="primary"
              variant="solid"
            >
              Send
            </Button>
          </div>
        </div>

        {/* Tab Section */}
        <div className="space-y-2 space-x-2">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>

        {/* Body Input */}

        {method !== "GET" && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body (JSON format)"
            className="w-full p-2 border"
          />
        )}

        {/* File Upload Section */}
        {method !== "GET" && (
          <div>
            <label className="font-semibold">Upload File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 border"
            />
          </div>
        )}
      </form>

      {/* Environment Variables Section */}
      {/* <EnvironmentSettings onSave={handleEnvVarsChange} /> */}

      {/* Response Validation Section */}
    </div>
  );
};

export default RequestForm;
