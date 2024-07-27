import React, { useEffect } from "react";
import Table from "../Common/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPermissionsThunk,
  selectAllPermissions,
} from "../../../store/permission/permissionSlice";

function AllPermissionsAdmin() {
  const allPermissions = useSelector(selectAllPermissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPermissionsThunk());
  }, [dispatch]);

  const transformedPermissions = allPermissions?.map((permission) => ({
    permission: permission.permissionName,
  }));

  const tableHeaders = Object.keys(transformedPermissions[0] || {}).map(
    (header) => header.charAt(0).toUpperCase() + header.slice(1)
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
                All Permissions
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {transformedPermissions?.length > 0 ? (
              <Table
                tableHeaders={tableHeaders}
                tableData={transformedPermissions}
              />
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No permissions available.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllPermissionsAdmin;
