import React, { useState, useId } from "react";

const FileInput = React.forwardRef(
  (
    {
      label = "Click to upload",
      subLabel = "",
      helperText = "",
      labelColor = "text-gray-500 dark:text-gray-400",
      bgColor = "bg-gray-50 dark:bg-gray-700",
      hoverBgColor = "hover:bg-gray-100 dark:hover:bg-gray-800",
      borderColor = "border-gray-300 dark:border-gray-600",
      hoverBorderColor = "dark:hover:border-gray-500",
      iconColor = "text-gray-500 dark:text-gray-400",
      rounded = "rounded-lg",
      height = "h-64",
      onFileSelect,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const id = useId();

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect && onFileSelect(files);
      }
    };

    return (
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor={id}
          className={`flex ${height} w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed ${isDragging ? "border-blue-500" : borderColor} ${bgColor} ${hoverBgColor} ${hoverBorderColor} ${rounded}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className={`mb-4 h-8 w-8 ${iconColor}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className={`mb-2 text-sm ${labelColor}`}>
              <span className="font-semibold">{label}</span> {subLabel}
            </p>
            <p className={`text-xs ${labelColor}`}>{helperText}</p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            ref={ref}
            {...props}
          />
        </label>
      </div>
    );
  }
);

export default FileInput;
