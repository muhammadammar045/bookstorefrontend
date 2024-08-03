import React, { useId } from "react";

function Select(
  {
    labelColor = "text-gray-900 dark:text-gray-200",
    bgColor = "bg-gray-100 dark:bg-gray-800",
    textColor = "text-gray-900 dark:text-gray-100",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    shadow = "hover:shadow-lg shadow-sky-500 dark:shadow-sky-400 focus:shadow-lg focus:shadow-sky-500 dark:focus:shadow-sky-400",
    outline = "",
    className = "ease-in duration-700",
    label = "",
    border = "",
    options = [
      { id: "option1", name: "Option 1" },
      { id: "option2", name: "Option 2" },
      { id: "option3", name: "Option 3" },
    ],
    ...props
  },
  ref
) {
  const id = useId();

  const selectProps = {
    id: id,
    ref: ref,
    className: `${className} ${padding} ${width} ${border} ${rounded} ${textColor} ${bgColor} ${shadow} ${outline}`,
    ...props,
  };

  return (
    <div className="w-full text-left">
      {label && (
        <label
          className={`mb-2 inline-block pl-1 ${labelColor}`}
          htmlFor={id}
        >
          {`${label} :`}
        </label>
      )}
      <select {...selectProps}>
        {options.map((option) => (
          <option key={option.id}>
            {option.name}
            {/* {console.log(option)} */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
