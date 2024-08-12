import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showToast from "@utils/toastAlert/toaster";
import { ReactTable } from "@commonPartials";
import { SkeletonTable } from "@loadingState";
import { useNavigate } from "react-router-dom";
import {
  deleteCategoryThunk,
  fetchAllCategoriesThunk,
  fetchCategoryThunk,
  selectAllCategories,
  selectCategoryIsLoading,
  resetSelectedCategory,
} from "@storeVars";

function AllCategoriesAdmin() {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const loading = useSelector(selectCategoryIsLoading);
  const navigate = useNavigate();

  const handleEdit = async (categoryId) => {
    try {
      await dispatch(fetchCategoryThunk(categoryId)).unwrap();
      navigate("/admin/categories/add-or-update-category");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await dispatch(deleteCategoryThunk(categoryId)).unwrap();
      showToast("success", `${res.message}`);
      dispatch(resetSelectedCategory());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  const allCategories = useMemo(() => {
    return (
      categories?.map((category) => ({
        id: category._id,
        category: category.categoryName,
        description: category.description,
        parent_category:
          category.parentCategory === null ? "_" : category.parentCategoryName,
        actions: (
          <>
            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleDelete(category._id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              onClick={() => handleEdit(category._id)}
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
  }, [categories]);

  return (
    <main className="grow">
      <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
              All Categories
            </h1>
          </div>
        </div>

        <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? (
            <SkeletonTable
              rows={3}
              columns={3}
            />
          ) : (
            <>
              <div className="w-full">
                <ReactTable data={allCategories} />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default AllCategoriesAdmin;
