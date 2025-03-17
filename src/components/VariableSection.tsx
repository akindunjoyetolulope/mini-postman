import { Button, Dropdown, Input, MenuProps, Space } from "antd";
import VariableTable from "./ui/VariableTable";
import {
  CircleCheck,
  Delete,
  Ellipsis,
  Pen,
  Plus,
  Search,
  Share,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  activeVariable,
  addVariable,
  setActiveEnvironment,
  setActiveVariable,
  variables,
} from "../slices/variable-slice";
import { themeType } from "../slices/theme-slice";

export default function VariableSection() {
  return (
    <div className="space-y-6 p-[8px]">
      <VariableTable />
    </div>
  );
}

export const VariableSideNav = () => {
  const _variables = useAppSelector(variables);
  const _themeType = useAppSelector(themeType);
  const _activeVariable = useAppSelector(activeVariable);
  const dispatch = useAppDispatch();

  const items: MenuProps["items"] = [
    {
      label: "Share",
      key: "0",
      icon: <Share size={16} strokeWidth={1} />,
      disabled: true,
    },
    {
      label: "Rename",
      key: "1",
      icon: <Pen size={16} strokeWidth={1} />,
    },
    {
      label: "Duplicate",
      key: "2",
      icon: <Plus size={16} strokeWidth={1} />,
    },
    {
      type: "divider",
    },
    {
      label: "Delete",
      icon: <Delete size={16} strokeWidth={1} />,
      danger: true,
      key: "3",
    },
  ];

  return (
    <div className="p-[8px]">
      <div className="flex gap-2 my-2">
        <Button className="p-0" onClick={() => dispatch(addVariable())}>
          <Plus size={20} strokeWidth={1} />
        </Button>
        <Input
          prefix={<Search size={20} strokeWidth={1} />}
          // onChange={(e) => dispatch(filterVariable(e.target.value))}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {_variables.map((variable) => (
          <div
            key={variable.id}
            className={`flex cursor-pointer font-medium text-[12px] items-center justify-between py-1 px-4 rounded-lg  ${
              _activeVariable === variable.id
                ? _themeType === "dark"
                  ? "bg-[#1F1F1F] "
                  : "bg-[#E6E6E6]"
                : ""
            }`}
            onClick={() => dispatch(setActiveVariable(variable.id))}
          >
            <div className="h-full py-1">{variable.name}</div>
            {variable.canNameChange && (
              <div className="flex items-center gap-1">
                <div className="cursor-pointer">
                  {!variable.active ? (
                    <CircleCheck
                      size={20}
                      strokeWidth={1.5}
                      onClick={() =>
                        dispatch(setActiveEnvironment(variable.id))
                      }
                    />
                  ) : (
                    <CircleCheck
                      size={20}
                      strokeWidth={2}
                      fill={`${_themeType === "dark" ? "white" : "black"}`}
                      className={`${
                        _themeType === "dark" ? "text-[#000]" : "text-[#fff]"
                      } `}
                      onClick={() =>
                        dispatch(setActiveEnvironment(variable.id))
                      }
                    />
                  )}
                </div>

                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <div
                    className="flex items-center h-full px-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Space>
                      <Ellipsis size={20} strokeWidth={1.5} />
                    </Space>
                  </div>
                </Dropdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
