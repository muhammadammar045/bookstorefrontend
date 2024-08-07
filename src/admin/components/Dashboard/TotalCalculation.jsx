import React from "react";

function TotalCalculation({
  name,
  value,
  bgColor = "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700",
  textColor = "text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400",
}) {
  return (
    <>
      <div className={`${textColor} ${bgColor} rounded-lg p-10`}>
        <h3 className="mb-2 text-2xl font-semibold">{name} :</h3>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {value || 0}
        </p>
      </div>
    </>
  );
}

export default TotalCalculation;
