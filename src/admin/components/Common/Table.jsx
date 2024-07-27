import React from "react";
import { Link } from "react-router-dom";

function Table({ tableHeaders, tableData }) {
  console.log(tableHeaders);
  console.log(tableData);
  return (
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {/* Checkbox */}
          <th
            scope="col"
            className="p-4"
          >
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="checkbox-all-search"
                className="sr-only"
              >
                checkbox
              </label>
            </div>
          </th>

          {/* Table Headers */}
          {tableHeaders.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3"
            >
              {header}
            </th>
          ))}

          {/* Actions */}
          <th
            scope="col"
            className="px-6 py-3"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            {/* Checkbox */}
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id={`checkbox-table-search-${rowIndex}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor={`checkbox-table-search-${rowIndex}`}
                  className="sr-only"
                >
                  checkbox
                </label>
              </div>
            </td>

            {/* Table Data from cell to cell */}
            {tableHeaders.map((header, colIndex) => (
              <td
                key={colIndex}
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {rowData[header.toLowerCase()]}
              </td>
            ))}

            {/* Actions */}
            <td className="flex items-center space-x-2 px-6 py-4">
              <Link
                to="#"
                onClick={() => handleEdit(rowData)}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Edit
              </Link>
              <Link
                to="#"
                onClick={() => handleRemove(rowData)}
                className="font-medium text-red-600 hover:underline dark:text-red-500"
              >
                Remove
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function handleEdit(rowData) {
  // Implement edit functionality here
  console.log("Edit row:", rowData);
}

function handleRemove(rowData) {
  // Implement remove functionality here
  console.log("Remove row:", rowData);
}

export default Table;
