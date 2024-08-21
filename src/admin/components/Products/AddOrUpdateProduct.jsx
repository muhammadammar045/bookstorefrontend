import {
  updateProductThunk,
  selectProduct,
  selectProductIsLoading,
  updateProductThumbnailThunk,
  addProductThunk,
  resetSelectedProduct,
  selectAllCategories,
  fetchAllCategoriesThunk,
} from "@storeVars";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Select } from "@commonPartials";
import { ProductSpinner } from "@loadingState";
import showToast from "@utils/toastAlert/toaster";

function AddOrUpdateProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const loading = useSelector(selectProductIsLoading);
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const parentCategories = categories.filter(
    (cat) => cat.parentCategory === null
  );
  const p = parentCategories.map((cat) => ({
    id: cat._id,
    name: cat.categoryName,
  }));

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("category", product.category.name);
      setValue("price", product.price);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk);
  }, [dispatch]);
  const onSubmit = async (productData) => {
    console.log(productData);
    try {
      if (product) {
        if (productData.thumbnail.length > 0) {
          console.log("Thumbnail");
          const thumbnailRes = await dispatch(
            updateProductThumbnailThunk({
              productId: product._id,
              productData,
            })
          ).unwrap();
          console.log(thumbnailRes);
          showToast("success", `${thumbnailRes.message}`);
        }

        const contentUpdated = [
          "title",
          "category",
          "price",
          "description",
        ].some((key) => productData[key] && productData[key] !== product[key]);

        if (contentUpdated) {
          console.log("Content");
          const contentRes = await dispatch(
            updateProductThunk({
              productId: product._id,
              productData,
            })
          ).unwrap();
          showToast("success", `${contentRes.message}`);
          navigate(`/admin/products/all-products`);
        }
      } else {
        const res = await dispatch(addProductThunk(productData)).unwrap();
        showToast("success", `${res.message}`);
        dispatch(resetSelectedProduct());
      }
      navigate(`/admin/products/all-products`);
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <ProductSpinner />
      ) : (
        <div className="mx-auto my-10 max-w-3xl rounded-lg border-2 border-gray-900 bg-gray-200 p-10 dark:border-gray-500 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-gray-200">
            {product ? "Edit Product Details" : "Add New Product"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full">
              {/* TITLE */}
              <div className="mx-1 mb-4 w-4/12">
                <Input
                  type="text"
                  label="Title"
                  placeholder="Enter Product Title"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 4,
                      message: "Title should be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Title should not exceed 30 characters",
                    },
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 dark:text-red-300">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* CATEGORY */}
              <div className="mx-1 mb-4 w-4/12">
                <Select
                  label="Category"
                  options={p}
                  {...register("category")}
                />
                {errors.category && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* PRICE */}
              <div className="w-/12 mx-1 mb-4">
                <Input
                  type="text"
                  label="Price"
                  placeholder="Enter Product Price"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price should be at least 1" },
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 dark:text-red-300">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mb-2">
              <Input
                type="textarea"
                className="min-h-32"
                label="Description"
                placeholder="Enter Product Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 dark:text-red-300">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* THUMBNAIL */}
            <div className="mb-5">
              <Input
                type="file"
                label="Product Thumbnail"
                placeholder="Select Product Thumbnail"
                {...register("thumbnail")}
              />
              {errors.thumbnail && (
                <span className="text-red-500 dark:text-red-300">
                  {errors.thumbnail.message}
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <div className="mb-2">
              <Button>{product ? "Update Product" : "Add Product"}</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddOrUpdateProduct;
