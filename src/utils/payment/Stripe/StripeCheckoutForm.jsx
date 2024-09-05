import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStripePaymentThunk } from "../../../store/payment/paymentSlice";
import { Button } from "@commonPartials"; // Adjust import if needed

const CheckoutForm = ({ orderId }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  console.log(orderId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(createStripePaymentThunk(orderId)).unwrap();
      const { url } = result.data;

      window.location.href = url;
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Button onClick={handleSubmit}>Proceed to Payment</Button>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default CheckoutForm;
