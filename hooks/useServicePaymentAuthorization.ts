"use client";

import { useState } from "react";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useAuthorizeServicePaymentMutation } from "@/redux/features/api/customer/payment/paymentApi";

export function useServicePaymentAuthorization(requestId: string) {
  const [authorizePayment, { isLoading }] =
    useAuthorizeServicePaymentMutation();
  const [error, setError] = useState("");
  const [alreadyAuthorized, setAlreadyAuthorized] = useState(false);

  const authorize = async () => {
    setError("");

    try {
      const response = await authorizePayment(requestId).unwrap();

      if (response.checkoutUrl) {
        window.location.href = response.checkoutUrl;
        return;
      }

      setAlreadyAuthorized(true);
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          "Unable to start payment authorization. Please try again.",
        ),
      );
    }
  };

  return {
    authorize,
    isLoading,
    error,
    alreadyAuthorized,
  };
}
