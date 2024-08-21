import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Like({ isLiked }) {
  return (
    <button
      to="#"
      title=""
      className={`flex items-center justify-center rounded-lg py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 ${
        isLiked
          ? "border-red-500 bg-red-100 px-4 text-red-500 hover:bg-red-200 hover:text-red-600 focus:ring-red-300 dark:border-red-400 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800 dark:hover:text-red-300 dark:focus:ring-red-800"
          : "hover:text-primary-700 border-gray-200 bg-white px-3 text-gray-900 hover:bg-gray-100 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      }`}
      role="button"
    >
      <span className={`mx-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}>
        <FontAwesomeIcon icon={faHeart} />
      </span>
      {isLiked ? "Liked" : "Favorite"}
    </button>
  );
}

export default Like;
