import {
  fetchBookThunk,
  selectBook,
  selectIsLoading,
  updateBookThumbnailThunk,
} from "../../store/book/bookSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "../AllComponents";

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

  useEffect(() => {
    dispatch(fetchBookThunk(bookId));
  }, []);

  const editThumbnail = async (bookData) => {
    try {
      await dispatch(updateBookThumbnailThunk({ bookId, bookData })).unwrap();
      navigate(`/book/${bookId}`);
    } catch (error) {
      console.error("Error updating book thumbnail: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-tertiary border-primary mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2">
          <h2 className="text-3xl">Updating Book Thumbnail </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <>
          {book ? (
            <div className="border-primary bg-tertiary mx-auto my-10 max-w-[900px] rounded-lg border-4 p-10">
              <h1 className="text-primary mb-4 text-center text-3xl">
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
                      bgColor="outline-none hover:bg-primary"
                      padding="px-5 py-2"
                      rounded="rounded-lg"
                      textColor="text-primary hover:text-black"
                      className="hover:shadow-primary shadow-lg outline outline-cyan-600"
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
