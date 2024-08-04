import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../AllComponents";

function BookCard({ book }) {
  return (
    <div className="group rounded-lg border-2 bg-gray-200 hover:border-gray-900 lg:w-[350px] dark:border-blue-500 dark:bg-gray-900">
      <Link to={`/book/${book?._id}`}>
        <div className="relative p-2">
          <div className="overflow-hidden border-2 border-gray-900 dark:border-blue-500">
            <img
              className="max-h-[250px] min-h-[250px] w-full bg-cover duration-700 group-hover:scale-125"
              src={book?.thumbnail}
              alt={book?.title || "Book Thumbnail"}
            />
          </div>
        </div>

        <div className="p-5">
          <div className="mt-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
              {book?.title}
            </h5>
          </div>

          <p className="mb-3 font-normal text-gray-300 dark:text-gray-400">
            {`${book?.description.slice(0, 60)}..... `}
          </p>

          <div className="pt-2">
            <Button className="block w-full rounded-lg bg-blue-500 px-5 py-2 text-center font-medium text-gray-900 outline outline-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-500">
              Read more
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
