import {
  deleteProductThunk,
  fetchProductThunk,
  selectProduct,
  selectProductIsLoading,
  selectUserPermissions,
  openModal,
  closeModal,
} from "@storeVars";
import {
  faShoppingCart,
  faEdit,
  faTrash,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showToast from "@utils/toastAlert/toaster";
import { ProductSpinner } from "@loadingState";
import Modal from "@utils/modal/Modal";
import { selectShowModal } from "../../../store/storeVars";
import { Rating, Like, ProductComments } from "@userComponents";

function Product() {
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmFunction, setOnConfirmFunction] = useState(() => () => {});
  const loading = useSelector(selectProductIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const { productId } = useParams();
  const permissions = useSelector(selectUserPermissions);
  const showModal = useSelector(selectShowModal);

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = () => {
    setModalMessage("Are you sure you want to delete this product?");
    setOnConfirmFunction(() => async () => {
      try {
        const res = await dispatch(deleteProductThunk(productId)).unwrap();
        showToast("success", `${res.message}`);
        navigate("/products");
      } catch (error) {
        showToast("error", `${error.message}`);
      }
    });
    dispatch(openModal());
  };

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
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
                  <div className="grid gap-4">
                    {/* PRODUCT THUMBNAIL IMAGE */}
                    <div>
                      <img
                        className="mx-auto h-auto max-w-full rounded-lg"
                        src={product?.productThumbnail}
                        alt=""
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-5">
                      {/* PRODUCT SMALL IMAGES */}
                      {product?.productImages?.map((image) => (
                        <div key={image}>
                          <img
                            className="h-auto max-w-full rounded-lg"
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
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                      {product.productTitle}
                    </h1>
                    <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                      {/* PRODUCT PRICE */}
                      <p className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                        $ {product.productPrice}
                      </p>
                      <div className="mt-2 flex items-center gap-2 sm:mt-0">
                        {/* PRODUCT RATING */}
                        <div className="flex items-center gap-1">
                          <Rating reviewRating={product.productAverageRating} />
                        </div>
                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                          ({product.productAverageRating})
                        </p>

                        {/* PRODUCT REVIEWS COUNT */}
                        <Link
                          to="#"
                          className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                        >
                          {product.productReviewsCount} Reviews
                        </Link>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                      {/* ADD TO FAVORITE */}
                      <Like isLiked={product?.isLiked} />

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
                    {/* <p className="mb-6 text-gray-500 dark:text-gray-400"> */}
                    {product.productDescription}
                    {/* </p> */}
                  </div>
                </div>
              </div>
            </section>

            {/* PRODUCT COMMENTS SECTION */}
            <ProductComments
              reviews={product?.productReviews}
              productReviewsCount={product?.productReviewsCount}
              productAverageRating={product?.productAverageRating}
              individualStarCounts={product?.individualStarCounts}
            />
          </>
        )
      )}
    </>
  );
}

export default Product;
