import * as React from "react";

import ResponseViewer from "../components/ResponseViewer";
import RequestForm from "../components/RequestForm";

import { Layout, Splitter } from "antd";
import { getScreenWidth } from "../utils/helper";
import { Boxes, Vault } from "lucide-react";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [response, setResponse] = React.useState(null);

  return (
    <Layout className="!min-h-[100dvh]">
      <Sider
        collapsible
        trigger={null}
        width={`${getScreenWidth() > 1024 ? "100px" : "50px"}`}
        className="!bg-[#272822]"
        defaultCollapsed={false}
      >
        <div className="mt-[72px]">
          <div className="flex flex-col gap-5 p-[8px] text-white">
            <div className="flex flex-col justify-center items-center p-4">
              <Boxes size={20} strokeWidth={1} />
              <p className="text-[10px]">Collections</p>
            </div>
            <div className="flex flex-col justify-center items-center p-4 bg-[#3C3D38] rounded-[8px]">
              <Vault size={24} strokeWidth={1} />
              <p className="text-[10px]">Environments</p>
            </div>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header className="p-0 !bg-[#fff]" />
        <Content className="m-[8px] !bg-[#fff] rounded-lg !h-[calc(100dvh-200px)]">
          <Splitter
            className="h-full"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          >
            {getScreenWidth() > 1024 && (
              <Splitter.Panel defaultSize="20%" min="20%" max="40%">
                <div className="space-y-6 p-[8px]">
                  <h3 className="font-bold">Environment</h3>
                </div>
              </Splitter.Panel>
            )}
            <Splitter.Panel>
              <Splitter layout="vertical">
                <Splitter.Panel min="17%" max="95%">
                  <RequestForm onResponse={setResponse} />
                </Splitter.Panel>
                <Splitter.Panel>
                  <ResponseViewer response={response} />
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
          </Splitter>
        </Content>

        <Footer className="!p-[8px] text-center">
          Mini Postman ©{new Date().getFullYear()} Created by{" "}
          <a href="https://www.toluwalope.com/" target="_blank">
            9toluwalope
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
