import React from "react";

function Heading({ children }) {
  return (
    <h1 className="mb-5 py-2 text-center text-4xl font-bold tracking-wider text-gray-900 dark:text-gray-200">
      {children}
    </h1>
  );
}

export default Heading;
