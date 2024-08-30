import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Like({ isLiked }) {
  return (
    <button
      to="#"
      title={isLiked ? "Unlike" : "Like"}
      className={`group flex items-center justify-center rounded-lg py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 ${
        isLiked
          ? "border-blue-500 bg-blue-100 px-4 text-blue-500 hover:bg-blue-200 hover:text-blue-600 focus:ring-blue-300 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800 dark:hover:text-blue-300 dark:focus:ring-blue-800"
          : "border-gray-200 bg-white px-3 text-gray-900 hover:bg-gray-100 hover:text-red-600 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-red-600 dark:focus:ring-red-700"
      }`}
      role="button"
    >
      <span
        className={`mx-1 ${isLiked ? "text-red-600 group-hover:text-red-700" : "text-gray-600 group-hover:text-red-600"}`}
      >
        <FontAwesomeIcon icon={faHeart} />
      </span>
    </button>
  );
}

export default Like;
