import ReactJson from "react-json-view";
import CustomDiv from "./ui/CustomDiv";

const ResponseViewer = ({ response }: { response: any }) => {
  if (!response)
    return (
      <div className="p-[8px]">
        <h3 className="font-bold">Response</h3>
      </div>
    );

  return (
    <div className="p-[8px]">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold">Response</h3>
        </div>
        <div>
          {response.error ? (
            <div className="text-red-500">{response.error}</div>
          ) : (
            <p>
              <strong>Status:</strong> {response.status}
            </p>
          )}
        </div>
      </div>

      <CustomDiv className="p-4 border rounded-lg h-[50dvh] overflow-auto bg-[#272822]">
        {!response.error && (
          <ReactJson
            src={response.data}
            collapseStringsAfterLength={40}
            theme="monokai"
          />
        )}
      </CustomDiv>
    </div>
  );
};

export default ResponseViewer;
