import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "../store/hooks";
import { themeType } from "../slices/theme-slice";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider(props: Props) {
  const { children } = props;
  const _themeType = useAppSelector(themeType);

  useEffect(() => {
    localStorage.setItem("theme", _themeType === "dark" ? "dark" : "light");
  }, [_themeType]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorBgContainer: "transparent",
          },
          Select: {
            colorBgContainer: "transparent",
          },
          Input: {
            colorBgContainer: "transparent",
          },
          Layout: {
            headerBg: "#1677ff",
            headerColor: "#FFFFFF",
          },
        },
        algorithm:
          _themeType === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
