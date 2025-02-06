import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  authType,
  setAuthType,
  apiKey,
  setApiKey,
  bearerToken,
  setBearerToken,
} from "../slices/authorization-slice";
import { authTypes } from "../model/authorizationType";

const AuthorizationSection = () => {
  const _authType = useAppSelector(authType);
  const _apiKey = useAppSelector(apiKey);
  const _bearerToken = useAppSelector(bearerToken);
  const dispatch = useAppDispatch();

  const _authTypes: authTypes[] = ["none", "apiKey", "bearer"];

  const authTypeOptions = _authTypes.map((authType) => ({
    label: authType,
    value: authType,
  }));

  return (
    <div className="space-y-2 space-x-2">
      <div className="flex max-[768px]:flex-col gap-2">
        <div className="flex flex-col gap-1 pr-2 max-[768px]:pb-4  border-r max-[768px]:border-r-[#fff] max-[768px]:border-b border-r-[#3F96FE] max-[768px]:border-b-[#3F96FE]">
          <label className="font-semibold">Auth Type:</label>
          <Select
            style={{ width: 200 }}
            value={_authType}
            onChange={(e) => dispatch(setAuthType(e))}
            options={authTypeOptions}
          />

          <p className="mt-2">
            The authorization header will be <br />
            automatically generated when you send the request.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {_authType !== "none" && (
            <p>
              Heads up! These parameters hold sensitive data. we recommend using
              variables.
            </p>
          )}

          {_authType === "none" && (
            <div className="flex justify-center items-center h-full">
              <p className="text-center">
                <strong>No auth </strong> <br />
                This request does not use any authorization.
              </p>
            </div>
          )}

          {_authType === "apiKey" && (
            <Input
              type="text"
              value={_apiKey}
              onChange={(e) => dispatch(setApiKey(e.target.value))}
              placeholder="Enter API Key"
              className="w-full p-2 border"
            />
          )}

          {_authType === "bearer" && (
            <Input
              type="text"
              value={_bearerToken}
              onChange={(e) => dispatch(setBearerToken(e.target.value))}
              placeholder="Enter Bearer Token"
              className="w-full p-2 border"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorizationSection;
