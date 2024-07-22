import {
  selectIsLoading,
  selectError,
  loginUserThunk,
} from "../../store/user/userAuthSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "../AllComponents";
import showToast from "../../toastAlert/toaster";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const login = async (data) => {
    try {
      const res = await dispatch(loginUserThunk(data)).unwrap();
      showToast("success", `${res.message}`);
      navigate("/");
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 border-sky-500 bg-gray-100 dark:bg-gray-900">
          <h2 className="text-3xl text-gray-900 dark:text-gray-200">
            Logging In
          </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <div className="mx-auto my-10 max-w-[600px] rounded-lg border-4 border-gray-900 bg-gray-100 p-14 dark:border-gray-200 dark:bg-gray-900">
          <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-gray-200">
            Login
          </h1>
          <form onSubmit={handleSubmit(login)}>
            <div className="flex w-full flex-col">
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
              <Button>Login</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
