import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/ARlogo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userAuthSlice";
import { Logout } from "../AllComponents";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(selectUser);

  const links = [
    ["Home", "/"],
    ["Login", "/login"],
    ["Register", "/signup"],
  ];

  const authenticatedLinks = [
    ["Home", "/"],
    ["My Books", "/books"],
    ["Add Book", "/add-book"],
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header>
        <nav className="w-full border-b-2 border-primary bg-slate-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <NavLink
              to="/"
              className="group flex cursor-pointer items-center space-x-1 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-20 duration-700 group-hover:scale-125"
              />
              <span className="xs:hidden self-center whitespace-nowrap text-2xl font-semibold duration-700 group-hover:scale-125 sm:block dark:text-primary">
                . AmmaRi
              </span>
            </NavLink>
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-primary-500 inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-primary dark:hover:bg-tertiary dark:focus:ring-white"
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
              <div>
                <ul className="xs:dark:bg-slate-900 mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium text-primary md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-transparent md:dark:bg-transparent">
                  {user
                    ? authenticatedLinks.map(([label, path]) => (
                        <li
                          key={path}
                          className="cursor-pointer"
                        >
                          <NavLink
                            to={path}
                            className={({ isActive }) =>
                              `block rounded px-3 py-2 md:p-0 ${
                                isActive ? "text-tertiary" : "text-primary"
                              } duration-700 hover:scale-125 dark:hover:text-tertiary`
                            }
                            aria-current="page"
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))
                    : links.map(([label, path]) => (
                        <li
                          key={path}
                          className="cursor-pointer"
                        >
                          <NavLink
                            to={path}
                            className={({ isActive }) =>
                              `block rounded px-3 py-2 md:p-0 ${
                                isActive ? "text-tertiary" : "text-primary"
                              } duration-700 hover:scale-125 dark:hover:text-tertiary`
                            }
                            aria-current="page"
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
                  {user && <Logout />}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
