import React, { useEffect } from "react";
import Table from "../Common/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserThunk,
  selectIsLoading,
  selectUsers,
} from "../../../store/user/userAuthSlice";

function AllUsersAdmin() {
  const allUsers = useSelector(selectUsers);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchAllUserThunk());
  }, [dispatch]);

  const transformedUsers =
    allUsers?.map((user) => ({
      name: user.fullname,
      email: user.email,
      role: user.roleName,
      permissions: user.permissions?.map((permission) => permission).join(", "),
    })) || [];

  const tableHeaders =
    transformedUsers.length > 0
      ? Object.keys(transformedUsers[0]).map(
          (header) => header.charAt(0).toUpperCase() + header.slice(1)
        )
      : [];

  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                All Users
              </h1>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <>
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead>
                  <tr className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    {[...Array(5)].map((_, index) => (
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
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr
                      key={`loading-row-${rowIndex}`}
                      className="animate-pulse border-b bg-gray-200 dark:border-gray-700 dark:bg-gray-800"
                    >
                      {[...Array(5)].map((_, colIndex) => (
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              {transformedUsers.length > 0 ? (
                <Table
                  tableHeaders={tableHeaders}
                  tableData={transformedUsers}
                />
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No users available.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default AllUsersAdmin;
