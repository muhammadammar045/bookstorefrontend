import React from "react";
import { ThemeToggle } from "@commonPartials";

function Header({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  return (
    <header
      className={`sticky top-0 z-30 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 ${variant === "v2" || variant === "v3" ? "before:bg-white after:absolute after:inset-x-0 after:top-full after:-z-10 after:h-px after:bg-gray-200 dark:after:bg-gray-700/60" : "max-lg:shadow-sm lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90"} ${variant === "v2" ? "dark:before:bg-gray-800" : ""} ${variant === "v3" ? "dark:before:bg-gray-900" : ""}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`flex h-16 items-center justify-between ${variant === "v2" || variant === "v3" ? "" : "border-gray-200 dark:border-gray-700/60 lg:border-b"}`}
        >
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="5"
                  width="16"
                  height="2"
                />
                <rect
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                />
                <rect
                  x="4"
                  y="17"
                  width="16"
                  height="2"
                />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {/*  Divider */}
            <hr className="h-6 w-px border-none bg-gray-200 dark:bg-gray-700/60" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
