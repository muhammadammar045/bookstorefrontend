import React, { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePermissionThunk,
  fetchAllPermissionsThunk,
  selectAllPermissions,
  selectPermissionIsLoading,
} from "../../../store/permission/permissionSlice";
import AddPermission from "./AddPermission";
import ReactTable from "../Common/ReactTable/ReactTable";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  closeModal,
  openModal,
  selectModalContext,
} from "../../../store/modal/modalSlice";
import showToast from "../../../utils/toastAlert/toaster";
import Modal from "../../../utils/modal/Modal";
import { SkeletonTable } from "../AllAdminComponents";

function AllPermissionsAdmin() {
  const permissions = useSelector(selectAllPermissions);
  const modalContext = useSelector(selectModalContext);

  const dispatch = useDispatch();
  const loading = useSelector(selectPermissionIsLoading);

  const onDeleteClick = (permissionId) => {
    console.log(permissionId);
    onDelete(permissionId);
    dispatch(openModal("delete"));
  };

  const onEditClick = () => {
    dispatch(openModal("edit"));
  };

  const handleEdit = () => {
    navigate(`/edit-book/${bookId}`);
    dispatch(closeModal());
  };

  // console.log(book)
  const onDelete = async (permissionId) => {
    try {
      console.log(permissionId);
      const res = await dispatch(deletePermissionThunk(permissionId)).unwrap();
      showToast("success", `${res.message}`);
      dispatch(closeModal());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchAllPermissionsThunk());
  }, [dispatch]);

  const allPermissions = useMemo(() => {
    return (
      permissions?.map((permission) => ({
        id: permission._id,
        Permission: permission.permissionName,
        actions: (
          <>
            {" "}
            <span className="">
              <button
                className="duration-700 hover:scale-150"
                onClick={() => onDeleteClick(permission._id)}
              >
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="red"
                  />
                </span>
              </button>

              <button
                onClick={onEditClick}
                className="duration-700 hover:scale-150"
              >
                <span className="px-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    color="green"
                  />
                </span>
              </button>
            </span>
          </>
        ),
      })) || []
    );
  }, [permissions]);

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
          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <SkeletonTable
                  rows={3}
                  columns={3}
                />
              </>
            ) : (
              <>
                <div className="w-3/5">
                  <ReactTable data={allPermissions} />
                </div>
                <div className="w-2/5">
                  <AddPermission permission={"permission"} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      {modalContext === "delete" && (
        <Modal
          onConfirmFunction={onDelete}
          message={"Are you sure you want to delete this Permission?"}
        />
      )}
      {modalContext === "edit" && (
        <Modal
          onConfirmFunction={handleEdit}
          message={"Are you sure you want to edit this Permission?"}
        />
      )}
    </>
  );
}

export default AllPermissionsAdmin;
