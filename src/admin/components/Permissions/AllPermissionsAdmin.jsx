import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePermissionThunk,
  fetchAllPermissionsThunk,
  fetchPermissionThunk,
  selectAllPermissions,
  selectPermission,
  selectPermissionIsLoading,
  resetSelectedPermission, // Added to reset permission state
} from "@store/permission/permissionSlice";
import AddPermission from "./AddPermission";
import ReactTable from "@adminComponents/Common/ReactTable/ReactTable";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showToast from "@utils/toastAlert/toaster";
import { SkeletonTable } from "@adminComponents/AllAdminComponents";
import { useNavigate } from "react-router-dom";

function AllPermissionsAdmin() {
  const permissions = useSelector(selectAllPermissions);
  const dispatch = useDispatch();
  const loading = useSelector(selectPermissionIsLoading);
  const navigate = useNavigate();

  const handleEdit = async (permissionId) => {
    try {
      await dispatch(fetchPermissionThunk(permissionId)).unwrap();
      navigate("/admin/permissions/add-or-update-permission");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  const handleDelete = async (permissionId) => {
    try {
      const res = await dispatch(deletePermissionThunk(permissionId)).unwrap();
      showToast("success", `${res.message}`);
      dispatch(resetSelectedPermission());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (permissions.length === 0) {
      dispatch(fetchAllPermissionsThunk());
    }
  }, [dispatch]);

  const allPermissions = useMemo(() => {
    return (
      permissions?.map((permission) => ({
        id: permission._id,
        Permission: permission.permissionName,
        actions: (
          <>
            <button
              className="duration-700 hover:scale-150"
              onClick={() => handleDelete(permission._id)}
            >
              <span className="px-2">
                <FontAwesomeIcon
                  icon={faTrash}
                  color="red"
                />
              </span>
            </button>

            <button
              onClick={() => handleEdit(permission._id)}
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
  }, [permissions]);

  return (
    <main className="grow">
      <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
              All Permissions
            </h1>
          </div>
        </div>

        <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
          {loading ? (
            <SkeletonTable
              rows={3}
              columns={3}
            />
          ) : (
            <>
              <div className="w-full">
                <ReactTable data={allPermissions} />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default AllPermissionsAdmin;
