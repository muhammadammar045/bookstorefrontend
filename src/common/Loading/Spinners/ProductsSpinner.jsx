import React from "react";

function ProductsSpinner({ count = 6 }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(count)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="overflow-hidden rounded">
                {/* Skeleton for Product Thumbnail */}
                <div className="mx-auto h-44 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="space-y-2">
                {/* Skeleton for Product Title */}
                <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                {/* Skeleton for Product Description */}
                <div className="h-3 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-3 w-5/6 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
              {/* Skeleton for Product Price */}
              <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="mt-6 flex items-center gap-2.5">
                {/* Skeleton for Like Button */}
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                {/* Skeleton for Add to Cart Button */}
                <div className="h-10 w-28 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductsSpinner;
