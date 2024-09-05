import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProductsThunk,
  selectCategoryProducts,
  selectCategoryIsLoading,
  selectPageSize,
  selectPaginationCurrentPage,
  selectSearchQuery,
  selectSort,
  selectSortOrder,
  selectTotalPages,
} from "@storeVars";
import { Pagination, FilterSideBar, Heading } from "@commonPartials";
import { ProductsSpinner } from "@loadingState";
import { ProductCard } from "@userComponents";

import { useParams } from "react-router-dom";

function CategoryProducts() {
  const dispatch = useDispatch();
  const categoryId = useParams().categoryId;
  const categoryProducts = useSelector(selectCategoryProducts);
  const loading = useSelector(selectCategoryIsLoading);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectPaginationCurrentPage);
  const searchQuery = useSelector(selectSearchQuery);
  const sort = useSelector(selectSort);
  const sortOrder = useSelector(selectSortOrder);
  const limit = useSelector(selectPageSize);
  // console.log(categoryId);

  useEffect(() => {
    dispatch(fetchCategoryProductsThunk(categoryId));
  }, [dispatch, categoryId]);

  return (
    <div className="flex">
      <div className="w-2/12 border-e-2 border-gray-300 p-4 dark:border-violet-700 dark:bg-gray-950">
        <FilterSideBar />
      </div>
      <div className="w-10/12 p-8">
        <Heading>Latest Products</Heading>

        {loading ? (
          <ProductsSpinner count={12} />
        ) : (
          <>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts?.length > 0 ? (
                categoryProducts.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                  />
                ))
              ) : (
                <div className="flex w-full items-center justify-center">
                  <Heading>No Products Found In Category</Heading>
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

export default CategoryProducts;
