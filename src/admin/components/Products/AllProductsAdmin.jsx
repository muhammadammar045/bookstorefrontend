import React, { useEffect, useMemo } from "react";
import { ReactTable } from "@commonPartials";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductIsLoading,
  selectAdminProducts,
  fetchAllUsersProductsAdminThunk,
  fetchProductThunk,
  deleteProductThunk,
  resetSelectedProduct,
} from "@storeVars";
import showToast from "@utils/toastAlert/toaster";
import { SkeletonTable } from "@loadingState";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function AllProductsAdmin() {
  const products = useSelector(selectAdminProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectProductIsLoading);

  console.log(products);
  const handleEdit = async (productId) => {
    try {
      await dispatch(fetchProductThunk(productId)).unwrap();
      navigate("/admin/products/add-or-update-product");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProductThunk(productId)).unwrap();
      showToast("success", "Product deleted successfully");
      dispatch(resetSelectedProduct());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsersProductsAdminThunk());
  }, [dispatch]);

  const allProducts = useMemo(() => {
    return (
      products?.map((product) => ({
        id: product._id,
        PImage: (
          <img
            className="w-16 rounded-lg"
            src={product.productThumbnail}
            alt={product.productTitle}
          />
        ),
        title: product.productTitle,
        category: product.categoryDetails.categoryName,
        author: product.ownerDetails.userName,
        total_reviews: product.productReviewsCount,
        createdAt: product.createdAt.slice(0, 10),
        updatedAt: product.updatedAt.slice(0, 10),
        actions: (
          <>
            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleDelete(product._id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              onClick={() => handleEdit(product._id)}
              className="duration-700 hover:scale-150"
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  color="green"
                />
              </span>
            </button>
          </>
        ),
      })) || []
    );
  }, [products]);

  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                All Products
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <SkeletonTable
                  rows={4}
                  columns={4}
                />
              </>
            ) : (
              <div className="w-full">
                <ReactTable data={allProducts} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllProductsAdmin;
