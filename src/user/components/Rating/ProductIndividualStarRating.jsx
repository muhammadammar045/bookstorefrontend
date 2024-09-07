import React from "react";
import { useSelector } from "react-redux";
import {
  selectProductReviewsIndividualStarCount,
  selectProductReviewsAverageRating,
} from "@storeVars";

function ProductIndividualStarRating() {
  const average = useSelector(selectProductReviewsAverageRating);

  const individualStarCount = useSelector(
    selectProductReviewsIndividualStarCount
  );
  const starRatings = [
    { star: 5, count: individualStarCount?.fiveStar },
    { star: 4, count: individualStarCount?.fourStar },
    { star: 3, count: individualStarCount?.threeStar },
    { star: 2, count: individualStarCount?.twoStar },
    { star: 1, count: individualStarCount?.oneStar },
  ];
  const totalReviews = starRatings.reduce((sum, item) => sum + item?.count, 0);

  return (
    <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
      <div className="shrink-0 space-y-4">
        <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
          {average} out of 5
        </p>
        <button
          type="button"
          data-modal-target="review-modal"
          data-modal-toggle="review-modal"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2 me-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
        >
          Write a review
        </button>
      </div>
      <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
        {starRatings.map((item) => {
          const percentage =
            totalReviews > 0 ? (item?.count / totalReviews) * 100 : 0;

          return (
            <div
              key={item.star}
              className="flex items-center gap-2"
            >
              <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                {item.star}
              </p>
              <svg
                className="h-4 w-4 shrink-0 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-yellow-300"
                  style={{ width: `${percentage}%` }} // Dynamic width based on percentage
                />
              </div>
              <a
                href="#"
                className="text-primary-700 dark:text-primary-500 w-8 shrink-0 text-right text-sm font-medium leading-none hover:underline sm:w-auto sm:text-left"
              >
                {item.count}{" "}
                <span className="hidden sm:inline sm:ps-2"> reviews</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductIndividualStarRating;
