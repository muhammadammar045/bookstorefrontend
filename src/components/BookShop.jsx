import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBooks,
  selectIsLoading,
  fetchBooksThunk,
  deleteBookThunk,
  selectTotalPages,
} from "../store/book/bookSlice";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import { PacmanLoader } from "react-spinners";

function BookShop() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchBooksThunk(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (bookId) => {
    dispatch(deleteBookThunk(bookId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 border-orange-300 bg-black">
          <h2 className="text-3xl">Loading Books </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <>
          <div className="p-8">
            <h1 className="mb-8 text-center text-6xl font-bold italic">
              BookShop
            </h1>
            <div className="my-10 flex flex-wrap gap-4">
              {books && books.length > 0 ? (
                books.map((book) => (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    imgSrc={book.thumbnail}
                    title={book.title}
                    category={book.category}
                    desc={book.description}
                    price={book.price}
                    onDelete={() => handleDelete(book._id)}
                  />
                ))
              ) : (
                <div className="flex min-h-[250px] w-full items-center justify-center">
                  <h1 className="text-4xl italic">No Books Found</h1>
                </div>
              )}
            </div>
            {books && books.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default BookShop;
