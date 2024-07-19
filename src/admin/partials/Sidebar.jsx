import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-scroll bg-white p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!flex lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 dark:bg-gray-800 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === "v2" ? "border-r-2 border-gray-200 dark:border-gray-700/60" : "shadow-sm"}`}
      >
        {/* Sidebar header */}
        <div className="mb-10 flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="text-gray-500 hover:text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink
            end
            to="/"
            className="block"
          >
            <svg
              className="fill-violet-500"
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
            >
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
              <span
                className="lg:sidebar-expanded:hidden hidden w-6 text-center lg:block 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to="#0"
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("dashboard") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                              <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-8 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Main
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Analytics
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Fintech
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Users */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" || pathname.includes("all-users")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to="#0"
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("all-users") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                              <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Users Management
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-8 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/roles"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Roles
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/permissions"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Permissions
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/all-users"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                All Users
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="w-12 py-2 pl-4 pr-3">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="sidebar-expanded:rotate-180 shrink-0 fill-current text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;