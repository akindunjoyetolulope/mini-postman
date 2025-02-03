import ReactJson from "react-json-view";

const ResponseViewer = ({ response }: { response: any }) => {
  if (!response) return null;

  return (
    <div className="p-4 border rounded-lg h-[90dvh] overflow-auto">
      <h3 className="font-bold">Response</h3>
      {response.error ? (
        <div className="text-red-500">{response.error}</div>
      ) : (
        <>
          <p>
            <strong>Status:</strong> {response.status}
          </p>
          <ReactJson
            src={response.data}
            collapseStringsAfterLength={40}
            theme="monokai"
          />
        </>
      )}
    </div>
  );
};

export default ResponseViewer;
