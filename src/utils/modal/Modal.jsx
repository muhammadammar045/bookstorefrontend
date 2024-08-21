import ReactDOM from "react-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectShowModal } from "@storeVars";

function Modal({ onConfirmFunction, message, onClose }) {
  const showModal = useSelector(selectShowModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    onConfirmFunction();
    dispatch(closeModal());
  };

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-gray-900/50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md p-4 md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-red-700"
                fill="currentColor"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 h-14 w-14 rounded-full bg-black text-red-700 dark:text-red-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="mr-4 inline-flex rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:z-10 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
