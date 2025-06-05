import * as React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ResponseViewer from "../components/ResponseViewer";
import RequestForm from "../components/RequestForm";

import { Layout, Segmented, Splitter } from "antd";
import { getScreenWidth } from "../utils/helper";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { pageType, setPageType } from "../slices/page-slice";
import { pageTypes } from "../model/pageType";
import { setTheme, themeType } from "../slices/theme-slice";
import { themeTypes } from "../model/themeType";
import VariableSection, {
  VariableSideNav,
} from "../components/VariableSection";

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [response, setResponse] = React.useState(null);
  const dispatch = useAppDispatch();
  const _pageType = useAppSelector(pageType);
  const _themeType = useAppSelector(themeType);

  return (
    <Layout className="!min-h-[100dvh]">
      <Layout>
        <Header className="flex justify-between items-center !h-[40px] !px-[8px]">
          <div></div>
          <div>
            <Segmented
              shape="round"
              value={_themeType}
              options={[
                { value: "light", icon: <SunOutlined /> },
                { value: "dark", icon: <MoonOutlined /> },
              ]}
              onChange={(e) => dispatch(setTheme(e as themeTypes))}
            />
          </div>
        </Header>
        <div className="mt-[8px] pt-[4px] px-[4px] mx-[8px]">
          <Segmented
            className="!text-[12px] font-semibold"
            value={_pageType}
            onChange={(e) => dispatch(setPageType(e))}
            options={["Collection", "Environment", "History"] as pageTypes[]}
          />
        </div>

        <Content className="flex !mt-0 mx-[8px] mb-[8px] rounded-lg !h-[calc(100dvh-120px)]">
          <Splitter
            className="h-full"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          >
            {getScreenWidth() > 1280 && (
              <Splitter.Panel defaultSize="25%" min="22%" max="40%">
                {_pageType === "Environment" && <VariableSideNav />}
              </Splitter.Panel>
            )}
            <Splitter.Panel>
              {_pageType === "Environment" && (
                <Splitter layout="vertical">
                  <Splitter.Panel>
                    <VariableSection />
                  </Splitter.Panel>
                </Splitter>
              )}
              {_pageType === "Collection" && (
                <Splitter layout="vertical">
                  <Splitter.Panel min="17%" max="95%">
                    <RequestForm onResponse={setResponse} />
                  </Splitter.Panel>
                  <Splitter.Panel>
                    <ResponseViewer response={response} />
                  </Splitter.Panel>
                </Splitter>
              )}
            </Splitter.Panel>
          </Splitter>
        </Content>

        <Footer className="!p-[2px] text-center !text-[12px]">
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
