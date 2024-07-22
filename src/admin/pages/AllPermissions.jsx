import React from "react";

function AllPermissions() {
  return (
    <main className="grow">
      <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard actions */}
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">Permissions</div>
      </div>
    </main>
  );
}

export default AllPermissions;
