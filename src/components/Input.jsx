import React, { useId } from "react";

function Input(
  {
    type = "text",
    className = "outline outline-primary-500 shadow-md shadow-primary-500 focus:shadow-lg focus:shadow-cyan-600 focus:outline-cyan-600",
    labelColor = "text-white",
    placeholder = "Type here",
    label = "",
    padding = "px-3 py-2",
    width = "w-full",
    rounded = "rounded-lg",
    text = "text-black",
    border = "",

    ...props
  },
  ref
) {
  const id = useId();

  const inputProps = {
    id: id,
    ref: ref,
    className: `${className} ${padding} ${width} ${border} ${rounded} ${text} bg-slate-800 text-white outline outline-primary-500 duration-700 shadow-md shadow-primary-500 focus:shadow-lg focus:shadow-cyan-600 focus:outline-cyan-600 `,
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
