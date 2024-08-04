// Checkbox.js
import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <>
      <label className="my-4 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 rounded-md text-blue-600"
        />
        <span className="text-gray-900 dark:text-gray-200">{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
