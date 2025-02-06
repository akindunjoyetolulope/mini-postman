import { headers, setHeaders } from "../slices/header-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Input } from "antd";

const { TextArea } = Input;

export default function HeadersSection() {
  const _headers = useAppSelector(headers);
  const dispatch = useAppDispatch();

  return (
    <div>
      <TextArea
        value={_headers}
        onChange={(e) => dispatch(setHeaders(e.target.value))}
        placeholder="Headers (JSON format)"
        className="w-full p-2 border"
      />
    </div>
  );
}
