import React from "react";

function TablePagination({
  currentPage,
  totalPages,
  gotoPage,
  //   pageOptions,
  next,
  previous,
  canPrev,
  canNext,
}) {
  const maxPagesToShow = 1; // Adjust as needed
  const buttons = [];

  // Helper function to handle page clicks
  const handleClick = (currentPage) => {
    const pageNumber = Number(currentPage) - 1;
    gotoPage(pageNumber);
  };

  // Previous button
  buttons.push(
    <button
      key="prev"
      className={`mx-1 rounded-lg px-3 py-1 ${
        currentPage + 1 <= 1
          ? "cursor-not-allowed bg-gray-500 dark:bg-gray-600"
          : "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700"
      }`}
      onClick={previous}
      disabled={!canPrev}
    >
      Prev
    </button>
  );

  // First few pages
  for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
    buttons.push(
      <button
        key={i}
        className={`mx-1 rounded-lg px-3 py-1 ${
          currentPage + 1 === i
            ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200"
            : "bg-gray-900 text-white hover:bg-blue-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-700"
        }`}
        onClick={() => handleClick(i)}
      >
        {i}
      </button>
    );
  }

  // Ellipsis for skipped pages
  if (currentPage + 1 > maxPagesToShow + 1) {
    buttons.push(
      <span
        key="ellipsis-start"
        className="mx-1 rounded-lg bg-gray-900 px-3 py-1 text-white dark:bg-gray-700 dark:text-gray-200"
      >
        ...
      </span>
    );
  }

  // Pages around the current page
  for (
    let i = Math.max(currentPage + 1 - maxPagesToShow, 1);
    i <= Math.min(currentPage + 1 + maxPagesToShow, totalPages);
    i++
  ) {
    if (i > maxPagesToShow && i < totalPages - maxPagesToShow + 1) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 rounded-lg px-3 py-1 ${
            currentPage + 1 === i
              ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200"
              : "bg-gray-900 text-white hover:bg-blue-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-700"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
  }

  // Ellipsis for skipped pages
  if (currentPage + 1 < totalPages - maxPagesToShow) {
    buttons.push(
      <span
        key="ellipsis-end"
        className="mx-1 rounded-lg bg-gray-900 px-3 py-1 text-white dark:bg-gray-700 dark:text-gray-200"
      >
        ...
      </span>
    );
  }

  // Last few pages
  for (
    let i = Math.max(totalPages - maxPagesToShow + 1, 1);
    i <= totalPages;
    i++
  ) {
    if (i > maxPagesToShow) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 rounded-lg px-3 py-1 ${
            currentPage + 1 === i
              ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200"
              : "bg-gray-900 text-white hover:bg-blue-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-700"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
  }

  // Next button
  buttons.push(
    <button
      key="next"
      className={`mx-1 rounded-lg px-3 py-1 ${
        currentPage + 1 >= totalPages
          ? "cursor-not-allowed bg-gray-500 dark:bg-gray-600"
          : "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700"
      }`}
      onClick={next}
      disabled={!canNext}
    >
      Next
    </button>
  );

  return (
    <div className="m-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-gray-400">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>
      <div className="flex items-center">{buttons}</div>
    </div>
  );
}

export default TablePagination;
