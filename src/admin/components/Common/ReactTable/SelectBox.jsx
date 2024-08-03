import React from "react";

function SelectBox({ pageSize, setPageSize }) {
  return (
    <select
      value={pageSize}
      onChange={(e) => setPageSize(e.target.value)}
      className="block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      {[10, 25, 50, 75, 100, 200].map((pageSize) => {
        return (
          <option
            key={pageSize}
            value={pageSize}
          >
            Show {pageSize}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
