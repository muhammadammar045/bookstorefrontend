import React, { useId } from "react";

function Input(
  {
    type = "text",
    labelColor = "text-gray-900 dark:text-gray-200",
    bgColor = "bg-gray-100 dark:bg-neutral-900",
    textColor = "text-gray-900 dark:text-gray-100",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    shadow = "hover:shadow-lg dark:shadow-sky-400",
    outline = "",
    className = "ease-in duration-700",
    label = "",
    placeholder = "",
    border = "border-gray-200 dark:border-neutral-700",
    ...props
  },
  ref
) {
  const id = useId();

  const inputProps = {
    id: id,
    ref: ref,
    className: `${padding} ${width} ${border} ${rounded} ${textColor} ${bgColor} ${shadow} ${outline} ${className}`,
    placeholder: placeholder,
    ...props,
  };

  return (
    <div>
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
