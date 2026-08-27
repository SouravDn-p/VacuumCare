"use client";

import { Suspense } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPageClient() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
