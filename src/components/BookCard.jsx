import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./AllComponents";

function BookCard({ book }) {
  return (
    <>
      <div className="border-primary group rounded-lg border-2 bg-slate-900 lg:w-[350px]">
        <Link to={`/book/${book?._id}`}>
          <div className="relative p-2">
            <div className="border-primary overflow-hidden border-2">
              <img
                className="max-h-[250px] min-h-[250px] w-full bg-cover duration-700 group-hover:scale-125"
                src={book?.thumbnail}
                alt=""
              />
            </div>
          </div>

          <div className="p-5">
            <div className="mt-3">
              <h5 className="dark:text-primary mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {book?.title}
              </h5>
            </div>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {/* For Less Description */}
              {`${book?.description.slice(0, 60)}..... `}
            </p>

            <div className="pt-2">
              <Button className="text-primary outline-primary dark:hover:bg-primary hover:text-primary block w-full rounded-lg px-5 py-2 text-center font-medium outline">
                Read more{" "}
              </Button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default BookCard;
