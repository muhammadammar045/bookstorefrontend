import {
  selectBooks,
  selectBookIsLoading,
  fetchBooksThunk,
  selectTotalPages,
  setSearchQuery,
  selectSearchQuery,
} from "@storeVars";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, SearchBox, SelectBox } from "@commonPartials";
import { BookCard } from "@userComponents";
import { BooksSpinner } from "@loadingState";
import Typewriter from "typewriter-effect";

function BookShop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  const loading = useSelector(selectBookIsLoading);
  const books = useSelector(selectBooks);
  const totalPages = useSelector(selectTotalPages);
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    dispatch(
      fetchBooksThunk({
        page: currentPage,
        query: searchQuery,
        limit: pageSize,
      })
    );
  }, [dispatch, currentPage, searchQuery, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    setCurrentPage(1);
  };

  return (
    <>
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
        <div className="flex justify-between rounded-md bg-gray-300 p-4 dark:bg-gray-900">
          <div className="w-3/12">
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="w-2/12">
            <SelectBox
              pageSize={pageSize}
              setPageSize={(value) => {
                setPageSize(parseInt(value, 10));
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        {loading ? (
          <BooksSpinner count={12} />
        ) : (
          <>
            <div className="my-10 flex flex-wrap gap-4">
              {books && books.length > 0 ? (
                <>
                  {books.map((book) => (
                    <BookCard
                      book={book}
                      key={book._id}
                    />
                  ))}
                </>
              ) : (
                <div className="flex min-h-[250px] w-full items-center justify-center">
                  <h1 className="text-4xl italic text-gray-400 dark:text-gray-600">
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
          </>
        )}
      </div>
    </>
  );
}

export default BookShop;
