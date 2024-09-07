import {
  selectProductIsLoading,
  fetchAllProductReviewsThunk,
  selectProductReviewsCount,
  selectProductReviewsAverageRating,
} from "@storeVars";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductSpinner } from "@loadingState";
import { Like, ProductComments, Rating } from "@userComponents";
import { selectSingleProduct } from "../../../store/products/productSlice";

function Product() {
  const { productId } = useParams();
  const loading = useSelector(selectProductIsLoading);
  const dispatch = useDispatch();
  const product = useSelector((state) => selectSingleProduct(state, productId));
  const average = useSelector(selectProductReviewsAverageRating);
  const count = useSelector(selectProductReviewsCount);

  useEffect(() => {
    dispatch(fetchAllProductReviewsThunk(productId));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <ProductSpinner />
      ) : (
        product && (
          <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                  <div className="grid gap-3">
                    {/* PRODUCT THUMBNAIL IMAGE */}
                    <div>
                      <img
                        className="mx-auto h-auto max-w-full rounded-lg"
                        src={product?.productThumbnail}
                        alt=""
                      />
                    </div>
                    <div className="grid gap-4 p-5 lg:grid-cols-4">
                      {/* PRODUCT SMALL IMAGES */}
                      {product?.productImages?.map((image) => (
                        <div key={image}>
                          <img
                            className="h-auto max-w-full rounded-md"
                            src={image}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="mt-6 sm:mt-8 lg:mt-0">
                    {/* PRODUCT TITLE */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {product.productTitle}
                    </h1>
                    <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                      {/* PRODUCT PRICE */}
                      <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                        Rs {product.productPrice}
                      </p>
                      <div className="mt-2 flex items-center gap-2 sm:mt-0">
                        {/* PRODUCT RATING */}
                        <div className="flex items-center gap-1">
                          <Rating reviewRating={average} />
                        </div>
                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                          ({average})
                        </p>

                        {/* PRODUCT REVIEWS COUNT */}
                        <Link
                          to="#"
                          className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                        >
                          {count} Reviews
                        </Link>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                      {/* ADD TO FAVORITE */}
                      <Like
                        productId={product._id}
                        isLiked={product?.isLiked}
                      />

                      {/* ADD TO CART */}
                      <Link
                        to="#"
                        title=""
                        className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:mt-0"
                        role="button"
                      >
                        <span className="mx-2">
                          <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        Add to cart
                      </Link>
                    </div>
                    <hr className="my-6 border-gray-200 dark:border-gray-800 md:my-8" />
                    {/* PRODUCT DESCRIPTION */}
                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                      {product.productDescription}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <ProductComments />
          </>
        )
      )}
    </>
  );
}

export default Product;
