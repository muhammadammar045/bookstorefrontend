import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/ARlogo.png";
import { Link } from "react-router-dom";

const links = [
  ["Home", ""],
  ["Book Shop", "all-books"],
  ["Add Book", "add-book"],
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header id="header">
        <nav className={"w-full bg-slate-900"}>
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link
              to={"header"}
              className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-20"
              />
              <span className="xs:hidden self-center whitespace-nowrap text-2xl font-semibold sm:block dark:text-white">
                AmmaRi
              </span>
            </Link>
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-white-500 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-white dark:hover:bg-black dark:focus:ring-white"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div
              className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${
                isMobileMenuOpen ? "block" : "hidden"
              }`}
              id="navbar-sticky"
            >
              <ul className="xs:dark:bg-slate-900 mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium text-white md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-transparent md:dark:bg-transparent">
                {links.map(([label, path]) => (
                  <li
                    key={path}
                    className="cursor-pointer"
                  >
                    <Link
                      to={path}
                      className="block rounded px-3 py-2 md:p-0 dark:hover:text-orange-600 md:dark:text-white"
                      aria-current="page"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
