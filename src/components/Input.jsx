import React, { useId } from "react";

function Input(
  {
    type = "text",
    labelColor = "text-primary",
    bgColor = "bg-tertiary",
    textColor = "text-primary",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    shadow = "shadow-md shadow-primary focus:shadow-lg focus:shadow-primary",
    outline = "outline outline-primary  focus:outline-primary",
    className = "duration-700",
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
          className={`mb-1 inline-block pl-1 ${labelColor}`}
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
