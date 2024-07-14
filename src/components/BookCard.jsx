import React from "react";
import { Link } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

function BookCard({ book }) {
  return (
    <>
      <div className="group rounded-lg border-2 border-pink-700 bg-slate-900 lg:w-[350px]">
        <Link to={`/book/${book?._id}`}>
          <div className="relative p-2">
            <div className="overflow-hidden border-2 border-pink-700">
              <img
                className="max-h-[250px] min-h-[250px] w-full bg-cover duration-700 group-hover:scale-125"
                src={book?.thumbnail}
                alt=""
              />
            </div>
          </div>

          <div className="p-5">
            <div className="mt-3">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book?.title}
              </h5>
            </div>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {/* For Less Description */}
              {`${book?.description.slice(0, 60)}..... `}
            </p>

            <div className="pt-2">
              <Button className="block w-full rounded-lg px-5 py-2 text-center font-medium text-pink-700 outline outline-pink-700 hover:text-white dark:hover:bg-pink-700">
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
