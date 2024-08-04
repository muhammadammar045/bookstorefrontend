import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserThunk,
  fetchUserThunk,
  selectUserIsLoading,
  selectUsers,
} from "@store/user/userAuthSlice";
import ReactTable from "../Common/ReactTable/ReactTable";
import {
  AddUsersAdmin,
  AssignRoleAdmin,
  SkeletonTable,
} from "@adminComponents/AllAdminComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchAllRolesThunk } from "@store/role/roleSlice";

function AllUsersAdmin() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const loading = useSelector(selectUserIsLoading);

  const handleEdit = async (userId) => {
    await dispatch(fetchUserThunk(userId));
  };

  const handleDelete = async (userId) => {};

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllRolesThunk());
      dispatch(fetchAllUserThunk());
    }
  }, [dispatch]);

  const allUsers = useMemo(() => {
    return (
      users?.map((user, index) => ({
        id: user._id,
        // id: index + 1,
        name: user.fullname,
        email: user.email,
        role: user.roleName,
        permissions: user.permissions
          ?.map((permission) => permission)
          .join(", "),
        createdAt: user.createdAt.slice(0, 10),
        updatedAt: user.updatedAt.slice(0, 10),
        actions: (
          <>
            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleDelete(user._id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              onClick={() => handleEdit(user._id)}
              className="duration-700 hover:scale-150"
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  color="green"
                />
              </span>
            </button>
          </>
        ),
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
          <div className="flex gap-10">
            <div className="mb-5 w-3/5">
              <AddUsersAdmin />
            </div>
            <div className="mb-5 w-2/5">
              <AssignRoleAdmin />
            </div>
          </div>

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
          </div>
        </div>
      </main>
    </>
  );
}

export default AllUsersAdmin;
