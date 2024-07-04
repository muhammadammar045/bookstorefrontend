import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import envVars from "../../envexport";
import Pagination from "./Pagination";
import { PacmanLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/user/userAuthSlice";

function BookShop() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${envVars.backend_uri}/books/get-all-books?page=${page}`,
        config
      );
      const { results, meta } = response.data.data;
      setBooks(results);
      setTotalPages(meta.totalPages);
      // console.log(meta);
      // console.log(results);
    } catch (error) {
      console.log("Error Fetching The Books:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (bookId) => {
    setLoading(true);

    try {
      const deletedBook = await axios.delete(
        `${envVars.backend_uri}/books/delete-book/${bookId}`,
        config
      );
      if (deletedBook) {
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);
        // console.log(`Book Deleted: ${deletedBook.data}`);

        if (updatedBooks.length === 0 && currentPage > 1) {
          // If the current page is empty and it's not the first page, go to the previous page
          setCurrentPage(currentPage - 1);
          fetchBooks(currentPage - 1);
        } else {
          fetchBooks(currentPage);
        }
      }
    } catch (error) {
      console.log("Error Deleting The book:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(page);
  };
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-center text-6xl font-bold italic">BookShop</h1>
      {loading ? (
        <>
          <div className="flex h-[350px] items-center justify-center rounded-3xl bg-black">
            <h2 className="text-3xl">Loading Books </h2>
            <PacmanLoader
              className="mx-5"
              color="white"
            />
          </div>
        </>
      ) : (
        <>
          <div className="my-10 flex flex-wrap gap-4">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  id={book._id}
                  imgSrc={book.thumbnail}
                  title={book.title}
                  category={book.category}
                  desc={book.description}
                  price={book.price}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="flex min-h-[250px] w-full items-center justify-center">
                <h1 className="text-4xl italic">No Books Found</h1>
              </div>
            )}
          </div>
          {books.length > 0 && (
            <div className="mt-4 flex justify-center">
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
  );
}

export default BookShop;
