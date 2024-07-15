import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookThunk,
  updateBookThunk,
  selectBook,
  selectIsLoading,
} from "../store/book/bookSlice";

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
      await dispatch(updateBookThunk({ bookId, bookData })).unwrap();
      navigate(`/book/${bookId}`);
    } catch (error) {
      console.log("Edit Form Error ", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="border-primary-500 flex h-[350px] items-center justify-center rounded-3xl border-2 bg-black">
          <h2 className="text-3xl">Editing Books </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : book ? (
        <div className="border-primary-500 mx-auto my-10 max-w-[900px] rounded-lg border-4 bg-zinc-800 p-10">
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
                  <span className="text-red-500">{errors.title.message}</span>
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
                  <span className="text-red-500">
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
                  <span className="text-red-500">{errors.price.message}</span>
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
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <Button
                type="submit"
                bgColor="outline-none hover:bg-primary-500"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-white hover:text-black"
                className="hover:shadow-primary-500 shadow-lg outline outline-cyan-600"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <h1 className="text-center text-3xl">No Book Found For Editing</h1>
      )}
    </>
  );
}

export default EditBook;
