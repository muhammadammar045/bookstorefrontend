import React from "react";
import { Heading } from "@commonPartials";

function SomethingWrong({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <Heading>Something went wrong</Heading>
      <p className="mb-4 text-xl">
        We're sorry, but something unexpected happened.
      </p>
      <pre className="mb-4 text-red-500">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
}

export default SomethingWrong;
