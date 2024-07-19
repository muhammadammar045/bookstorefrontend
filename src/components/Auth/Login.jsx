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
  const error = useSelector(selectError);

  const login = async (data) => {
    try {
      await dispatch(loginUserThunk(data)).unwrap();
      navigate("/");
      reset();
    } catch (err) {
      console.error("Failed to login:", err);
      navigate("/login");
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="mx-auto my-10 flex h-[350px] max-w-[500px] items-center justify-center rounded-3xl border-2 border-primary bg-tertiary">
          <h2 className="text-3xl">Logging In </h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <div className="mx-auto my-10 max-w-[500px] rounded-lg border-4 border-primary bg-tertiary p-14">
          <h1 className="mb-4 text-center text-3xl text-primary">Login</h1>
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
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
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
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="my-2">
              <Button
                type="submit"
                bgColor="outline-none hover:bg-primary"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-primary hover:text-tertiary"
                className="shadow-lg outline outline-cyan-600 hover:shadow-primary"
              >
                Login
              </Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        </div>
      )}
    </>
  );
}

export default Login;