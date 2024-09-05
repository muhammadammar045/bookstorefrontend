import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductThunk,
  selectProductIsLoading,
  selectAllCategories,
  fetchAllCategoriesThunk,
} from "@storeVars";
import { Input, FileInput, Button, Select, Heading } from "@commonPartials";
import showToast from "@utils/toastAlert/toaster";
import { ProductSpinner } from "@loadingState";
import TextEditor from "./TextEditor";

function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "General",
      thumbnail: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectProductIsLoading);
  const categories = useSelector(selectAllCategories);
  const parentCategories = categories.filter(
    (cat) => cat.parentCategory === null
  );
  const p = parentCategories.map((cat) => ({
    id: cat._id,
    name: cat.categoryName,
  }));

  const addProduct = async (productData) => {
    console.log(productData);
    // try {
    //   const res = await dispatch(addProductThunk(productData)).unwrap();
    //   showToast("success", `${res.message}`);
    //   navigate("/products");
    //   reset();
    // } catch (error) {
    //   showToast("error", `${error.message}`);
    // }
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ProductSpinner />
      ) : (
        <div className="mx-auto my-10 max-w-3xl rounded-lg border-2 border-gray-900 bg-gray-200 p-10 dark:border-gray-500 dark:bg-gray-900">
          <Heading>Add Product</Heading>
          <form onSubmit={handleSubmit(addProduct)}>
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

            <div className="mb-5">
              <FileInput
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
              />
            </div>

            {/* DESCRIPTION */}
            <TextEditor
              name={"description"}
              label={"Description : "}
              defaultValues={getValues("description")}
              control={control}
            />

            {/* SUBMIT */}
            <div className="mb-2">
              <Button>Add Product</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddProduct;
