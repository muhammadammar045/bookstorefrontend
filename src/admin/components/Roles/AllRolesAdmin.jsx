import React, { useEffect } from "react";
import Table from "../Common/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRolesThunk,
  selectAllRoles,
  selectRoleIsLoading,
} from "../../../store/role/roleSlice.js";
import AddRole from "./AddRole.jsx";

function AllRolesAdmin() {
  const allRoles = useSelector(selectAllRoles);
  const dispatch = useDispatch();
  const loading = useSelector(selectRoleIsLoading);

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

          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                  <thead>
                    <tr className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      {[...Array(3)].map((_, index) => (
                        <th
                          scope="col"
                          className="px-6 py-3"
                          key={index}
                        >
                          <div className="h-4 w-20 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(3)].map((_, rowIndex) => (
                      <tr
                        key={`loading-row-${rowIndex}`}
                        className="animate-pulse border-b bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
                      >
                        {[...Array(3)].map((_, colIndex) => (
                          <td
                            key={`${rowIndex}-${colIndex}`}
                            className="px-6 py-4"
                          >
                            <div className="h-4 w-20 rounded-full bg-gray-100 dark:bg-gray-700"></div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="w-3/5">
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
            )}
            <div className="w-2/5">
              <AddRole />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AllRolesAdmin;
