import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/ARlogo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserRole } from "../../../store/user/userAuthSlice";
import { Logout } from "../AllComponents";
import ThemeToggle from "../../../Admin/components/Common/ThemeToggle";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const role = useSelector(selectUserRole);
  // console.log(user.user.role.roleName);
  // const role = user?.user?.role?.roleName;
  const links = [
    ["Home", "/"],
    ["Login", "/login"],
    ["Register", "/signup"],
  ];

  const authenticatedLinks = [
    ...(role === "admin" ? [["Dashboard", "/admin/dashboard"]] : []),
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
        <nav className="w-full border-b-2 border-gray-900 bg-cyan-200 dark:border-gray-200 dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <NavLink
              to="/"
              className="group flex cursor-pointer items-center space-x-1 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-20 duration-700 group-hover:scale-125"
                alt="Logo"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 duration-700 group-hover:scale-125 dark:text-gray-200 xs:hidden sm:block">
                . AmmaRi
              </span>
            </NavLink>
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-primary-500 dark:text-primary inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-400 md:hidden"
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
                <ul className="mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse">
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
                                isActive
                                  ? "text-violet-300 dark:text-violet-300"
                                  : "text-gray-900 dark:text-gray-200"
                              } duration-700 hover:scale-125 hover:text-violet-300 dark:hover:text-violet-300`
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
                                isActive
                                  ? "text-violet-300 dark:text-violet-300"
                                  : "text-gray-900 dark:text-gray-200"
                              } duration-700 hover:scale-125 hover:text-violet-300 dark:hover:text-violet-300`
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
