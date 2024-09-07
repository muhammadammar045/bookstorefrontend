import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import logo from "@assets/images/ARlogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserRole } from "@storeVars";
import { Logout } from "@userComponents";
import { ThemeToggle } from "@commonPartials";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const role = useSelector(selectUserRole);
  const navigate = useNavigate();
  const links = [
    ["Home", "/"],
    ["Login", "/login"],
    ["Register", "/signup"],
  ];

  const authenticatedLinks = [
    ["Home", "/"],
    // ["My Products", "/products"],
    ["Add Product", "/add-product"],
    ...(role === "admin" ? [["Admin", "/admin/dashboard/main"]] : []),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <header className="border-b-2 border-b-violet-700">
        <nav className="w-full bg-gray-300 dark:border-gray-700 dark:bg-gray-950">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            {/* LOGO */}
            <NavLink
              to="/"
              className="group flex cursor-pointer items-center rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-20 duration-700 group-hover:scale-125"
                alt="Logo"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 duration-700 group-hover:scale-125 dark:text-gray-200 xs:hidden sm:block">
                . STORE
              </span>
            </NavLink>

            {/* LAST PART ICONS */}
            <div className="flex items-center gap-4 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <div className="flex items-center justify-center gap-2">
                <ThemeToggle />
                {user && (
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="hover:cursor-pointer"
                    onClick={handleClick}
                  />
                )}
              </div>
              {user && <Logout />}
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="text-primary-500 dark:text-primary inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-400 md:hidden"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            {/* LINKS */}
            <div
              className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${
                isMobileMenuOpen ? "block" : "hidden"
              }`}
              id="navbar-sticky"
            >
              <div>
                <ul className="mt-4 flex flex-col items-center rounded-lg border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse">
                  {/* {user && (
                    <li>
                      <SearchBox />
                    </li>
                  )} */}

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
                                  ? "font-semibold text-violet-700 dark:text-violet-300"
                                  : "text-gray-900 dark:text-gray-200"
                              } duration-700 hover:scale-125 hover:text-violet-700 dark:hover:text-violet-300`
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
                                  ? "font-semibold text-violet-700 dark:text-violet-300"
                                  : "text-gray-900 dark:text-gray-200"
                              } duration-700 hover:scale-125 hover:text-violet-300 dark:hover:text-violet-300`
                            }
                            aria-current="page"
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
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
