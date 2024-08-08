import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "@adminComponents";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">
          {/*  Site header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
