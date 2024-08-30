import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPageSize, setPageSize } from "@storeVars";

function SelectBox() {
  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize); // Access the state from the slice

  const handleChange = (e) => {
    dispatch(setPageSize(parseInt(e.target.value, 10))); // Convert to number
  };

  return (
    <select
      value={pageSize}
      onChange={handleChange}
      className="block w-[200px] rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      {[1, 5, 10, 25, 50, 75, 100, 200].map((availablePageSize) => (
        <option
          key={availablePageSize}
          value={availablePageSize}
        >
          Show {availablePageSize}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
