import { useState } from "react";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

const App = () => {
  const [response, setResponse] = useState(null);

  return (
    <div className="flex justify-center mx-auto p-2  h-[100dvh]">
      <div className="max-w-[1200px] w-[100%]">
        <h4 className="text-2xl font-bold">Mini Postman</h4>
        <div className="flex gap-[16px] mt-[32px]">
          <div className="w-full">
            <RequestForm onResponse={setResponse} />
          </div>
          <div className="w-full ">
            <ResponseViewer response={response} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
