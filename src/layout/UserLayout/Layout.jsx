import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@userComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterShow, setFilterShow } from "@storeVars";

const Layout = () => {
  const dispatch = useDispatch();
  const filterShow = useSelector(selectFilterShow);

  const toggleFilter = () => {
    dispatch(setFilterShow(!filterShow));
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* Fixed Filter Icon */}
      <div
        className="fixed right-4 top-80 z-50 flex h-20 w-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-300 bg-gray-200 px-4 py-2.5 shadow-lg transition-colors duration-300 hover:bg-gray-300 dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 sm:flex sm:flex-col"
        onClick={toggleFilter}
      >
        <FontAwesomeIcon
          icon={faSlidersH}
          className="text-gray-700 dark:text-gray-300"
          size="lg"
        />
      </div>

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
