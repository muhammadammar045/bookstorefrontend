import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@userComponents";

const Layout = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="relative flex w-full items-center justify-center overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </div>
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Layout;
