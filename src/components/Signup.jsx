import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/user/userApi";
import { selectIsLoading, selectError } from "../store/user/userAuthSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegisterUser = async (data) => {
    setLoading(true);
    try {
      await dispatch(registerUser(data));
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Failed to register:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto my-10 max-w-[500px] rounded-lg bg-zinc-800 p-10">
        <h1 className="mb-4 text-center text-3xl text-white">Register</h1>
        {isLoading ? (
          <div className="flex h-[350px] items-center justify-center rounded-3xl bg-black">
            <h2 className="text-3xl">Logging </h2>
            <PacmanLoader
              className="mx-5"
              color="white"
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleRegisterUser)}>
            <div className="flex w-full flex-col">
              <div className="mb-4">
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  {...register("fullname", {
                    required: "FullName is required",
                    minLength: {
                      value: 4,
                      message: "FullName must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "FullName must be at most 30 characters",
                    },
                  })}
                />
                {errors.fullname && (
                  <span className="text-red-500">
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
            <div className="mb-2">
              <Button
                type="submit"
                bgColor="bg-blue-600 hover:bg-green-400"
                padding="px-5 py-2"
                rounded="rounded-lg"
                textColor="text-white"
              >
                Register
              </Button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </form>
        )}
      </div>
    </>
  );
}

export default Signup;
