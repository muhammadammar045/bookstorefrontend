import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import envVars from "../../envexport";
import Input from "./Input";
import Button from "./Button";
import { ClimbingBoxLoader } from "react-spinners";

function EditBookThumbnail() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editBook = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${envVars.backend_uri}/books/get-book/${bookId}`
      );
      const fetchedBook = response.data.data;
      setBook(fetchedBook);
    } catch (error) {
      console.error("Error fetching book: ", error);
    } finally {
      setLoading(false);
    }
  };

  const editThumbnail = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await axios.patch(
        `${envVars.backend_uri}/books/update-book-thumbnail/${bookId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data.message);
      navigate(`/all-books`);
    } catch (error) {
      console.error("Error updating book thumbnail: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    editBook();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <ClimbingBoxLoader color="white" />
        </div>
      ) : (
        <>
          {book ? (
            <div className="mx-auto my-10 max-w-[900px] rounded-lg bg-zinc-800 p-10">
              <h1 className="mb-4 text-center text-3xl text-white">
                Edit Book Thumbnail
              </h1>
              <form onSubmit={handleSubmit(editThumbnail)}>
                <div className="flex w-full flex-col">
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
                      <span className="text-red-500">
                        {errors.thumbnail.message}
                      </span>
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
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <h1 className="text-center text-3xl">No Book Found For Editing</h1>
          )}
        </>
      )}
    </>
  );
}

export default EditBookThumbnail;
