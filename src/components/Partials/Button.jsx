import React from "react";

function Button({
  type,
  children,
  bgColor,
  textColor,
  padding,
  margin,
  rounded,
  textSize,
  duration = "duration-700",
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
