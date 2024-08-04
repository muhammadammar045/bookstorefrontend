import {
  selectBooks,
  selectBookIsLoading,
  fetchBooksThunk,
  selectTotalPages,
} from "@store/book/bookSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, BookCard, BooksSpinner } from "../AllComponents";
import Typewriter from "typewriter-effect";

function BookShop() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector(selectBookIsLoading);
  const books = useSelector(selectBooks);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchBooksThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <BooksSpinner />
      ) : (
        <div className="p-8">
          <h1 className="mb-3 py-2 text-center text-3xl font-bold italic tracking-wider text-gray-900 dark:text-gray-200">
            <Typewriter
              options={{
                wrapperClassName: "text-gray-900 dark:text-gray-200 ml-4 ",
                strings: ["My Books"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className="my-10 flex flex-wrap justify-center gap-4">
            {books && books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  book={book}
                  key={book._id}
                />
              ))
            ) : (
              <div className="flex min-h-[250px] w-full items-center justify-center">
                <h1 className="text-4xl italic text-gray-400 dark:text-gray-300">
                  No Books Found
                </h1>
              </div>
            )}
          </div>
          {books && books.length > 0 && (
            <div className="mt-4 flex items-center justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default BookShop;
