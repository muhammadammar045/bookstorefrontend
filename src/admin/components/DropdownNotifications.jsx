import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

function DropdownNotifications({ align }) {
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
        className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 ${dropdownOpen && "bg-gray-200 dark:bg-gray-800"}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg
          className="fill-current text-gray-500/80 dark:text-gray-400/80"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0a7 7 0 0 0-7 7c0 1.202.308 2.33.84 3.316l-.789 2.368a1 1 0 0 0 1.265 1.265l2.595-.865a1 1 0 0 0-.632-1.898l-.698.233.3-.9a1 1 0 0 0-.104-.85A4.97 4.97 0 0 1 2 7a5 5 0 0 1 5-5 4.99 4.99 0 0 1 4.093 2.135 1 1 0 1 0 1.638-1.148A6.99 6.99 0 0 0 7 0Z" />
          <path d="M11 6a5 5 0 0 0 0 10c.807 0 1.567-.194 2.24-.533l1.444.482a1 1 0 0 0 1.265-1.265l-.482-1.444A4.962 4.962 0 0 0 16 11a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0c0 .588-.171 1.134-.466 1.6a1 1 0 0 0-.115.82 1 1 0 0 0-.82.114A2.973 2.973 0 0 1 11 14a3 3 0 0 1-3-3Z" />
        </svg>
        <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-gray-100 bg-red-500 dark:border-gray-900"></div>
      </button>

      <Transition
        className={`absolute top-full z-10 -mr-48 mt-1 min-w-80 origin-top-right overflow-hidden rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg sm:mr-0 dark:border-gray-700/60 dark:bg-gray-800 ${align === "right" ? "right-0" : "left-0"}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="px-4 pb-2 pt-1.5 text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">
            Notifications
          </div>
          <ul>
            <li className="border-b border-gray-200 last:border-0 dark:border-gray-700/60">
              <Link
                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  📣{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    Edit your information in a swipe
                  </span>{" "}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">
                  Feb 12, 2024
                </span>
              </Link>
            </li>
            <li className="border-b border-gray-200 last:border-0 dark:border-gray-700/60">
              <Link
                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  📣{" "}
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    Edit your information in a swipe
                  </span>{" "}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">
                  Feb 9, 2024
                </span>
              </Link>
            </li>
            <li className="border-b border-gray-200 last:border-0 dark:border-gray-700/60">
              <Link
                className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/20"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  🚀
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    Say goodbye to paper receipts!
                  </span>{" "}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </span>
                <span className="block text-xs font-medium text-gray-400 dark:text-gray-500">
                  Jan 24, 2024
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
