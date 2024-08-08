import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import showToast from "@utils/toastAlert/toaster";
import { Button, Checkbox } from "@commonPartials";
import { Spinner } from "@loadingState";
import {
  selectRole,
  selectRoleIsLoading,
  assignPermissionsToRoleThunk,
  selectAllPermissions,
} from "@storeVars";

function AssignPermissionsToRole() {
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      permissionsName: [],
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectRoleIsLoading);
  const permissions = useSelector(selectAllPermissions);
  const fetchedRole = useSelector(selectRole);

  const permissionsOptions = permissions.map((permission) => ({
    id: permission._id,
    name: permission.permissionName,
  }));

  const handleAssignPermissionsToRole = async (data) => {
    // console.log(data);
    try {
      let res;
      if (fetchedRole) {
        res = await dispatch(
          assignPermissionsToRoleThunk({
            roleId: fetchedRole?._id,
            permissionsName: data.permissionsName,
          })
        ).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/roles/all-roles");
        reset();
      }
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (fetchedRole) {
      setValue(
        "permissionsName",
        fetchedRole.permissions.map((permission) => permission)
      );
    } else {
      reset();
    }
  }, [fetchedRole, setValue, reset]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-gray-800 dark:shadow-neutral-700/70 md:p-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Assign Permissions
          </h2>
          <form onSubmit={handleSubmit(handleAssignPermissionsToRole)}>
            <div className="w-full">
              {/* Permissions Name */}
              <div className="mb-4 flex gap-3">
                {permissionsOptions.map((permission) => (
                  <Controller
                    key={permission.id}
                    name="permissionsName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label={permission.name}
                        checked={value?.includes(permission.name) || false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onChange([...value, permission.name]);
                          } else {
                            onChange(
                              value.filter((item) => item !== permission.name)
                            );
                          }
                        }}
                      />
                    )}
                  />
                ))}
                {errors.permissionsName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.permissionsName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-2">
              <Button>Assign Permissions</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AssignPermissionsToRole;
