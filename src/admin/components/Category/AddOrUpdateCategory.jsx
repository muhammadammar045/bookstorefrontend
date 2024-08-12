import React, { useEffect } from "react";
import { Button, Input, Select } from "@commonPartials";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import showToast from "@utils/toastAlert/toaster";
import { useNavigate } from "react-router-dom";
import {
  addCategoryThunk,
  updateCategoryThunk,
  selectCategory,
  selectAllCategories,
  selectCategoryIsLoading,
  resetSelectedCategory,
} from "@storeVars";
import { Spinner } from "@loadingState";

function AddOrUpdateCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector(selectCategory);
  const loading = useSelector(selectCategoryIsLoading);
  const categories = useSelector(selectAllCategories);
  const parentCategories = categories.filter(
    (cat) => cat.parentCategory === null
  );
  const p = parentCategories.map((cat) => ({
    id: cat._id,
    name: cat.categoryName,
  }));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: "",
      description: "",
    },
  });

  const handleReset = () => {
    dispatch(resetSelectedCategory());
  };

  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
      setValue("description", category.description);
      setValue("parentCategoryName", category.parentCategoryName);
    } else {
      reset();
    }
  }, [category, setValue, reset]);

  // console.log(category);

  const handleCategory = async (data) => {
    console.log(data);
    try {
      let res;
      if (category) {
        res = await dispatch(
          updateCategoryThunk({
            categoryId: category._id,
            categoryData: data,
          })
        ).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/categories/all-categories");
      } else {
        res = await dispatch(addCategoryThunk(data)).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/categories/all-categories");
      }
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-gray-800 dark:shadow-neutral-700/70 md:p-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <form onSubmit={handleSubmit(handleCategory)}>
            <div className="flex w-full flex-col">
              <div className="mb-4">
                <Input
                  type="text"
                  label=""
                  placeholder="Enter Category Name"
                  {...register("categoryName", {
                    required: "Category Name is required",
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.categoryName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.categoryName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  label=""
                  placeholder="Enter Category Description"
                  {...register("description", {
                    required: "Category description is required",
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.description && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {category && (
                <div className="mb-4">
                  <Select
                    options={p}
                    {...register("parentCategoryName")}
                  />
                  {errors.parentCategoryName && (
                    <span className="text-red-500 dark:text-red-400">
                      {errors.parentCategoryName.message}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-4">
                <Button padding="px-6 py-2 mx-1">Submit</Button>
                <Button
                  type="reset"
                  padding="px-6 py-2 mx-1"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddOrUpdateCategory;
