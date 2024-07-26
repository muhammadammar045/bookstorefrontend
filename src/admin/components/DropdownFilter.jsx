import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";

function DropdownFilter({ align }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn border-gray-200 bg-white px-2.5 text-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-500 dark:hover:border-gray-600"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg
          className="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`absolute left-0 right-auto top-full z-10 mt-1 min-w-56 origin-top-right overflow-hidden rounded-lg border border-gray-200 bg-white pt-1.5 shadow-lg dark:border-gray-700/60 dark:bg-gray-800 ${
          align === "right"
            ? "md:left-auto md:right-0"
            : "md:left-0 md:right-auto"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="px-3 pb-2 pt-1.5 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
            Filters
          </div>
          <ul className="mb-4">
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">
                  Direct VS Indirect
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">
                  Real Time Value
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">Top Channels</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">
                  Sales VS Refunds
                </span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">Last Order</span>
              </label>
            </li>
            <li className="px-3 py-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm font-medium">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="border-t border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700/60 dark:bg-gray-700/20">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs border-gray-200 bg-white text-red-500 hover:border-gray-300 dark:border-gray-700/60 dark:bg-gray-800 dark:hover:border-gray-600">
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  onClick={() => setDropdownOpen(false)}
                  onBlur={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
