"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarCheck,
  CreditCard,
  FileText,
  MapPin,
} from "lucide-react";

import ServiceRequestProgress from "./ServiceRequestProgress";
import ServiceRequestStatusBadge from "./ServiceRequestStatusBadge";

import { useServicePaymentAuthorization } from "@/hooks/useServicePaymentAuthorization";
import {
  isServiceHoldActive,
  needsServiceAuthorization,
} from "@/lib/servicePayment";
import { useGetServiceRequestByIdQuery } from "@/redux/features/api/customer/service/customerServiceApi";

export default function ServiceRequestDetails({
  requestId,
}: {
  requestId: string;
}) {
  const {
    data: request,
    isLoading,
    error,
  } = useGetServiceRequestByIdQuery(requestId);

  const {
    authorize,
    isLoading: isAuthorizingPayment,
    error: paymentError,
    alreadyAuthorized,
  } = useServicePaymentAuthorization(requestId);

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (error || !request) {
    return (
      <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
        <div className="rounded-[14px] bg-white px-6 py-20 text-center">
          <h1 className="text-[28px] font-bold text-[#1a73e8]">
            Service request not found
          </h1>

          <Link
            href="/service-requests"
            className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a73e8]"
          >
            <ArrowLeft size={14} />
            Return to Service Requests
          </Link>
        </div>
      </div>
    );
  }

  const title =
    request.issue?.name || request.category?.name || "Service Request";

  const amount =
    request.quotation?.negotiatedTotal ?? request.quotation?.totalAmount;

  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_270px]">
        <div className="space-y-5">
          <section className="rounded-[14px] border border-[#e5edf6] bg-white px-5 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href="/service-requests"
                  className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6f7980]"
                >
                  <ArrowLeft size={13} />
                  Service Requests
                </Link>

                <h1
                  className="text-[29px] font-extrabold text-[#1a73e8] sm:text-[34px]"
                  style={{
                    fontFamily: "Manrope,sans-serif",
                  }}
                >
                  Service Request
                </h1>

                <div className="mt-2 text-[12px] text-[#67727a]">
                  #{request.requestNumber}
                </div>
              </div>

              <ServiceRequestStatusBadge status={request.status} />
            </div>
          </section>

          <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[#1a73e8]">
              <FileText size={16} />
              Service Overview
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-6 border-t pt-5 sm:grid-cols-2">
              <Info label="Service Type" value={title} />

              <Info label="Description" value={request.description} />

              {request.address && (
                <div>
                  <p className={infoLabel}>Location</p>

                  <div className="mt-2 flex gap-2">
                    <MapPin size={15} className="text-[#1a73e8]" />

                    <p className="text-[12px] leading-[19px]">
                      {formatAddress(request.address)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
            <h2 className="text-[13px] font-semibold text-[#1a73e8]">
              Service Progress
            </h2>

            <div className="mt-8">
              <ServiceRequestProgress status={request.status} compact={false} />
            </div>
          </section>

          {request.media?.length > 0 && (
            <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
              <h2 className="text-[15px] font-semibold text-[#1a73e8]">
                Service Media
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {request.media.map((media: { id: string; url: string; mimeType: string }) =>
                  media.mimeType.startsWith("image/") ? (
                    <div
                      key={media.id}
                      className="relative aspect-square overflow-hidden rounded-[10px]"
                    >
                      <Image
                        src={media.url}
                        alt="service"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <video
                      key={media.id}

                      src={media.url}

                      controls

                      className="aspect-square w-full rounded-[10px] bg-black"
                    />
                  ),
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div
            className="rounded-[12px] p-6 text-white lg:sticky lg:top-28"
            style={{
              background: "linear-gradient(145deg,#0754bd,#1a73e8)",
            }}
          >
            <p className="text-[9px] uppercase tracking-[1.4px] text-white/70">
              Service Intelligence
            </p>

            <div className="mt-6 space-y-5">
              <SummaryRow label="Status" value={request.status} />
            </div>
          </div>

          {request.quotation && (
            <div className="rounded-[12px] border border-[#dceafa] bg-white p-5">
              <p className="text-[9px] uppercase tracking-[1px] text-[#74818a]">
                Payment Summary
              </p>

              <div className="mt-5 flex justify-between">
                <span className="text-[11px]">Quote Status</span>

                <span className="rounded-full bg-[#e5f0ff] px-3 py-1 text-[9px] text-[#1a73e8]">
                  {request.quotation.status}
                </span>
              </div>

              {amount && (
                <div className="mt-5 flex justify-between">
                  <span>Amount</span>

                  <span className="text-[22px] font-bold text-[#1a73e8]">
                    {formatCurrency(amount)}
                  </span>
                </div>
              )}

              <Link
                href={`/quotation/${request.id}`}
                className="mt-6 flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[12px] font-semibold text-white"
              >
                <FileText size={15} />
                View Quotation
              </Link>

              {needsServiceAuthorization(request) && !alreadyAuthorized && (
                <button
                  type="button"
                  onClick={authorize}
                  disabled={isAuthorizingPayment}
                  className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#1a73e8] bg-white text-[12px] font-semibold text-[#1a73e8] disabled:opacity-50"
                >
                  <CreditCard size={15} />
                  {isAuthorizingPayment
                    ? "Redirecting to Stripe..."
                    : "Authorize Payment"}
                </button>
              )}

              {(alreadyAuthorized ||
                isServiceHoldActive(request.quotation.payments?.[0])) &&
                request.status === "ACCEPTED" && (
                  <p className="mt-4 text-center text-[11px] leading-[18px] text-[#2f9a55]">
                    Card authorization is complete. The office will schedule
                    your appointment shortly.
                  </p>
                )}

              {(request.status === "SCHEDULED" ||
                request.status === "IN_PROGRESS" ||
                request.status === "REPORT_SUBMITTED") && (
                <Link
                  href={`/schedule/${request.id}`}
                  className="mt-3 flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[12px] font-semibold text-white"
                >
                  <CalendarCheck size={15} />
                  View Appointment
                </Link>
              )}

              {paymentError && (
                <p className="mt-3 text-center text-[11px] leading-[18px] text-red-600">
                  {paymentError}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={infoLabel}>{label}</p>

      <p className="mt-2 text-[12px] leading-[20px] text-[#333b40]">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[11px] text-white/70">{label}</span>

      <span className="text-[11px] font-semibold">{value}</span>
    </div>
  );
}

function formatAddress(address: { line1?: string; apartment?: string | null; city?: string; state?: string; zipCode?: string; country?: string }) {
  return [
    address.line1,
    address.apartment,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

function DetailsSkeleton() {
  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
      <div className="animate-pulse space-y-5">
        <div className="h-[120px] rounded bg-white" />

        <div className="h-[300px] rounded bg-white" />
      </div>
    </div>
  );
}

const infoLabel =
  "text-[9px] font-semibold uppercase tracking-[0.7px] text-[#74818a]";
