import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@userComponents";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
