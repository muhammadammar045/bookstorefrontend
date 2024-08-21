import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactTable } from "@commonPartials";
import { SkeletonTable } from "@loadingState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import showToast from "@utils/toastAlert/toaster";
import { useNavigate } from "react-router-dom";
import {
  fetchAllUserThunk,
  fetchUserThunk,
  selectUserIsLoading,
  selectUsers,
  deleteUserThunk,
  fetchAllRolesThunk,
  resetSelectedUser,
} from "@storeVars";

function AllUsersAdmin() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const loading = useSelector(selectUserIsLoading);
  const navigate = useNavigate();

  const handleEdit = async (userId) => {
    try {
      await dispatch(fetchUserThunk(userId)).unwrap();
      navigate("/admin/users/add-or-update-user");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteUserThunk(userId)).unwrap();
      showToast("success", "User deleted successfully");
      dispatch(resetSelectedUser());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchAllRolesThunk());
      dispatch(fetchAllUserThunk());
    }
  }, [dispatch]);

  const allUsers = useMemo(() => {
    return (
      users?.map((user) => ({
        id: user._id,
        avatar: (
          <img
            src={user.profileImage}
            alt={user.title}
          />
        ),
        name: user.fullName,
        username: user.userName,
        email: user.email,
        address: user.address,
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
