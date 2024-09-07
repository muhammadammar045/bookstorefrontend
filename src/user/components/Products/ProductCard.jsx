import React from "react";
import { Link } from "react-router-dom";
import { Like } from "@userComponents";
import AddToCart from "../Cart/AddToCart";

function ProductCard({ product }) {
  return (
    <div className="space-y-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Link
        to={`/product/${product._id}`}
        className="overflow-hidden rounded"
      >
        <img
          className="mx-auto h-44 w-full dark:hidden"
          src={product.productThumbnail}
          alt={product.productThumbnail}
        />
        <img
          className="mx-auto hidden h-44 w-full dark:block"
          src={product.productThumbnail}
          alt={product.productThumbnail}
        />
      </Link>
      <div>
        <Link
          to={`/product/${product._id}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.productTitle}{" "}
        </Link>
        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
          {product.productDescription.slice(0, 60) + "..."}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
          Rs {product.productPrice}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2.5">
        <Like
          productId={product._id}
          isLiked={product.isLiked}
        />
        <AddToCart productId={product._id} />
      </div>
    </div>
  );
}

export default ProductCard;
