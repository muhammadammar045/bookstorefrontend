import {
  selectBooks,
  selectIsLoading,
  selectTotalPages,
  fetchAllUsersBooksThunk,
} from "../../store/book/bookSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { Pagination, BookCard } from "../AllComponents";

function AllBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const books = useSelector(selectBooks);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchAllUsersBooksThunk(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 border-primary bg-tertiary">
          <h2 className="text-3xl">Loading Books </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <>
          <div className="p-8">
            <h1 className="text mb-8 bg-slate-800 py-2 text-center text-6xl font-bold italic tracking-wider shadow-xl shadow-cyan-700 outline outline-primary">
              Available Books
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
                  <h1 className="text-4xl italic">No Books Found</h1>
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
        </>
      )}
    </>
  );
}

export default AllBooks;
