import {
  deleteBookThunk,
  fetchBookThunk,
  selectBook,
  selectIsLoading,
} from "../store/book/bookSlice";
import {
  faCamera,
  faCartShopping,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { PacmanLoader } from "react-spinners";

function Book() {
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectBook);
  const { bookId } = useParams();

  const onDelete = async () => {
    try {
      await dispatch(deleteBookThunk(book._id)).unwrap();
      navigate("/all-books");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchBookThunk(bookId));
  }, []);

  return (
    <>
      {loading ? (
        <div className="border-primary-500 mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 bg-black">
          <h2 className="text-3xl">Loading Book </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <div className="border-primary-500 my-10 rounded-lg border-4 bg-slate-900 p-10">
          <div className="relative">
            <div>
              <img
                className="border-primary-500 max-h-[500px] w-full rounded-lg border-2 bg-cover"
                src={book?.thumbnail}
                alt=""
              />
            </div>
            <div className="absolute right-6 top-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black duration-700 hover:scale-125">
              <Link to={`/edit-book-thumbnail/${bookId}`}>
                <button>
                  <FontAwesomeIcon
                    icon={faCamera}
                    size="2x"
                    color="red"
                  />
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className="mt-10 flex items-center justify-between">
              <h5 className="text-xl text-gray-500 hover:text-red-400 dark:text-gray-500">
                {book?.category}
              </h5>
              <span className="">
                <button
                  className="duration-700 hover:scale-150"
                  onClick={onDelete}
                >
                  <span className="px-4">
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="2x"
                      color="red"
                    />
                  </span>
                </button>

                <Link to={`/edit-book/${bookId}`}>
                  <button className="duration-700 hover:scale-150">
                    <span className="px-4">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="2x"
                        color="green"
                      />
                    </span>
                  </button>
                </Link>
              </span>
            </div>
            <h1 className="pt-4 text-4xl font-bold">{book?.title}</h1>
            <p className="pt-5 text-lg text-gray-700 dark:text-gray-400">
              {book?.description}
            </p>
            <div className="pt-5">
              <Button className="bg-primary-500 dark:bg-primary-500 block w-full rounded-lg px-5 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-cyan-600 dark:focus:ring-white">
                {` $${book?.price}`} <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Book;
