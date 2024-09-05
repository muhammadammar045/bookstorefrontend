import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import envVars from "../../../../envexport";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(envVars.stripePublishableKey);

const StripeButton = ({ orderId }) => (
  <Elements stripe={stripePromise}>
    <StripeCheckoutForm orderId={orderId} />
  </Elements>
);

export default StripeButton;
