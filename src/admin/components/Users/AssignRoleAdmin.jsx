import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import showToast from "@utils/toastAlert/toaster";
import { Button, Select } from "@commonPartials";
import { Spinner } from "@loadingState";
import {
  assignRoleToUserThunk,
  selectAllRoles,
  selectUserIsLoading,
  selectFetchedUser,
} from "@storeVars";

function AddUserAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectUserIsLoading);
  const roles = useSelector(selectAllRoles);
  const fetchedUser = useSelector(selectFetchedUser);

  const rolesOptions = roles.map((role) => ({
    id: role._id,
    name: role.roleName,
  }));

  const handleAssignRoleToUser = async (data) => {
    console.log(data);
    try {
      let res;
      if (fetchedUser) {
        res = await dispatch(
          assignRoleToUserThunk({
            userId: fetchedUser?._id,
            roleName: data.roleName,
          })
        ).unwrap();
        showToast("success", `${res.message}`);
        navigate("/admin/users/all-users");
        reset();
      }
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (fetchedUser) {
      setValue("roleName", fetchedUser.roleName);
    } else {
      reset();
    }
  }, [fetchedUser, setValue, reset]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto rounded-lg border-2 border-gray-900 bg-gray-100 p-10 dark:border-gray-200 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-gray-200">
            Assign Role
          </h1>
          <form onSubmit={handleSubmit(handleAssignRoleToUser)}>
            <div className="flex w-full flex-col">
              {/* Role */}
              <div className="mb-4">
                <Select
                  label="Roles"
                  options={rolesOptions}
                  {...register("roleName", { required: "Role is required" })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.roleName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.roleName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-2">
              <Button>Assign Role</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddUserAdmin;
