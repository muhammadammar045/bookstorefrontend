import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectError,
  registerUserThunk,
} from "../store/user/userAuthSlice";

function Signup() {
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

  const handleRegisterUser = async (data) => {
    try {
      await dispatch(registerUserThunk(data)).unwrap();
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="border-primary-500 mx-auto my-10 flex h-[350px] max-w-[550px] items-center justify-center rounded-3xl border-2 bg-black">
          <h2 className="text-3xl">Redirecting To Login</h2>
          <PacmanLoader
            className="mx-5"
            color="white"
          />
        </div>
      ) : (
        <>
          <div className="border-primary-500 mx-auto my-10 max-w-[500px] rounded-lg border-4 bg-zinc-800 p-10">
            <h1 className="mb-4 text-center text-3xl text-white">Register</h1>
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
              <div className="my-2">
                <Button
                  type="submit"
                  bgColor="outline-none hover:bg-primary-500"
                  padding="px-5 py-2"
                  rounded="rounded-lg"
                  textColor="text-white hover:text-black"
                  className="hover:shadow-primary-500 shadow-lg outline outline-cyan-600"
                >
                  Register
                </Button>
              </div>
              {error && <div className="text-red-500">{error}</div>}
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
