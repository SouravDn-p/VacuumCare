"use client";

import { useState } from "react";

import { ClipboardList, CreditCard, MapPin, XCircle } from "lucide-react";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { isServiceHoldActive } from "@/lib/servicePayment";
import {
  canCancelAppointment,
  technicianDisplayName,
} from "@/lib/serviceSchedule";
import { useCancelServiceRequestMutation } from "@/redux/features/api/customer/service/customerServiceApi";
import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";

export default function ServiceOverview({
  request,
}: {
  request: CustomerServiceRequest;
}) {
  const [cancelError, setCancelError] = useState("");
  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelServiceRequestMutation();

  const payable =
    request.quotation?.negotiatedTotal ?? request.quotation?.totalAmount;
  const payment = request.quotation?.payments?.[0];
  const holdActive = isServiceHoldActive(payment);
  const address = request.address
    ? [
        request.address.line1,
        request.address.apartment,
        request.address.city,
        request.address.state,
        request.address.zipCode,
      ]
        .filter(Boolean)
        .join(", ")
    : "Address on file";

  const handleCancel = async () => {
    setCancelError("");

    try {
      await cancelRequest({
        requestId: request.id,
        data: { reason: "Cancelled from appointment details" },
      }).unwrap();
    } catch (error) {
      setCancelError(
        getApiErrorMessage(error, "Unable to cancel this appointment."),
      );
    }
  };

  return (
    <section className="rounded-[14px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      <h2 className="flex items-center gap-2 font-bold text-[#0875f5]">
        <ClipboardList size={18} />
        Service overview
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-[11px] font-semibold uppercase text-[#667085]">
            Service Type
          </p>

          <p className="mt-2">
            {request.issue?.name || request.category?.name || "Service"}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase text-[#667085]">
            <MapPin size={14} />
            Address
          </p>

          <p className="mt-2">{address}</p>
        </div>

        <div className="rounded-[8px] bg-[#2478e8] p-4 text-white">
          <h3 className="flex items-center gap-2 font-semibold">
            <CreditCard size={16} />
            Payment Status
          </h3>

          <p className="mt-2 text-sm">
            {holdActive
              ? `A ${formatMoney(payable)} card hold is in place. Final capture happens after you confirm the completed report.`
              : payment
                ? `Payment status: ${payment.status}`
                : "No payment authorization yet."}
          </p>
        </div>

        <div className="rounded-[8px] bg-[#f1f5ff] p-4">
          <h3 className="text-sm font-semibold text-[#0875f5]">
            Customer Notes
          </h3>

          <p className="mt-2 text-sm text-[#475467]">{request.description}</p>
        </div>

        {request.quotation?.notes && (
          <div className="rounded-[8px] bg-[#fff5eb] p-4">
            <h3 className="text-sm font-semibold">Technician Instruction</h3>

            <p className="mt-2 text-sm text-[#475467]">
              {request.quotation.notes}
            </p>
          </div>
        )}

        {request.status === "CANCELLED" ? (
          <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-red-600">
            <XCircle size={16} />
            {request.cancellationReason || "This appointment was cancelled"}
          </p>
        ) : canCancelAppointment(request) ? (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isCancelling}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-semibold text-red-600 disabled:opacity-50"
          >
            <XCircle size={16} />
            {isCancelling ? "Cancelling..." : "Cancel Request"}
          </button>
        ) : (
          <p className="mt-4 text-center text-[12px] text-[#667085]">
            {request.status === "IN_PROGRESS"
              ? `${technicianDisplayName(request)} is already on the job. Cancel is no longer available.`
              : "The office sets the appointment window. Message the team if you need a different time."}
          </p>
        )}

        {cancelError && (
          <p className="text-center text-[12px] text-red-600">{cancelError}</p>
        )}
      </div>
    </section>
  );
}

function formatMoney(amount: number | null | undefined) {
  if (amount == null) return "CAD hold";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}
