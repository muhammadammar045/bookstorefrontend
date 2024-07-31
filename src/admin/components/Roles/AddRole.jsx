import React from "react";
import { Button, Input } from "../../../User/components/AllComponents";
import { useForm } from "react-hook-form";
import { addRoleThunk } from "../../../store/role/roleSlice";
import showToast from "../../../utils/toastAlert/toaster";
import { useDispatch } from "react-redux";

function AddRole() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleRole = async (data) => {
    try {
      const res = await dispatch(addRoleThunk(data)).unwrap();
      showToast("success", `${res.message}`);
      console.log(data);
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-gray-800 dark:shadow-neutral-700/70 md:p-5">
        <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          Add Role
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
              {errors.role && (
                <span className="text-red-500 dark:text-red-400">
                  {errors.role.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Button padding="px-6 py-2">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddRole;
