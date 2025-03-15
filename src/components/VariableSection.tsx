import { Button, Input } from "antd";
import VariableTable from "./ui/VariableTable";
import { Plus, Search } from "lucide-react";

export default function VariableSection() {
  return (
    <div className="space-y-6 p-[8px]">
      <VariableTable />
    </div>
  );
}

export const VariableSideNav = () => {
  return (
    <div className="space-y-6 p-[8px]">
      <div className="flex gap-2 my-2">
        <Button className="p-0">
          <Plus size={20} strokeWidth={1} />
        </Button>
        <Input
          prefix={<Search size={20} strokeWidth={1} />}
          // onChange={(e) => dispatch(filterVariable(e.target.value))}
        />
      </div>
    </div>
  );
};
