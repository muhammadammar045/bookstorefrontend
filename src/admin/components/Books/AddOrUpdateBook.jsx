import {
  updateBookThunk,
  selectBook,
  selectBookIsLoading,
  updateBookThumbnailThunk,
  addBookThunk,
  resetSelectedBook,
} from "@storeVars";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@commonPartials";
import { BookSpinner } from "@loadingState";
import showToast from "@utils/toastAlert/toaster";

function AddOrUpdateBook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const book = useSelector(selectBook);
  const loading = useSelector(selectBookIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("category", book.category);
      setValue("price", book.price);
      setValue("description", book.description);
    }
  }, [book, setValue]);

  const onSubmit = async (bookData) => {
    console.log(bookData);
    try {
      if (book) {
        if (bookData.thumbnail.length > 0) {
          console.log("Thumbnail");
          const thumbnailRes = await dispatch(
            updateBookThumbnailThunk({
              bookId: book._id,
              bookData,
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
        ].some((key) => bookData[key] && bookData[key] !== book[key]);

        if (contentUpdated) {
          console.log("Content");
          const contentRes = await dispatch(
            updateBookThunk({
              bookId: book._id,
              bookData,
            })
          ).unwrap();
          showToast("success", `${contentRes.message}`);
          navigate(`/admin/books/all-books`);
        }
      } else {
        const res = await dispatch(addBookThunk(bookData)).unwrap();
        showToast("success", `${res.message}`);
        dispatch(resetSelectedBook());
      }
      navigate(`/admin/books/all-books`);
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <BookSpinner />
      ) : (
        <div className="mx-auto my-10 max-w-3xl rounded-lg border-2 border-gray-900 bg-gray-200 p-10 dark:border-gray-500 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-gray-200">
            {book ? "Edit Book Details" : "Add New Book"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full">
              <div className="mx-1 mb-4 w-4/12">
                <Input
                  type="text"
                  label="Title"
                  placeholder="Enter Book Title"
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
                  <span className="text-red-500 dark:text-red-400">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="mx-1 mb-4 w-4/12">
                <Input
                  type="text"
                  label="Category"
                  placeholder="Enter Book Category"
                  {...register("category", {
                    minLength: {
                      value: 4,
                      message: "Category should be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Category should not exceed 30 characters",
                    },
                  })}
                />
                {errors.category && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="mx-1 mb-4 w-4/12">
                <Input
                  type="text"
                  label="Price"
                  placeholder="Enter Book Price"
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
                  <span className="text-red-500 dark:text-red-400">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <Input
                type="textarea"
                className="min-h-32"
                label="Description"
                placeholder="Enter Book Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="file"
                label="Book Thumbnail"
                placeholder="Select Book Thumbnail"
                {...register("thumbnail")}
                className="text-gray-900 dark:text-gray-200"
              />
              {errors.thumbnail && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.thumbnail.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <Button type="submit">{book ? "Update Book" : "Add Book"}</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddOrUpdateBook;
