// ErrorPage.jsx
import React from "react";
import { Heading } from "@commonPartials";

const Error404 = () => (
  <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
    <div className="text-center">
      <Heading>404</Heading>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        It might have been moved or deleted.
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

export default Error404;
