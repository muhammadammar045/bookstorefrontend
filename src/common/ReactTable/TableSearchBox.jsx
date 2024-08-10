import React from "react";

function TableSearchBox({ filter, setFilter }) {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
      className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
    />
  );
}

export default TableSearchBox;
