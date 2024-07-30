import React from "react";

function SkeletonTable({ rows, columns }) {
  return (
    <>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead>
          <tr className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            {[...Array(columns)].map((_, index) => (
              <th
                scope="col"
                className="px-6 py-3"
                key={index}
              >
                <div className="h-4 w-20 rounded-full bg-gray-100 dark:bg-gray-700"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr
              key={`loading-row-${rowIndex}`}
              className="animate-pulse border-b bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
            >
              {[...Array(columns)].map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className="px-6 py-4"
                >
                  <div className="h-4 w-20 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SkeletonTable;
