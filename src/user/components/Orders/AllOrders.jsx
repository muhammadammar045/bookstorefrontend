import React, { useEffect, useState } from "react";
import {
  fetchCurrentUserOrdersThunk,
  selectAllOrders,
} from "../../../store/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import StripeButton from "../../../utils/payment/Stripe/StripeButton";
import { Heading } from "@commonPartials";

const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);

  useEffect(() => {
    dispatch(fetchCurrentUserOrdersThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <Heading>Your Orders</Heading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-gray-700"
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Order ID: {order._id}
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-400">
              <span className="font-medium">Total Price:</span>{" "}
              {order.totalPrice.toFixed(2)} PKR
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-400">
              <span className="font-medium">Status:</span> {order.orderStatus}
            </p>
            <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Items:
            </h3>
            <ul className="mb-4">
              {order.orderItems.map((item) => (
                <li
                  key={item._id}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {item.product.productTitle} (x{item.quantity})
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Payment Method: {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Payment Status: {order.paymentStatus}
            </p>
            {order.paymentStatus === "Pending" && (
              <StripeButton orderId={order?._id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
