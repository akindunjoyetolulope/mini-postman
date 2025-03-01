import React, { useState } from "react";
import { sendRequest } from "../utils/apiClient";
// import { replaceEnvVariables } from "../utils/envHelper";
// import EnvironmentSettings from "./EnvironmentSettings";
import { Button, Input, Select, Tabs, TabsProps } from "antd";
import { SendHorizontal } from "lucide-react";
import AuthorizationSection from "./AuthorizationSection";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { apiKey, authType, bearerToken } from "../slices/authorization-slice";
import HeadersSection from "./HeadersSection";
import { headers } from "../slices/header-slice";
import VariableTable from "./ui/VariableTable";
import { methodType, setMethodType } from "../slices/method-slice";
import { methodTypes } from "../model/methodType";
import BodySection from "./BodySection";
import { body, file } from "../slices/body-slice";
import { setUrl, url } from "../slices/url-slice";
import CustomDiv from "./ui/CustomDiv";

const RequestForm = ({ onResponse }: { onResponse: (res: any) => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  // for url
  const _url = useAppSelector(url);

  // for body
  const _body = useAppSelector(body);
  const _file = useAppSelector(file);

  // for method
  const _methodType = useAppSelector(methodType);

  // for headers
  const _headers = useAppSelector(headers);

  // for authorization
  const _authType = useAppSelector(authType);
  const _apiKey = useAppSelector(apiKey);
  const _bearerToken = useAppSelector(bearerToken);

  // const [file, setFile] = useState<File | null>(null);

  // const [envVars, setEnvVars] = useState<Record<string, string>>(() => {
  //   return JSON.parse(localStorage.getItem("envVars") || "{}");
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    let parsedHeaders = _headers ? JSON.parse(_headers) : {};
    let parsedBody = _body ? JSON.parse(_body) : {};

    // Add authentication headers based on selection
    if (_authType === "apiKey" && _apiKey) {
      parsedHeaders["Authorization"] = _apiKey;
    } else if (_authType === "bearer" && _bearerToken) {
      parsedHeaders["Authorization"] = `Bearer ${_bearerToken}`;
    }

    // If file is selected, send it using FormData
    if (_file) {
      const formData = new FormData();
      formData.append("file", _file);
      parsedBody = formData;
      parsedHeaders["Content-Type"] = "multipart/form-data";
    }

    const response = await sendRequest(
      _methodType,
      _url,
      parsedHeaders,
      parsedBody
    );

    onResponse(response);
    setIsLoading(false);
  };

  // const handleEnvVarsChange = (newEnvVars: Record<string, string>) => {
  //   setEnvVars(newEnvVars);
  //   localStorage.setItem("envVars", JSON.stringify(newEnvVars));
  // };

  const handleUrlChange = (newUrl: string) => {
    dispatch(setUrl(newUrl));
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const _methodsTypes: methodTypes[] = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  const methodOptions = _methodsTypes.map((methodType) => ({
    label: methodType,
    value: methodType,
  }));

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Params",
      children: <VariableTable />,
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
      children: <BodySection />,
    },
  ];

  return (
    <div className="space-y-6 p-[8px]">
      <form onSubmit={handleSubmit}>
        {/* Method & URL Input */}
        <CustomDiv className="flex p-2 rounded-lg  items-center space-x-2 gap-[5px]">
          <Select
            style={{ width: 120 }}
            dropdownStyle={{ width: 100 }}
            value={_methodType}
            onChange={(e) => dispatch(setMethodType(e))}
            options={methodOptions}
          />

          <Input
            value={_url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Enter API URL"
            className="flex-grow p-2"
          />

          <div>
            <Button
              icon={<SendHorizontal size={16} strokeWidth={1} />}
              disabled={!_url}
              htmlType="submit"
              loading={isLoading}
              color="primary"
              variant="solid"
            >
              Send
            </Button>
          </div>
        </CustomDiv>

        {/* Tab Section */}
        <div className="space-y-2 space-x-2">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </form>

      {/* Environment Variables Section */}
      {/* <EnvironmentSettings onSave={handleEnvVarsChange} /> */}

      {/* Response Validation Section */}
    </div>
  );
};

export default RequestForm;
