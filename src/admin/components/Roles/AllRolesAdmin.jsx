import React, { useEffect } from "react";
import Table from "../Common/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRolesThunk,
  selectAllRoles,
} from "../../../store/role/roleSlice.js";

function AllRolesAdmin() {
  const allRoles = useSelector(selectAllRoles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRolesThunk());
  }, [dispatch]);

  const transformedRoles = allRoles?.map((role) => ({
    role: role.roleName,
    permissions: role.permissions?.map((permission) => permission).join(", "),
  }));

  const tableHeaders = Object.keys(transformedRoles[0] || {}).map(
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
                All Roles
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {transformedRoles?.length > 0 ? (
              <Table
                tableHeaders={tableHeaders}
                tableData={transformedRoles}
              />
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No roles available.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllRolesAdmin;
