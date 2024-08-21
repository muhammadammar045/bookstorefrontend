import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@storeVars";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@userComponents";
import UserSidebar from "../../user/Partials/UserSidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector(selectUser);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {user ? (
        <>
          <div className="flex">
            {/* SIDEBAR */}
            <UserSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* MAIN CONTENT */}
            <div className="relative flex w-full items-center justify-center overflow-y-auto bg-gray-100 dark:bg-gray-900">
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Layout;
