import React from "react";

function ProductsSpinner({ count = 6 }) {
  return (
    <>
      <div className="my-10 flex flex-wrap justify-center gap-4">
        {Array(count)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="group min-w-[370px] animate-pulse rounded-lg border-2 border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative p-2">
                <div className="overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <div className="max-h-[250px] min-h-[250px] w-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>

              <div className="p-5">
                <div className="mt-1">
                  <div className="mb-2 h-6 w-3/4 bg-gray-300 dark:bg-gray-700"></div>
                </div>

                <div className="mb-3 h-4 w-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="mb-3 h-4 w-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="mb-3 h-4 w-3/4 bg-gray-300 dark:bg-gray-700"></div>

                <div className="pt-2">
                  <div className="h-10 w-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductsSpinner;
