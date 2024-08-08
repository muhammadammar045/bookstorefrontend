import React, { useEffect } from "react";
import { Button, Input } from "@commonPartials";
import { Spinner } from "@loadingState";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import showToast from "@utils/toastAlert/toaster";
import { useNavigate } from "react-router-dom";
import {
  addRoleThunk,
  updateRoleThunk,
  selectRole,
  selectRoleIsLoading,
  resetSelectedRole,
} from "@storeVars";

function AddRole() {
  const dispatch = useDispatch();
  const loading = useSelector(selectRoleIsLoading);
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: "",
    },
  });

  const handleReset = () => {
    dispatch(resetSelectedRole());
    reset();
  };

  useEffect(() => {
    if (role) {
      setValue("roleName", role.roleName);
    } else {
      reset();
    }
  }, [role, setValue, reset]);

  const handleRole = async (data) => {
    try {
      let res;
      if (role) {
        res = await dispatch(
          updateRoleThunk({
            roleId: role._id,
            roleData: data,
          })
        ).unwrap();
        showToast("success", ` ${res.message}`);
        navigate("/admin/roles/all-roles");
      } else {
        res = await dispatch(addRoleThunk(data)).unwrap();
        showToast("success", ` ${res.message}`);
        navigate("/admin/roles/all-roles");
      }
      handleReset();
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
            {role ? "Edit Role" : "Add Role"}
          </h2>
          <form onSubmit={handleSubmit(handleRole)}>
            <div className="flex w-full flex-col">
              <div className="mb-4">
                <Input
                  type="text"
                  label=""
                  placeholder="Enter Role Name"
                  {...register("roleName", {
                    required: "Role Name is required",
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.roleName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.roleName.message}
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

export default AddRole;
