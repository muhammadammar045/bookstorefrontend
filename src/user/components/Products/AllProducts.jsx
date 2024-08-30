import {
  selectProducts,
  selectProductIsLoading,
  selectTotalDocuments,
  fetchAllUsersProductsThunk,
  selectSearchValue,
  selectPageSize,
  selectPaginationCurrentPage,
} from "@storeVars";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, FilterSideBar } from "@commonPartials";
import { ProductsSpinner } from "@loadingState";
import { ProductCard } from "@userComponents";

function AllProducts() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductIsLoading);
  const products = useSelector(selectProducts);
  const searchValue = useSelector(selectSearchValue);
  const currentPage = useSelector(selectPaginationCurrentPage);
  const totalProducts = useSelector(selectTotalDocuments);
  const limit = useSelector(selectPageSize);

  useEffect(() => {
    dispatch(
      fetchAllUsersProductsThunk({
        page: currentPage,
        query: searchValue,
        limit: limit,
      })
    );
  }, [dispatch, currentPage, searchValue, limit]);

  return (
    <>
      <div className="flex">
        <div className="w-2/12 border-e-2 border-gray-300 p-4 dark:border-violet-700 dark:bg-gray-950">
          <FilterSideBar />
        </div>
        <div className="w-10/12 p-8">
          <h1 className="mb-5 py-2 text-center text-4xl font-bold tracking-wider text-gray-900 dark:text-gray-200">
            Latest Products
          </h1>
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
                  <div className="flex w-full items-center justify-center">
                    <h1 className="text-4xl italic text-gray-400 dark:text-gray-600">
                      No Products Found
                    </h1>
                  </div>
                )}
              </div>

              {totalProducts > limit && (
                <div className="mt-4 flex items-center justify-center">
                  <Pagination />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
