"use client";

import { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { CheckCircle2, LoaderCircle } from "lucide-react";

import {
  useGetOrderStatusQuery,
  useGetPaymentStatusQuery,
} from "@/redux/features/api/customer/payment/paymentApi";
import { baseApi } from "@/redux/features/api/baseApi";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentStatusFallback label="Confirming Payment..." />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const paymentId = searchParams.get("paymentId");
  const requestId = searchParams.get("requestId");
  const orderId = searchParams.get("orderId");

  const [paymentPoll, setPaymentPoll] = useState(3000);
  const [orderPoll, setOrderPoll] = useState(3000);
  const [timedOut, setTimedOut] = useState(false);

  const { data: payment, isFetching: isFetchingPayment } =
    useGetPaymentStatusQuery(paymentId!, {
      skip: !paymentId,
      pollingInterval: paymentPoll,
    });

  const { data: order, isFetching: isFetchingOrder } = useGetOrderStatusQuery(
    orderId!,
    {
      skip: !orderId,
      pollingInterval: orderPoll,
    },
  );

  useEffect(() => {
    if (payment?.status === "AUTHORIZED" || payment?.status === "SUCCEEDED") {
      setPaymentPoll(0);

      dispatch(
        baseApi.util.invalidateTags([
          "Payments",
          "Cart",
          "Orders",
          { type: "ServiceRequests", id: requestId ?? "LIST" },
          { type: "ServiceRequests", id: "LIST" },
        ]),
      );
    }
  }, [dispatch, payment?.status, requestId]);

  useEffect(() => {
    if (order?.status === "PAID") {
      setOrderPoll(0);
      dispatch(baseApi.util.invalidateTags(["Cart", "Orders"]));
    }
  }, [dispatch, order?.status]);

  useEffect(() => {
    if (!paymentId && !orderId) return;

    const timeout = window.setTimeout(() => {
      setTimedOut(true);
    }, 45000);

    return () => window.clearTimeout(timeout);
  }, [orderId, paymentId]);

  const isAuthorized = payment?.status === "AUTHORIZED";
  const isPaid = payment?.status === "SUCCEEDED" || order?.status === "PAID";
  const isConfirmed = isAuthorized || isPaid;
  const isFetching = isFetchingPayment || isFetchingOrder;

  return (
    <PaymentStatusShell>
      {!isConfirmed && (
        <LoaderCircle
          size={48}
          className="mx-auto animate-spin text-[#1a73e8]"
        />
      )}

      {isConfirmed && (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f7ec]">
          <CheckCircle2 size={34} className="text-[#2f9a55]" />
        </div>
      )}

      <h1
        className="mt-6 text-[32px] font-extrabold text-[#1a73e8]"
        style={{ fontFamily: "Manrope,sans-serif" }}
      >
        {isConfirmed ? "Payment Successful!" : "Confirming Payment..."}
      </h1>

      <p className="mt-4 text-[14px] leading-[24px] text-[#68737a]">
        {isAuthorized
          ? "Your card authorization is complete. The office will schedule your service appointment shortly."
          : isPaid
            ? "Your order payment has been completed successfully."
            : "We are waiting for Stripe confirmation. This may take a few seconds."}
      </p>

      {isFetching && !isConfirmed && (
        <p className="mt-4 text-[11px] text-[#8a959d]">
          Updating payment status...
        </p>
      )}

      {timedOut && !isConfirmed && (
        <p className="mt-4 text-[12px] leading-[20px] text-[#a96628]">
          Confirmation is taking longer than expected. You can return to your
          request and try again if the status has not updated.
        </p>
      )}

      {isAuthorized && requestId && (
        <Link
          href={`/service-requests/${requestId}`}
          className="mt-8 flex h-[48px] items-center justify-center rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white hover:bg-[#0865d7]"
        >
          View Service Request
        </Link>
      )}

      {isPaid && orderId && (
        <Link
          href={`/orders/${orderId}`}
          className="mt-8 flex h-[48px] items-center justify-center rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white hover:bg-[#0865d7]"
        >
          View Order
        </Link>
      )}

      {!paymentId && !orderId && (
        <p className="mt-6 text-[13px] text-red-600">
          Payment information is missing.
        </p>
      )}
    </PaymentStatusShell>
  );
}

function PaymentStatusFallback({ label }: { label: string }) {
  return (
    <PaymentStatusShell>
      <LoaderCircle
        size={48}
        className="mx-auto animate-spin text-[#1a73e8]"
      />
      <h1
        className="mt-6 text-[32px] font-extrabold text-[#1a73e8]"
        style={{ fontFamily: "Manrope,sans-serif" }}
      >
        {label}
      </h1>
    </PaymentStatusShell>
  );
}

function PaymentStatusShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-32 pb-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[600px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
          <div className="rounded-[14px] bg-white px-6 py-12 text-center">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
