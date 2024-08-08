import React, { useEffect } from "react";
import { Button, Input } from "@commonPartials";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import showToast from "@utils/toastAlert/toaster";
import { useNavigate } from "react-router-dom";
import {
  addPermissionThunk,
  updatePermissionThunk,
  selectPermission,
  selectPermissionIsLoading,
  resetSelectedPermission,
} from "@storeVars";
import { Spinner } from "@loadingState";

function AddPermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permission = useSelector(selectPermission);
  const loading = useSelector(selectPermissionIsLoading);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      permissionName: "",
    },
  });

  const handleReset = () => {
    dispatch(resetSelectedPermission());
  };

  useEffect(() => {
    if (permission) {
      setValue("permissionName", permission.permissionName);
    } else {
      reset();
    }
  }, [permission, setValue, reset]);

  const handlePermission = async (data) => {
    try {
      let res;
      if (permission) {
        res = await dispatch(
          updatePermissionThunk({
            permissionId: permission._id,
            permissionData: data,
          })
        ).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/permissions/all-permissions");
      } else {
        res = await dispatch(addPermissionThunk(data)).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/permissions/all-permissions");
      }
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-gray-800 dark:shadow-neutral-700/70 md:p-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {permission ? "Edit Permission" : "Add Permission"}
          </h2>
          <form onSubmit={handleSubmit(handlePermission)}>
            <div className="flex w-full flex-col">
              <div className="mb-4">
                <Input
                  type="text"
                  label=""
                  placeholder="Enter Permission Name"
                  {...register("permissionName", {
                    required: "Permission Name is required",
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.permissionName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.permissionName.message}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <Button padding="px-6 py-2 mx-1">Submit</Button>
                <Button
                  type="reset"
                  padding="px-6 py-2 mx-1"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddPermission;
