import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@userComponents/AllComponents";

function BookCard({ book }) {
  return (
    <div className="group max-w-xs rounded-lg border-2 bg-gray-200 hover:border-gray-900 dark:border-blue-500 dark:bg-gray-900">
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
            {`${book?.description.slice(0, 80)}..... `}
          </p>

          <div className="pt-2">
            <Button className="w-full">Read more</Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
