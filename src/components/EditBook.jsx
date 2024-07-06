import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import envVars from "../../envexport";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/user/userAuthSlice";

function EditBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [modifyValues, setModifyValues] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${envVars.backend_uri}/books/get-book/${bookId}`,
        config
      );
      const fetchedBook = response.data.data;

      setValue("title", fetchedBook.title);
      setValue("description", fetchedBook.description);
      setValue("price", fetchedBook.price);
      setValue("category", fetchedBook.category);
      setBook(fetchedBook);
      setInitialValues({
        title: fetchedBook.title,
        description: fetchedBook.description,
        price: fetchedBook.price,
        category: fetchedBook.category,
      });
    } catch (error) {
      console.log("Error Fetching The book:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const editForm = async (data) => {
    const bookDetails = {};
    const fields = ["title", "description", "price", "category"];

    fields.forEach((field) => {
      if (data[field] !== initialValues[field]) {
        bookDetails[field] = data[field];
      }
    });

    if (Object.keys(bookDetails).length === 0) {
      console.log("No changes made");
      setModifyValues("No Changes Recorded");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `${envVars.backend_uri}/books/update-book/${bookId}`,
        bookDetails,
        config
      );

      console.log(response.data.message);
      navigate(`/all-books`);
    } catch (error) {
      console.log("Edit Form Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-[350px] items-center justify-center rounded-3xl border-2 border-orange-300 bg-black">
          <h2 className="text-3xl">Editing Books </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : book ? (
        <div className="mx-auto my-10 max-w-[900px] rounded-lg border-2 border-orange-300 bg-zinc-800 p-10">
          <h1 className="mb-4 text-center text-3xl text-white">
            Edit Book Details
          </h1>
          <form onSubmit={handleSubmit(editForm)}>
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

            {modifyValues && (
              <div className="mb-2 text-red-600">Modify At least one Field</div>
            )}

            <div className="mb-2">
              <Button
                type="submit"
                bgColor="bg-blue-600 hover:bg-green-400"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-white"
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
