import React from "react";
import { Rating, ProductIndividualStarRating } from "@userComponents";
import {
  selectAllProductReviews,
  selectReviewIsLoading,
  selectProductReviewsAverageRating,
  selectProductReviewsCount,
} from "@storeVars";
import { useSelector } from "react-redux";

function ProductComments() {
  const reviews = useSelector(selectAllProductReviews);
  const isLoading = useSelector(selectReviewIsLoading);
  const average = useSelector(selectProductReviewsAverageRating);
  const count = useSelector(selectProductReviewsCount);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <section className="bg-white p-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="mb-8 text-center text-4xl font-semibold text-gray-900 dark:text-white">
            Reviews
          </h2>
          {reviews ? (
            <>
              <div className="flex items-center gap-2">
                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <Rating reviewRating={average} />
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    ({average})
                  </p>
                  {count} Reviews
                </div>
              </div>

              <ProductIndividualStarRating />

              <div className="mt-20 divide-y divide-gray-200 dark:divide-gray-700">
                {reviews.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="gap-3 py-6 sm:flex sm:items-start"
                  >
                    <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                      <div className="flex items-center gap-0.5">
                        <Rating reviewRating={review?.reviewRating} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {review?.ownerDetails?.userName}
                        </p>
                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {(() => {
                            const date = new Date(review?.createdAt);
                            const formattedDate =
                              date.toLocaleDateString("en-PK");
                            const formattedTime =
                              date.toLocaleTimeString("en-PK");
                            return `${formattedDate} ${formattedTime}`;
                          })()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {review?.reviewBody}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="hover:text-primary-700 mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  View more reviews
                </button>
              </div>
            </>
          ) : (
            <div>No reviews yet</div>
          )}
        </div>
      </section>

      {/* Add review modal */}
      <div
        id="review-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  Add a review for:
                </h3>
                <a
                  href="#"
                  className="text-primary-700 dark:text-primary-500 font-medium hover:underline"
                >
                  Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB
                  SSD
                </a>
              </div>
              <button
                type="button"
                className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="review-modal"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form className="p-4 md:p-5">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="ms-2 h-6 w-6 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="ms-2 h-6 w-6 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">
                      3.0 out of 5
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="focus:border-primary-600 focus:ring-primary-600 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Review description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    required=""
                    defaultValue={""}
                  />
                  <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
                    Problems with the product or delivery?{" "}
                    <a
                      href="#"
                      className="text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Send a report
                    </a>
                    .
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Add real photos of the product to help other customers{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (Optional)
                    </span>
                  </p>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="dropzone-file"
                      className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      id="review-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    />
                    <label
                      htmlFor="review-checkbox"
                      className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      By publishing this review you agree with the{" "}
                      <a
                        href="#"
                        className="text-primary-600 dark:text-primary-500 hover:underline"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                <button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 me-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Add review
                </button>
                <button
                  type="button"
                  data-modal-toggle="review-modal"
                  className="hover:text-primary-700 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductComments;
