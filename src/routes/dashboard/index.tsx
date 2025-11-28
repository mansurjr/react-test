import { memo } from "react";
import EnhancedTable from "../../components/UsersTable";

const Dashboard = () => {
  return (
    <div className=" mx-auto p-4">
      <EnhancedTable />
    </div>
  );
};

export default memo(Dashboard);
