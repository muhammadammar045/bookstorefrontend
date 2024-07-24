import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../AllComponents";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  registerUserThunk,
} from "../../store/user/userAuthSlice";
import showToast from "../../utils/toastAlert/toaster";

function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  const handleRegisterUser = async (data) => {
    try {
      const res = await dispatch(registerUserThunk(data)).unwrap();
      showToast("success", `${res.message}`);
      navigate("/login");
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[550px] items-center justify-center rounded-3xl border-2 border-sky-500 bg-gray-100 dark:bg-gray-900">
          <h2 className="text-3xl text-white">Redirecting To Login</h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <div className="mx-auto my-10 max-w-[600px] rounded-lg border-4 border-gray-900 bg-gray-100 p-10 dark:border-gray-200 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-gray-200">
            Register
          </h1>
          <form onSubmit={handleSubmit(handleRegisterUser)}>
            <div className="flex w-full flex-col">
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
              <div className="mb-4">
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 20 characters",
                    },
                  })}
                  className="text-gray-900 dark:text-gray-200"
                />
                {errors.password && (
                  <span className="text-red-500 dark:text-red-400">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-2">
              <Button>Register</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Signup;
