import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "@commonPartials";
import showToast from "@utils/toastAlert/toaster";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserCartThunk,
  selectedCartTotal,
  selectedCartItems,
} from "@storeVars";
import { useForm } from "react-hook-form";
import { createOrderThunk } from "../../../store/order/orderSlice";
import StripeButton from "../../../utils/payment/Stripe/StripeButton";

function Checkout() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectedCartTotal);
  const cartItems = useSelector(selectedCartItems);

  const handleCheckout = async (data) => {
    try {
      const res = await dispatch(createOrderThunk(data)).unwrap();
      showToast("success", `${res.message}`);
      navigate("/user/orders");
      reset();
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchUserCartThunk());
  }, [dispatch]);
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              {/* ADDRESS DETAILS */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Input
                      type="text"
                      label="Address"
                      placeholder="Enter Full Address"
                      {...register("fullAddress", {
                        required: "Full Address is required",
                        minLength: {
                          value: 15,
                          message: "Full Name must be at least 15 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Full Name must be at most 50 characters",
                        },
                      })}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.fullAddress && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.fullAddress.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Street"
                      placeholder="Street No"
                      {...register("street")}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.street && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.street.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="City"
                      placeholder="City Name"
                      {...register("city", {
                        required: "City Name is required",
                        minLength: {
                          value: 3,
                          message: "City Name must be at least 3 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "City Name must be at most 30 characters",
                        },
                      })}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.city && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Postal Code"
                      placeholder="Area Postal Code"
                      {...register("postalCode")}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.postalCode && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Mobile Number"
                      placeholder="03001234567"
                      {...register("phone", {
                        required: "Full Name is required",
                        minLength: {
                          value: 11,
                          message:
                            "Mobile Number must be 11 digits (03001234567)",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Mobile Number must be a number",
                        },
                      })}
                      className="text-gray-900 dark:text-gray-200"
                    />
                    {errors.phone && (
                      <span className="text-red-500 dark:text-red-400">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* REVIEW PRODUCTS */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Product Details
                </h2>
                {cartItems &&
                  cartItems.map((item) => {
                    return (
                      <div
                        key={item.product._id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                      >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <Link
                            href="#"
                            className="shrink-0 md:order-1"
                          >
                            <img
                              className="h-20 w-20 dark:hidden"
                              src={item.product.productThumbnail}
                              alt="imac image"
                            />
                            <img
                              className="hidden h-20 w-20 dark:block"
                              src={item.product.productThumbnail}
                              alt="imac image"
                            />
                          </Link>
                          <label
                            htmlFor="counter-input"
                            className="sr-only"
                          >
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <h1 className="text-base font-bold text-gray-900 dark:text-white">
                                Quantity:{" "}
                              </h1>
                              <input
                                type="text"
                                id="counter-input"
                                data-input-counter=""
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                placeholder=""
                                value={item.quantity}
                                defaultValue={1}
                                required=""
                              />
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                Rs {item.product.productPrice}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <Link
                              href="#"
                              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                            >
                              {item.product.productTitle}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      Rs {cartTotal?.toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      Rs {cartTotal?.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Proceed to Payment
                </Button>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  One or more items in your cart require an account.{" "}
                  <a
                    href="#"
                    title=""
                    className="text-primary-700 dark:text-primary-500 font-medium underline hover:no-underline"
                  >
                    Sign in or create an account now.
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Checkout;
