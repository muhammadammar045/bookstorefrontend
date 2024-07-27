import React, { useEffect } from "react";
import Table from "../Common/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserThunk,
  selectUsers,
} from "../../../store/user/userAuthSlice";

function AllUsersAdmin() {
  const allUsers = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserThunk());
  }, [dispatch]);

  // Transform users data
  const transformedUsers =
    allUsers?.map((user) => ({
      name: user.fullname,
      email: user.email,
      role: user.roleName,
      permissions: user.permissions?.map((permission) => permission).join(", "),
    })) || []; // Default to empty array if `allUsers` is undefined

  // Ensure `transformedUsers` is not empty before accessing its keys
  const tableHeaders =
    transformedUsers.length > 0
      ? Object.keys(transformedUsers[0]).map(
          (header) => header.charAt(0).toUpperCase() + header.slice(1)
        )
      : []; // Default to empty array if `transformedUsers` is empty

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
        </div>
      </main>
    </>
  );
}

export default AllUsersAdmin;
