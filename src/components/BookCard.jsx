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
    <div className="rounded-lg border-2 border-white bg-white lg:w-[350px] dark:bg-gray-800">
      <div className="relative">
        <div className="overflow-hidden p-2">
          <img
            className="max-h-[250px] min-h-[250px] w-full rounded-lg border-2 border-white bg-cover duration-700 hover:scale-125"
            src={imgSrc}
            alt=""
          />
        </div>
        <div className="absolute right-6 top-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white duration-700 hover:scale-125">
          <button onClick={() => onThumbnailChange(id)}>
            <FontAwesomeIcon
              icon={faCamera}
              color="black"
            />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mt-3 flex items-center justify-between">
          <h5 className="mb-1 text-lg tracking-tight text-gray-500 hover:text-red-400 dark:text-gray-500">
            {category}
          </h5>
          <span className="">
            <button
              className="duration-700 hover:scale-150"
              onClick={() => onDelete(id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleEdit(id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  color="green"
                />
              </span>
            </button>
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
            className="text-blue-500 duration-700 hover:scale-125 hover:pl-2 hover:text-red-600 focus:outline-none"
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
    </div>
  );
}

export default BookCard;
