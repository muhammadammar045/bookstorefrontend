import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactTable } from "@commonPartials";
import { SkeletonTable } from "@loadingState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import showToast from "@utils/toastAlert/toaster";
import { useNavigate } from "react-router-dom";
import {
  fetchAllRolesThunk,
  fetchRoleThunk,
  deleteRoleThunk,
  selectAllRoles,
  selectRoleIsLoading,
  resetSelectedRole,
  fetchAllPermissionsThunk,
} from "@storeVars";

function AllRolesAdmin() {
  const roles = useSelector(selectAllRoles);
  const dispatch = useDispatch();
  const loading = useSelector(selectRoleIsLoading);
  const navigate = useNavigate();

  const handleEdit = async (roleId) => {
    try {
      await dispatch(fetchRoleThunk(roleId)).unwrap();
      navigate("/admin/roles/add-or-update-role");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (roleId) => {
    try {
      await dispatch(deleteRoleThunk(roleId)).unwrap();
      showToast("success", "Role deleted successfully");
      dispatch(resetSelectedRole());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchAllRolesThunk());
      dispatch(fetchAllPermissionsThunk());
    }
  }, [dispatch]);

  const allRoles = useMemo(() => {
    return roles?.map((role) => ({
      id: role._id,
      role: role.roleName,
      permissions: role.permissions?.map((permission) => permission).join(", "),
      actions: (
        <>
          <button
            className="duration-700 hover:scale-150"
            onClick={() => handleDelete(role._id)}
          >
            <span className="px-2">
              <FontAwesomeIcon
                icon={faTrash}
                color="red"
              />
            </span>
          </button>

          <button
            onClick={() => handleEdit(role._id)}
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
    }));
  }, [roles]);

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
              <SkeletonTable
                rows={3}
                columns={2}
              />
            ) : (
              <>
                <div className="w-full">
                  <ReactTable data={allRoles} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllRolesAdmin;
