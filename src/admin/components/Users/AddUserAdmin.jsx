import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import showToast from "@utils/toastAlert/toaster";
import { Button, Input } from "@commonPartials";
import { Spinner } from "@loadingState";
import {
  selectUserIsLoading,
  selectFetchedUser,
  updateUserThunk,
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
  const fetchedUser = useSelector(selectFetchedUser);

  const handleUpdateUser = async (data) => {
    try {
      let res;
      if (fetchedUser) {
        res = await dispatch(
          updateUserThunk({
            userId: fetchedUser?._id,
            userData: data,
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
      setValue("firstName", fetchedUser.firstName);
      setValue("lastName", fetchedUser.lastName);
      setValue("userName", fetchedUser.userName);
      setValue("email", fetchedUser.email);
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
            Edit User
          </h1>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="flex w-full flex-col">
              {/* First Name */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "First Name must be at most 30 characters",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.firstName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Last Name must be at most 30 characters",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.lastName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* User Name */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="User Name"
                  placeholder="Enter Unique Username"
                  {...register("userName", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username must be at most 30 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.userName && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.userName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.email && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-2">
              <Button>Edit User</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddUserAdmin;
