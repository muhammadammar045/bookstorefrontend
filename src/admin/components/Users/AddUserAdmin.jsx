import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import showToast from "@utils/toastAlert/toaster";
import {
  selectUserIsLoading,
  selectFetchedUser,
  updateUserThunk,
} from "@store/user/userAuthSlice";
import { Input, Button } from "@userComponents/AllComponents";
import { Spinner } from "@userComponents/AllComponents";

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
        navigate("/admin/all-users");
        reset();
      }
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    if (fetchedUser) {
      setValue("fullname", fetchedUser.fullname);
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
              {/* Full Name */}
              <div className="mb-4">
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  {...register("fullname", {
                    required: "Full Name is required",
                    minLength: {
                      value: 4,
                      message: "Full Name must be at least 4 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Full Name must be at most 30 characters",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.fullname && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.fullname.message}
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
