import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserThunk,
  selectIsLoading,
  selectUsers,
} from "../../../store/user/userAuthSlice";
import ReactTable from "../Common/ReactTable/ReactTable";
import AddUserAdmin from "./AddUserAdmin";
import { SkeletonTable } from "../AllAdminComponents";

function AllUsersAdmin() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllUserThunk());
    }
  }, [dispatch]);

  const allUsers = useMemo(() => {
    return (
      users?.map((user) => ({
        id: user._id,
        name: user.fullname,
        email: user.email,
        role: user.roleName,
        permissions: user.permissions
          ?.map((permission) => permission)
          .join(", "),
      })) || []
    );
  }, [users]);

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
                <ReactTable data={allUsers} />
              </div>
            )}
            {/* <div className="w-2/5">
              <AddUserAdmin />
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllUsersAdmin;
