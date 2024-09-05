import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Heading, FileInput } from "@commonPartials";
import { Spinner } from "@loadingState";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserIsLoading, registerUserThunk } from "@storeVars";
import showToast from "@utils/toastAlert/toaster";

const firstNameValidation = {
  required: "First Name is required",
  minLength: {
    value: 2,
    message: "First Name must be at least 2 characters",
  },
  maxLength: {
    value: 30,
    message: "First Name must be at most 30 characters",
  },
};

const lastNameValidation = {
  required: "Last Name is required",
  minLength: {
    value: 2,
    message: "Last Name must be at least 2 characters",
  },
  maxLength: {
    value: 30,
    message: "Last Name must be at most 30 characters",
  },
};

const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 3,
    message: "Password must be at least 3 characters",
  },
  maxLength: {
    value: 20,
    message: "Password must be at most 20 characters",
  },
};

const addressValidation = {
  required: "Address is required",
  minLength: {
    value: 10,
    message: "Address must be at least 10 characters",
  },
};

const renderError = (error) =>
  error && (
    <span className="text-red-500 dark:text-red-400">{error.message}</span>
  );

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  const handleRegisterUser = async (data) => {
    try {
      const res = await dispatch(registerUserThunk(data)).unwrap();
      showToast("success", res.message);
      navigate("/login");
      reset();
    } catch (error) {
      showToast("error", error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto my-10 max-w-xl rounded-lg border-2 border-gray-900 bg-gray-100 p-10 dark:border-gray-200 dark:bg-gray-900">
      <Heading>Register</Heading>
      <form
        onSubmit={handleSubmit(handleRegisterUser)}
        className="grid grid-cols-1 gap-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter First Name"
              {...register("firstName", firstNameValidation)}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.firstName)}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter Last Name"
              {...register("lastName", lastNameValidation)}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.lastName)}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="User Name"
              placeholder="Enter User Name"
              {...register("userName", { required: "User Name is required" })}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.userName)}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Email"
              placeholder="Enter Email"
              {...register("email", emailValidation)}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.email)}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              placeholder="Enter Password"
              {...register("password", passwordValidation)}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.password)}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Address"
              placeholder="Enter Address"
              {...register("address", addressValidation)}
              className="text-gray-900 dark:text-gray-200"
            />
            {renderError(errors.address)}
          </div>
          <div className="mb-5">
            <FileInput
              label={"Upload Profile Image"}
              {...register("profileImage", {
                required: "profile Image is required",
              })}
            />
          </div>
          <div className="mb-5">
            <FileInput
              label={"Upload Cover Image (Optional)"}
              {...register("coverImage")}
            />
          </div>
        </div>
        <div className="col-span-1 my-2">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
