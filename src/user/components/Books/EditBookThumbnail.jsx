import {
  fetchBookThunk,
  selectBook,
  selectBookIsLoading,
  updateBookThumbnailThunk,
} from "@storeVars";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@commonPartials";
import { BookSpinner } from "@loadingState";

import showToast from "@utils/toastAlert/toaster";

function EditBookThumbnail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const loading = useSelector(selectBookIsLoading);
  const book = useSelector(selectBook);

  useEffect(() => {
    dispatch(fetchBookThunk(bookId));
  }, [dispatch, bookId]);

  const editThumbnail = async (bookData) => {
    try {
      const res = await dispatch(
        updateBookThumbnailThunk({ bookId, bookData })
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
        <BookSpinner />
      ) : (
        <>
          {book ? (
            <div className="mx-auto my-10 max-w-[900px] rounded-lg border-4 border-blue-500 bg-gray-100 p-10 dark:bg-gray-900">
              <h1 className="mb-4 text-center text-3xl text-white">
                Edit Book Thumbnail
              </h1>
              <form onSubmit={handleSubmit(editThumbnail)}>
                <div className="flex w-full flex-col">
                  <div className="mb-4">
                    <Input
                      type="file"
                      label="Book Thumbnail"
                      placeholder="Select Book Thumbnail"
                      {...register("thumbnail", {
                        required: "Thumbnail is required",
                      })}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.thumbnail && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.thumbnail.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <h1 className="text-center text-3xl text-gray-400 dark:text-gray-300">
              No Book Found For Editing
            </h1>
          )}
        </>
      )}
    </>
  );
}

export default EditBookThumbnail;
