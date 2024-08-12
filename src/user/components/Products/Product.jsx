import {
  deleteProductThunk,
  fetchProductThunk,
  selectProduct,
  selectProductIsLoading,
  selectUserPermissions,
} from "@storeVars";
import { faCamera, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showToast from "@utils/toastAlert/toaster";
import { ProductSpinner } from "@loadingState";

function Product() {
  const loading = useSelector(selectProductIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const { productId } = useParams();
  const permissions = useSelector(selectUserPermissions);

  const handleEditThumbnail = () => {
    navigate(`/edit-product-thumbnail/${productId}`);
  };

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteProductThunk(productId)).unwrap();
      showToast("success", `${res.message}`);
      navigate("/products");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchProductThunk(productId));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ProductSpinner />
      ) : (
        <div className="my-10 rounded-lg border-2 border-gray-400 bg-gray-200 p-3 dark:border-gray-600 dark:bg-gray-900">
          {/* THUMBNAIL AND CHANGE THUMBNAIL BUTTON */}
          <div className="relative">
            <div>
              <img
                className="max-h-[500px] w-full rounded-lg border-2 border-gray-400 bg-cover dark:border-gray-600"
                src={product?.thumbnail}
                alt={product?.title || "Product Thumbnail"}
              />
            </div>
            {permissions.includes("update") && (
              <div className="absolute right-6 top-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-400 duration-700 hover:scale-125 dark:border-gray-200 dark:bg-gray-900">
                <button onClick={handleEditThumbnail}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    size="2x"
                    color="lightgreen"
                  />
                </button>
              </div>
            )}
          </div>

          {/* PRODUCT DETAILS */}
          <div>
            {/*PRODUCT CATEGORY AND ACTION BUTTONS */}
            <div className="mt-8 flex items-center justify-between">
              <Link>
                <h5 className="ml-2 text-lg font-semibold text-gray-900 duration-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-300">
                  {product?.category?.name}
                </h5>
              </Link>
              <span className="">
                {permissions.includes("delete") && (
                  <button
                    className="duration-700 hover:scale-150"
                    onClick={handleDelete}
                  >
                    <span className="px-4">
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="2x"
                        color="red"
                      />
                    </span>
                  </button>
                )}
                {permissions.includes("update") && (
                  <button
                    onClick={handleEdit}
                    className="duration-700 hover:scale-150"
                  >
                    <span className="px-4">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="2x"
                        color="green"
                      />
                    </span>
                  </button>
                )}
              </span>
            </div>

            {/* PRODUCT TITLE */}
            <h1 className="ml-1 pt-2 text-3xl font-bold text-gray-600 dark:text-gray-200">
              {product?.title}
            </h1>

            {/* PRODUCT DESCRIPTION */}
            <p className="ml-2 pt-2 text-lg text-gray-700 dark:text-gray-400">
              {product?.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
