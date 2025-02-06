import * as React from "react";

import ResponseViewer from "../components/ResponseViewer";
import RequestForm from "../components/RequestForm";

import { Layout, Splitter } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [response, setResponse] = React.useState(null);

  return (
    <Layout className="!min-h-[100dvh]">
      <Sider
        collapsible
        trigger={null}
        width="50px"
        className="!bg-[#272822]"
        defaultCollapsed={false}
      ></Sider>

      <Layout>
        <Header className="p-0 !bg-[#fff]" />
        <Content className="m-[8px] !bg-[#fff] rounded-lg !h-[calc(100dvh-200px)]">
          <Splitter
            layout="vertical"
            className="h-full"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          >
            <Splitter.Panel defaultSize="40%" min="40%" max="80%">
              <RequestForm onResponse={setResponse} />
            </Splitter.Panel>
            <Splitter.Panel className="">
              <ResponseViewer response={response} />
            </Splitter.Panel>
          </Splitter>
        </Content>
        <Footer className="text-center">
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
