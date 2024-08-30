import {
  selectProducts,
  selectProductIsLoading,
  selectTotalDocuments,
  fetchCurrentUserProductsThunk,
  selectSearchValue,
  selectPageSize,
  selectPaginationCurrentPage,
} from "@storeVars";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@commonPartials";
import { ProductsSpinner } from "@loadingState";
import { ProductCard } from "@userComponents";
import Typewriter from "typewriter-effect";

function ProductShop() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductIsLoading);
  const products = useSelector(selectProducts);
  const searchValue = useSelector(selectSearchValue);
  const currentPage = useSelector(selectPaginationCurrentPage);
  const totalProducts = useSelector(selectTotalDocuments);
  const limit = useSelector(selectPageSize);

  useEffect(() => {
    dispatch(
      fetchCurrentUserProductsThunk({
        page: currentPage,
        query: searchValue,
        limit: limit,
      })
    );
  }, [dispatch, currentPage, searchValue, limit]);

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

            {totalProducts > limit && (
              <div className="mt-4 flex items-center justify-center">
                <Pagination />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ProductShop;
