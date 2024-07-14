import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxPagesToShow = 1; // Number of pages to show around the current page

    if (totalPages <= 1) return buttons;

    // Previous button (disabled if currentPage <= 1)
    buttons.push(
      <button
        key="prev"
        className={`mx-1 rounded-lg px-3 py-1 text-white outline outline-pink-700 ${
          currentPage <= 1 ? "cursor-not-allowed" : "hover:bg-pink-700"
        }`}
        onClick={() => currentPage > 1 && handleClick(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
    );

    // Show the first few pages (maxPagesToShow)
    for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 rounded-lg px-3 py-1 ${
            currentPage === i
              ? "bg-pink-700 text-white"
              : "outline outline-pink-700 hover:bg-pink-700"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    // Ellipsis if there are pages between the first few and the current page range
    if (currentPage > maxPagesToShow + 1) {
      buttons.push(
        <span
          key="ellipsis-start"
          className="mx-1 rounded-lg px-3 py-1 text-white outline outline-pink-700"
        >
          ...
        </span>
      );
    }

    // Show pages around the current page
    for (
      let i = Math.max(currentPage - maxPagesToShow, 1);
      i <= Math.min(currentPage + maxPagesToShow, totalPages);
      i++
    ) {
      if (i > maxPagesToShow && i < totalPages - maxPagesToShow + 1) {
        buttons.push(
          <button
            key={i}
            className={`mx-1 rounded-lg px-3 py-1 ${
              currentPage === i
                ? "bg-pink-700 text-white"
                : "outline outline-pink-700 hover:bg-pink-700"
            }`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Ellipsis if there are pages between the current page range and the last few pages
    if (currentPage < totalPages - maxPagesToShow) {
      buttons.push(
        <span
          key="ellipsis-end"
          className="mx-1 rounded-lg px-3 py-1 text-white outline outline-pink-700"
        >
          ...
        </span>
      );
    }

    // Show the last few pages (maxPagesToShow)
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
              currentPage === i
                ? "bg-pink-700 text-white"
                : "outline outline-pink-700 hover:bg-pink-700"
            }`}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Next button (disabled if currentPage >= totalPages)
    buttons.push(
      <button
        key="next"
        className={`mx-1 rounded-lg px-3 py-1 text-white outline outline-pink-700 ${
          currentPage >= totalPages ? "cursor-not-allowed" : "hover:bg-pink-700"
        }`}
        onClick={() => currentPage < totalPages && handleClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    );
    return buttons;
  };

  return (
    <div className="mt-4 flex justify-center">{getPaginationButtons()}</div>
  );
};

export default Pagination;
