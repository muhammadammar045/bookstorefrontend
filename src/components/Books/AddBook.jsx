import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { addBookThunk } from "../../store/book/bookSlice";
import { Input, Button } from "../AllComponents";

function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addBook = async (bookData) => {
    setLoading(true);
    try {
      await dispatch(addBookThunk(bookData)).unwrap();
      navigate("/books");
      reset();
    } catch (error) {
      console.log("Error Adding The book:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="border-primary bg-tertiary mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2">
          <h2 className="text-3xl">Adding Book </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <div className="border-primary bg-tertiary mx-auto my-10 max-w-[900px] rounded-lg border-4 p-10">
          <h1 className="text-primary mb-4 text-center text-3xl">Add Book</h1>
          <form onSubmit={handleSubmit(addBook)}>
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
                  placeholder="Enter Book Title"
                  {...register("category", {
                    // required: "Category is required",
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
            <div className="mb-2">
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
            <div className="mb-5">
              <Input
                type="file"
                label="Book Thumbnail"
                text={"text-gray-400"}
                placeholder="Select Book Thumbnail"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
              />
              {errors.thumbnail && (
                <span className="text-red-500">{errors.thumbnail.message}</span>
              )}
            </div>
            <div className="mb-2">
              <Button
                type="submit"
                bgColor="outline-none hover:bg-primary"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-primary hover:text-black"
                className="hover:shadow-primary shadow-lg outline outline-cyan-600"
              >
                Add Book
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddBook;