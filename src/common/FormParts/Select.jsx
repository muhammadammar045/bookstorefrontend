import React, { useId } from "react";

function Select(
  {
    labelColor = "text-sm font-semibold text-gray-900 dark:text-neutral-400",
    bgColor = "bg-gray-100 dark:bg-neutral-900",
    textColor = "text-sm text-gray-900 dark:text-neutral-400 dark:placeholder-neutral-500",
    padding = "px-4 py-3",
    width = "w-full",
    rounded = "rounded-lg",
    shadow = "",
    outline = "focus:outline-none focus:ring-0",
    className = "ease-in duration-700",
    label = "",
    border = " border-gray-200 dark:border-neutral-700",
    options = [
      { id: "option1", name: "Option 1", value: "option1" },
      { id: "option2", name: "Option 2", value: "option2" },
      { id: "option3", name: "Option 3", value: "option3" },
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
          <option
            key={option.id}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
