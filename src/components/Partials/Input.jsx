import React, { useId } from "react";

function Input(
  {
    type = "text",
    labelColor = "text-gray-900 dark:text-gray-200",
    bgColor = "bg-gray-100 dark:bg-gray-100",
    textColor = "text-gray-900 dark:text-gray-900",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    shadow = "hover:shadow-lg shadow-sky-500 dark:shadow-sky-400 focus:shadow-lg focus:shadow-sky-500 dark:focus:shadow-sky-400",
    outline = "",
    className = "ease-in duration-700",
    label = "",
    placeholder = "",
    border = "",
    ...props
  },
  ref
) {
  const id = useId();

  const inputProps = {
    id: id,
    ref: ref,
    className: `${className} ${padding} ${width} ${border} ${rounded} ${textColor} ${bgColor} ${shadow} ${outline}`,
    placeholder: placeholder,
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

      {type === "textarea" ? (
        <textarea {...inputProps} />
      ) : (
        <input
          type={type}
          {...inputProps}
        />
      )}
    </div>
  );
}

export default React.forwardRef(Input);
