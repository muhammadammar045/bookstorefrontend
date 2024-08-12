import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ARlogo from "@assets/images/ARlogo.png";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faDashboard,
  faGears,
  faPager,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
        className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-scroll bg-white p-4 transition-all duration-200 ease-in-out dark:bg-gray-800 lg:static lg:left-auto lg:top-auto lg:!flex lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === "v2" ? "border-r-2 border-gray-200 dark:border-gray-700/60" : "shadow-sm"}`}
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
            <img
              className="w-16"
              src={ARlogo}
              alt=""
            />
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
                  pathname === "/admin/dashboard" ||
                  pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/dashboard" ||
                          pathname.includes("dashboard")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/dashboard" || pathname.includes("dashboard") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faDashboard}
                            />
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="dashboard/main"
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
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Users */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/users" || pathname.includes("users")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/users" ||
                          pathname.includes("users")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/users" || pathname.includes("users") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faUsers}
                            />
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Users
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          {/* ALL USERS */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="users/all-users"
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

                          {/* ADD OR UPDATE USER */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="users/add-or-update-user"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Add Or Update Users
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Roles */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/roles" || pathname.includes("roles")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/roles" ||
                          pathname.includes("roles")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/roles" || pathname.includes("roles") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faGears}
                            />

                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Roles
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          {/* ALL ROLES */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="roles/all-roles"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                All Roles
                              </span>
                            </NavLink>
                          </li>

                          {/* ADD OR UPDATE ROLE */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="roles/add-or-update-role"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Add Or Update Roles
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Permissions */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/permissions" ||
                  pathname.includes("permissions")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/permissions" ||
                          pathname.includes("permissions")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/permissions" || pathname.includes("permissions") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faPager}
                            />
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Permissions
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          {/* ALL PERMISSIONS */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="permissions/all-permissions"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                All Permissions
                              </span>
                            </NavLink>
                          </li>

                          {/* ADD OR UPDATE PERMISSION */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="permissions/add-or-update-permission"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Add Or Update Permission
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Products */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/products" ||
                  pathname.includes("products")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/products" ||
                          pathname.includes("products")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/products" || pathname.includes("products") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faBook}
                            />
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Products
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          {/* ALL BOOKS */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="products/all-products"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                All Products
                              </span>
                            </NavLink>
                          </li>

                          {/* ADD OR UPDATE BOOK */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="products/add-or-update-product"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Add Or Update Product
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Category */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/admin/categories" ||
                  pathname.includes("categories")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to=""
                        className={`block truncate text-gray-800 transition duration-150 dark:text-gray-100 ${
                          pathname === "/admin/categories" ||
                          pathname.includes("categories")
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
                            <FontAwesomeIcon
                              className={`w-6 shrink-0 fill-current ${pathname === "/admin/categories" || pathname.includes("categories") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`}
                              icon={faBook}
                            />
                            <span className="lg:sidebar-expanded:opacity-100 ml-4 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Category
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
                        <ul className={`mt-1 pl-11 ${!open && "hidden"}`}>
                          {/* ALL CATEGORIES */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="categories/all-categories"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                All Categories
                              </span>
                            </NavLink>
                          </li>

                          {/* ADD OR UPDATE CATEGORY */}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="categories/add-or-update-category"
                              className={({ isActive }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")
                              }
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Add Or Update Category
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
