import React from "react";

function Button({
  type,
  children,
  bgColor,
  textColor,
  className = "",
  padding,
  margin,
  rounded,
  textSize,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${padding} ${margin} ${rounded} ${textSize} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
