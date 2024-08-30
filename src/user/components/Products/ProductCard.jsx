import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@commonPartials";
import { Like, Rating } from "@userComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ product }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <Link to={`/product/${product._id}`}>
          <img
            className="mx-auto h-full"
            src={product?.productThumbnail}
            alt={product.productTitle}
          />
        </Link>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-1">
          <div>
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-md rounded font-medium">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 me-2 rounded px-2.5 py-0.5 text-sm font-medium">
              {product?.ownerDetails?.userName}
            </span>
          </div>
          {/* LIKE ICON */}
          <Like isLiked={product?.isLiked} />
        </div>

        {/* PRODUCT TITLE */}
        <Link
          to="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.productTitle}
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* PRICE */}
          <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            Rs {product.productPrice}{" "}
          </p>

          {/* ADD TO CART */}
          <Button
            className="flex items-center gap-2"
            padding="px-4 py-3"
          >
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
            <span>Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
