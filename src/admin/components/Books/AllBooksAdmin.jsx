import React, { useEffect, useMemo } from "react";
import { ReactTable } from "@commonPartials";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookIsLoading,
  selectBooks,
  fetchAllUsersBooksThunk,
  fetchBookThunk,
  deleteBookThunk,
  resetSelectedBook,
} from "@storeVars";
import showToast from "@utils/toastAlert/toaster";
import { SkeletonTable } from "@loadingState";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function AllBooksAdmin() {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectBookIsLoading);

  const handleEdit = async (bookId) => {
    try {
      await dispatch(fetchBookThunk(bookId)).unwrap();
      navigate("/admin/books/add-or-update-book");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await dispatch(deleteBookThunk(bookId)).unwrap();
      showToast("success", "Book deleted successfully");
      dispatch(resetSelectedBook());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (books.length === 0) dispatch(fetchAllUsersBooksThunk());
  }, [dispatch]);

  const allBooks = useMemo(() => {
    return (
      books?.map((book) => ({
        id: book._id,
        title: book.title,
        category: book.category,
        author: book.author.fullname,
        createdAt: book.createdAt.slice(0, 10),
        updatedAt: book.updatedAt.slice(0, 10),
        actions: (
          <>
            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleDelete(book._id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              onClick={() => handleEdit(book._id)}
              className="duration-700 hover:scale-150"
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  color="green"
                />
              </span>
            </button>
          </>
        ),
      })) || []
    );
  }, [books]);

  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                All Books
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <SkeletonTable
                  rows={4}
                  columns={4}
                />
              </>
            ) : (
              <div className="w-full">
                <ReactTable data={allBooks} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllBooksAdmin;
