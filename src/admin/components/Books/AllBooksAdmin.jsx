import React, { useMemo } from "react";
import { ReactTable } from "@adminComponents/AllAdminComponents";
import { useSelector } from "react-redux";
import { selectBookIsLoading } from "@storeVars";

function AllBooksAdmin() {
  const loading = useSelector(selectBookIsLoading);
  const data = useMemo(
    () => [
      { id: 1, name: "John D oe", age: 28, role: "Admin" },
      { id: 2, name: "Jane Smith", age: 34, role: "User" },
      { id: 3, name: "Sam Johnson", age: 45, role: "Editor" },
      { id: 4, name: "Emily Davis", age: 29, role: "Viewer" },
    ],
    []
  );

  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                All Books
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <SkeletonTable
                  rows={4}
                  columns={4}
                />
              </>
            ) : (
              <div className="w-full">
                <ReactTable data={data} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllBooksAdmin;
