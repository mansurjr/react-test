import { memo, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full min-h-screen flex bg-gray-50">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default memo(MainLayout);
