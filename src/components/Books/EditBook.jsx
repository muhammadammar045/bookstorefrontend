import {
  fetchBookThunk,
  updateBookThunk,
  selectBook,
  selectIsLoading,
} from "../../store/book/bookSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "../AllComponents";
import showToast from "../../utils/toastAlert/toaster";

function EditBook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const book = useSelector(selectBook);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookThunk(bookId));
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("category", book.category);
      setValue("price", book.price);
      setValue("description", book.description);
    }
  }, [book, setValue]);

  const editForm = async (bookData) => {
    try {
      const res = await dispatch(
        updateBookThunk({ bookId, bookData })
      ).unwrap();

      showToast("success", `${res.message}`);
      navigate(`/book/${bookId}`);
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div
            role="status"
            className="my-10 w-full animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
          >
            <div className="mb-4 flex h-80 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700" />

            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : book ? (
        <div className="mx-auto my-10 max-w-[900px] rounded-lg border-4 border-blue-500 bg-gray-100 p-10 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-white">
            Edit Book Details
          </h1>
          <form onSubmit={handleSubmit(editForm)}>
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
            <div className="mb-2">
              <Button
                type="submit"
                bgColor="outline-none hover:bg-blue-600 dark:hover:bg-blue-700"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-blue-500 hover:text-white dark:text-blue-400 dark:hover:text-white"
                className="shadow-lg outline outline-blue-600 hover:shadow-blue-500 dark:outline-blue-400 dark:hover:shadow-blue-300"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <h1 className="text-center text-3xl text-gray-400 dark:text-gray-300">
          No Book Found For Editing
        </h1>
      )}
    </>
  );
}

export default EditBook;
