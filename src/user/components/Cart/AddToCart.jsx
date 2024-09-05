import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCartThunk } from "@storeVars";
import showToast from "@utils/toastAlert/toaster";

function AddToCart({ productId }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    console.log(productId);
    try {
      const res = await dispatch(addProductToCartThunk(productId)).unwrap();
      showToast("success", `${res.message}`);
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <button
      className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black focus:outline-none focus:ring-4 dark:text-neutral-300"
      padding="px-4 py-3"
      onClick={handleClick}
    >
      <svg
        className="-ms-2 me-2 h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
        />
      </svg>
      <span>Add to cart</span>
    </button>
  );
}

export default AddToCart;
