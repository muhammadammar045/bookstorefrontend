import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardStatCard({
  name,
  value,
  bgColor = "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700",
  textColor = "text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400",
  className = "",
  icon: Icon = null,
  iconBgColor = "bg-gray-200 dark:bg-gray-800",
  iconColor = "text-gray-800 dark:text-gray-200",
}) {
  return (
    <div
      className={`flex cursor-pointer items-center rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out ${bgColor} ${className}`}
    >
      {Icon && (
        <div className={`rounded-full p-3 ${iconBgColor} mr-4`}>
          <FontAwesomeIcon
            className={`h-8 w-8 ${iconColor}`}
            icon={Icon}
          />
        </div>
      )}
      <div className={`${textColor}`}>
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <p className={`text-3xl font-bold`}>{value || 0}</p>
      </div>
    </div>
  );
}

export default DashboardStatCard;
