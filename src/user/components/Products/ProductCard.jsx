import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@commonPartials";

function ProductCard({ product }) {
  return (
    <div className="group min-w-[384px] max-w-sm rounded-lg border-2 border-gray-300 bg-gray-200 hover:border-gray-900 dark:border-gray-700 dark:bg-gray-900">
      <Link to={`/product/${product?._id}`}>
        <div className="relative p-2">
          <div className="overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <img
              className="max-h-[250px] min-h-[250px] w-full bg-cover duration-700 group-hover:scale-125"
              src={product?.thumbnail}
              alt={product?.title || "Product Thumbnail"}
            />
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {product?.category?.name}
          </p>

          <div className="mt-1 flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-200">
              {product?.title}
            </h5>
          </div>

          <p className="mb-3 font-normal text-gray-800 dark:text-gray-400">
            {`${product?.description.slice(0, 80)}..... `}
          </p>

          <div className="flex items-center justify-between">
            <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
              By : {product?.author?.fullname}
            </p>
            <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
              Published : {product?.createdAt.slice(0, 10)}
            </p>
          </div>

          <div className="pt-2">
            <Button className="w-full">Read more</Button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
