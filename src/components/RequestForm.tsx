import React, { useState } from "react";
import { sendRequest } from "../utils/apiClient"; // Assume this handles API calls
import { replaceEnvVariables } from "../utils/envHelper"; // Helper to replace env variables in strings
import EnvironmentSettings from "./EnvironmentSettings"; // Component for managing environment variables
import Button from "./ui/Button";

const RequestForm = ({ onResponse }: { onResponse: (res: any) => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("{}");
  const [authType, setAuthType] = useState("none");
  const [apiKey, setApiKey] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [envVars, setEnvVars] = useState<Record<string, string>>(() => {
    return JSON.parse(localStorage.getItem("envVars") || "{}");
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    // Replace environment variables in URL, headers, and body
    const processedUrl = replaceEnvVariables(url, envVars);
    const processedHeaders = replaceEnvVariables(headers, envVars);
    const processedBody = replaceEnvVariables(body, envVars);

    let parsedHeaders = processedHeaders ? JSON.parse(processedHeaders) : {};
    let parsedBody = processedBody ? JSON.parse(processedBody) : {};

    // Add authentication headers based on selection
    if (authType === "apiKey" && apiKey) {
      parsedHeaders["Authorization"] = apiKey;
    } else if (authType === "bearer" && bearerToken) {
      parsedHeaders["Authorization"] = `Bearer ${bearerToken}`;
    }

    // If file is selected, send it using FormData
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      parsedBody = formData;
      parsedHeaders["Content-Type"] = "multipart/form-data";
    }

    // Send the request
    const apiResponse = await sendRequest(
      method,
      processedUrl,
      parsedHeaders,
      parsedBody
    );

    onResponse(apiResponse);
    setIsLoading(false);
  };

  const handleEnvVarsChange = (newEnvVars: Record<string, string>) => {
    setEnvVars(newEnvVars);
    localStorage.setItem("envVars", JSON.stringify(newEnvVars));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
        {/* Method & URL Input */}
        <div className="flex space-x-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2 border"
          >
            {["GET", "POST", "PUT", "DELETE"].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
            className="flex-grow p-2 border"
          />
          <Button
            disable={isLoading}
            onClick={() => {}}
            type="submit"
            text="Send"
            isLoading={isLoading}
          />
        </div>

        {/* Authentication Section */}
        <div className="space-y-2">
          <label className="font-semibold">Authentication:</label>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="p-2 border w-full"
          >
            <option value="none">None</option>
            <option value="apiKey">API Key</option>
            <option value="bearer">Bearer Token</option>
          </select>

          {authType === "apiKey" && (
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              className="w-full p-2 border"
            />
          )}

          {authType === "bearer" && (
            <input
              type="text"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Enter Bearer Token"
              className="w-full p-2 border"
            />
          )}
        </div>

        {/* Headers & Body Input */}
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder="Headers (JSON format)"
          className="w-full p-2 border"
        />
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
      <EnvironmentSettings onSave={handleEnvVarsChange} />

      {/* Response Validation Section */}
    </div>
  );
};

export default RequestForm;
