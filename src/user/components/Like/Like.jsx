import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toggleProductLikeThunk, selectIsLiked } from "@storeVars";
import { useDispatch, useSelector } from "react-redux";
import showToast from "@utils/toastAlert/toaster";

function Like({ productId, isLiked }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const res = await dispatch(toggleProductLikeThunk(productId)).unwrap();
      showToast("success", `${res.message}`);
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      title={isLiked ? "Unlike" : "Like"}
      className={`group flex items-center justify-center rounded-lg py-2 text-sm font-medium ${
        isLiked
          ? "bg-blue-100 px-4 text-blue-500 hover:bg-blue-200 hover:text-blue-600 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          : "bg-white px-3 text-gray-900 hover:bg-gray-100 hover:text-red-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-red-600"
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
