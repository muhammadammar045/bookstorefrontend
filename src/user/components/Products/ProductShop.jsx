import {
  selectProducts,
  selectProductIsLoading,
  selectTotalDocuments,
  fetchCurrentUserProductsThunk,
  selectPageSize,
  selectPaginationCurrentPage,
  selectSearchQuery,
  selectSort,
  selectSortOrder,
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
  const totalProducts = useSelector(selectTotalDocuments);
  const currentPage = useSelector(selectPaginationCurrentPage);
  const searchQuery = useSelector(selectSearchQuery);
  const sort = useSelector(selectSort);
  const sortOrder = useSelector(selectSortOrder);
  const limit = useSelector(selectPageSize);

  useEffect(() => {
    dispatch(
      fetchCurrentUserProductsThunk({
        page: currentPage,
        searchQuery,
        sort,
        sortOrder,
        limit,
      })
    );
  }, [dispatch, currentPage, searchQuery, sort, sortOrder, limit]);

  return (
    <div className="flex">
      <div className="w-2/12 p-4 dark:bg-gray-950">
        <FilterSideBar />
      </div>
      <div className="w-10/12 p-8">
        <Heading>Latest Products</Heading>
        {loading ? (
          <ProductsSpinner count={12} />
        ) : (
          <>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
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

            {totalProducts > 0 && (
              <div className="mt-4 flex items-center justify-center">
                <Pagination totalItems={totalProducts} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
