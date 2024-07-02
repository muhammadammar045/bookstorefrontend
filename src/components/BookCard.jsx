import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCamera,
  faCartShopping,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

function BookCard({ id, imgSrc, title, category, desc, price, onDelete }) {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const onThumbnailChange = async (bookId) => {
    navigate(`/edit-book-thumbnail/${bookId}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-xl shadow-red-900 lg:w-[350px] dark:border-gray-700 dark:bg-gray-800">
      <Link
        to="#"
        className=""
      >
        <div className="relative p-2">
          <div className="overflow-hidden">
            <img
              className="max-h-[250px] w-full rounded-t-lg bg-cover p-3 shadow-md shadow-green-600 duration-700 hover:scale-125"
              src={imgSrc}
              alt=""
            />
          </div>
          <div className="absolute right-6 top-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-700">
            <Button onClick={() => onThumbnailChange(id)}>
              <FontAwesomeIcon
                icon={faCamera}
                color="white"
              />
            </Button>
          </div>
        </div>

        <div className="p-5">
          <div className="mt-3 flex items-center justify-between">
            <h5 className="mb-1 text-lg tracking-tight text-gray-500 hover:text-red-400 dark:text-gray-500">
              {category}
            </h5>
            <span className="">
              <Button onClick={() => onDelete(id)}>
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="red"
                  />
                </span>
              </Button>

              <Button onClick={() => handleEdit(id)}>
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="green"
                  />
                </span>
              </Button>
            </span>
          </div>
          <div className="mt-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </div>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {showFullDescription ? desc : `${desc.slice(0, 40)}... `}
            <button
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          </p>
          <div>
            <Button className="w-full rounded-lg bg-pink-700 px-5 py-2 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-pink-700 dark:hover:bg-pink-900 dark:focus:ring-white">
              {` $${price}`} <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
