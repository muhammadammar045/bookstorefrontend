import React from "react";

function Button({
  type = "submit",
  children = "Button",
  bgColor = "bg-blue-500 hover:bg-blue-600 dark:bg-green-600 dark:hover:bg-green-300",
  textColor = "text-white dark:hover:text-black",
  padding = "px-8 py-2",
  margin = "",
  rounded = "rounded-lg",
  textSize = "text-md",
  duration = "duration-700 ease-in",
  className = "",
  onClick,
}) {
  return (
    <button
      className={`${bgColor} ${textColor} ${padding} ${margin} ${rounded} ${textSize} ${duration} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
