import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookThunk,
  selectBook,
  selectIsLoading,
  updateBookThumbnailThunk,
} from "../store/book/bookSlice";

function EditBookThumbnail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const loading = useSelector(selectIsLoading);
  const book = useSelector(selectBook);
  console.log(book);

  useEffect(() => {
    dispatch(fetchBookThunk(bookId));
  }, []);

  const editThumbnail = async (bookData) => {
    try {
      await dispatch(updateBookThumbnailThunk({ bookId, bookData })).unwrap();
      navigate(`/all-books`);
    } catch (error) {
      console.error("Error updating book thumbnail: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 border-orange-300 bg-black">
          <h2 className="text-3xl">Updating Book Thumbnail </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <>
          {book ? (
            <div className="mx-auto my-10 max-w-[900px] rounded-lg border-2 border-orange-300 bg-zinc-800 p-10">
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
