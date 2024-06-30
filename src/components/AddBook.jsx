import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import envVars from "../../envexport";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

function AddBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addBook = async (data) => {
    setLoading(true);
    try {
      const newBook = {
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        thumbnail: data.thumbnail[0],
      };
      const addBook = await axios.post(
        `${envVars.backend_uri}/books/add-book`,
        newBook,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (addBook) {
        console.log(addBook?.data?.data);
        console.log(addBook.data.message);
      }
      navigate("/all-books");
      reset();
    } catch (error) {
      console.log("Error Adding The book:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto my-10 max-w-[900px] rounded-lg bg-zinc-800 p-10">
        <h1 className="mb-4 text-center text-3xl text-white">Add Book</h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <ClimbingBoxLoader color="white" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(addBook)}>
            <div className="flex w-full">
              <div className="mb-4 mr-1 w-6/12">
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
              <div className="mb-4 mr-1 w-6/12">
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

              <div className="mb-4 ml-1 w-6/12">
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
            <div className="mb-4">
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
                bgColor="bg-blue-600 hover:bg-green-400"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-white"
              >
                Add Book
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddBook;
