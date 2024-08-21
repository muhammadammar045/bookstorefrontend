import {
  selectProducts,
  selectProductIsLoading,
  selectTotalPages,
  fetchAllUsersProductsThunk,
  selectSearchQuery,
  setSearchQuery,
} from "@storeVars";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, SearchBox, SelectBox } from "@commonPartials";
import { ProductsSpinner } from "@loadingState";

import { ProductCard } from "@userComponents";
import Typewriter from "typewriter-effect";

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const loading = useSelector(selectProductIsLoading);
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    dispatch(
      fetchAllUsersProductsThunk({
        page: currentPage,
        query: searchQuery,
        limit: pageSize,
      })
    );
  }, [dispatch, currentPage, searchQuery, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="p-8">
        <h1 className="mb-3 py-2 text-center text-3xl font-bold italic tracking-wider text-gray-900 dark:text-gray-200">
          <Typewriter
            options={{
              wrapperClassName: "text-gray-900 dark:text-gray-200 ml-4 ",
              strings: ["Available Products"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-300 bg-gradient-to-r from-gray-100 to-gray-200 p-4 shadow-lg dark:border-gray-600 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
          <div className="w-3/12">
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="w-2/12">
            <SelectBox
              pageSize={pageSize}
              setPageSize={(value) => {
                setPageSize(parseInt(value, 10));
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <ProductsSpinner count={12} />
        ) : (
          <>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {products && products.length > 0 ? (
                <>
                  {products.map((product) => (
                    <ProductCard
                      product={product}
                      key={product._id}
                    />
                  ))}
                </>
              ) : (
                <div className="flex min-h-[250px] w-full items-center justify-center">
                  <h1 className="text-4xl italic text-gray-400 dark:text-gray-600">
                    No Products Found
                  </h1>
                </div>
              )}
            </div>
            {products && products.length > 0 && (
              <div className="mt-4 flex items-center justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AllProducts;
