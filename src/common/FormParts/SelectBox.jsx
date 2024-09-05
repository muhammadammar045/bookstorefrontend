import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPageSize, setPageSize } from "@storeVars";

function SelectBox({
  label = "Items per page",
  labelColor = "text-sm font-semibold text-gray-900 dark:text-neutral-400",
  bgColor = "bg-gray-100 dark:bg-neutral-900",
  textColor = "text-sm text-gray-900 dark:text-neutral-400 dark:placeholder-neutral-500",
  padding = "px-4 py-3",
  width = "w-full",
  rounded = "rounded-lg",
  shadow = "",
  outline = "focus:outline-none focus:ring-0",
  border = "border-gray-200 dark:border-neutral-700",
  className = "ease-in duration-700",
  ...props
}) {
  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize); // Access the state from the slice

  const handleChange = (e) => {
    dispatch(setPageSize(parseInt(e.target.value, 10))); // Convert to number
  };

  const selectProps = {
    value: pageSize,
    onChange: handleChange,
    className: `${className} ${padding} ${width} ${border} ${rounded} ${textColor} ${bgColor} ${shadow} ${outline}`,
    ...props,
  };

  return (
    <div className="w-full text-left">
      {label && (
        <label
          className={`mb-2 inline-block pl-1 ${labelColor}`}
          htmlFor="select-box"
        >
          {label}
        </label>
      )}
      <select {...selectProps}>
        {[10, 25, 50, 75, 100, 200].map((availablePageSize) => (
          <option
            key={availablePageSize}
            value={availablePageSize}
          >
            Show {availablePageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
