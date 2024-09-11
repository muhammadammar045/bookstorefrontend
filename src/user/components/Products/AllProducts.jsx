import {
  selectProducts,
  selectProductIsLoading,
  selectTotalPages,
  fetchAllUsersProductsThunk,
  selectPageSize,
  selectPaginationCurrentPage,
  selectSearchQuery,
  selectSort,
  selectSortOrder,
  selectFilterShow,
  selectPriceRange,
} from "@storeVars";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, FilterSideBar, Heading } from "@commonPartials";
import { ProductsSpinner } from "@loadingState";
import { ProductCard } from "@userComponents";

function AllProducts() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductIsLoading);
  const products = useSelector(selectProducts) || [];
  const filterShow = useSelector(selectFilterShow);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectPaginationCurrentPage);
  const searchQuery = useSelector(selectSearchQuery);
  const sort = useSelector(selectSort);
  const priceRange = useSelector(selectPriceRange);
  const sortOrder = useSelector(selectSortOrder);
  const limit = useSelector(selectPageSize);

  useEffect(() => {
    dispatch(
      fetchAllUsersProductsThunk({
        page: currentPage,
        searchQuery,
        sort,
        sortOrder,
        limit,
        priceRange,
      })
    );
  }, [dispatch, currentPage, searchQuery, sort, sortOrder, limit, priceRange]);

  return (
    <div className="flex">
      {filterShow && (
        <div className="w-2/12 p-4 dark:bg-gray-950">
          <FilterSideBar />
        </div>
      )}

      <div className={`${filterShow ? "w-10/12" : "w-full"} p-8`}>
        <Heading>Latest Products</Heading>

        {loading ? (
          <ProductsSpinner count={12} />
        ) : (
          <>
            <div
              className={`mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 ${filterShow ? "xl:grid-cols-4" : "xl:grid-cols-5"}`}
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                  />
                ))
              ) : (
                <div className="flex w-full items-center justify-center">
                  <Heading>No Products Found</Heading>
                </div>
              )}
            </div>

            {totalPages > 0 && (
              <div className="mt-4 flex items-center justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
