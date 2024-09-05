import { selectUserIsLoading, loginUserThunk } from "@storeVars";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Heading } from "@commonPartials";
import { Spinner } from "@loadingState";
import showToast from "@utils/toastAlert/toaster";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

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
        <Spinner />
      ) : (
        <div className="mx-auto my-16 max-w-md rounded-lg border-2 border-gray-900 bg-gray-100 p-10 dark:border-gray-200 dark:bg-gray-900">
          <Heading>Login</Heading>
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
