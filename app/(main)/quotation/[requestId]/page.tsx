"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Link from "next/link";
import { useParams } from "next/navigation";

import { skipToken } from "@reduxjs/toolkit/query";

import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  FileText,
  ImageIcon,
  MessageCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { useChat } from "@/context/ChatContext";

import NegotiationModal from "@/components/quotation/NegotiationModal";
import NegotiationRequestCard from "@/components/quotation/NegotiationRequestCard";

import { useServicePaymentAuthorization } from "@/hooks/useServicePaymentAuthorization";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  isServiceHoldActive,
  needsServiceAuthorization,
} from "@/lib/servicePayment";
import {
  useAcceptQuotationMutation,
  useCreateCounterofferMutation,
  useGetCounteroffersQuery,
  useGetServiceRequestByIdQuery,
  useRejectQuotationMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";

const TERMS_VERSION =
  process.env.NEXT_PUBLIC_TERMS_VERSION || "2026-08-17";

export default function ServiceQuotation() {
  const params = useParams<{
    requestId: string;
  }>();

  const requestId = params.requestId;

  const { openChat } = useChat();

  const [showNegotiation, setShowNegotiation] =
    useState(false);

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const [actionError, setActionError] = useState("");

  const {
    data: request,
    isLoading,
    isFetching,
    error,
  } = useGetServiceRequestByIdQuery(requestId);

  const quotation = request?.quotation;

  const {
    data: counteroffers = [],
  } = useGetCounteroffersQuery(
    quotation ? requestId : skipToken,
  );

  const [
    acceptQuotation,
    { isLoading: isAccepting },
  ] = useAcceptQuotationMutation();

  const [
    rejectQuotation,
    { isLoading: isRejecting },
  ] = useRejectQuotationMutation();

  const [
    createCounteroffer,
    { isLoading: isNegotiating },
  ] = useCreateCounterofferMutation();

  const {
    authorize,
    isLoading: isAuthorizingPayment,
    error: paymentError,
    alreadyAuthorized,
  } = useServicePaymentAuthorization(requestId);

  const latestCounteroffer = useMemo(() => {
    if (!counteroffers.length) return null;

    return [...counteroffers].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )[0];
  }, [counteroffers]);

  const pendingCounteroffer =
    counteroffers.find(
      (item) => item.status === "PENDING",
    ) ?? null;

  const approvedCounteroffer =
    counteroffers.find(
      (item) => item.status === "APPROVED",
    ) ?? null;

  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError);
    }
  }, [paymentError]);

  const handleAccept = async () => {
    if (!quotation) return;

    setActionError("");

    if (!termsAccepted) {
      const message =
        "Please accept the service terms before accepting the quotation.";
      setActionError(message);
      toast.error(message);
      return;
    }

    try {
      await acceptQuotation({
        requestId,
        data: {
          acceptTerms: true,
          termsVersion: TERMS_VERSION,
        },
      }).unwrap();
      toast.success("Quotation accepted.");
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Unable to accept the quotation.",
      );
      setActionError(message);
      toast.error(message);
    }
  };

  const handleReject = async () => {
    setActionError("");

    try {
      await rejectQuotation({
        requestId,
        data: {},
      }).unwrap();
      toast.success("Quotation rejected.");
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Unable to reject the quotation.",
      );
      setActionError(message);
      toast.error(message);
    }
  };

  const handleNegotiationSubmit = async (
    data: {
      amount: number;
      note: string;
    },
  ) => {
    setActionError("");

    try {
      await createCounteroffer({
        requestId,
        data: {
          requestedTotal: data.amount,
          note: data.note || undefined,
        },
      }).unwrap();

      setShowNegotiation(false);
      toast.success("Negotiation request sent.");
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Unable to submit the negotiation request.",
      );
      setActionError(message);
      toast.error(message);

      throw error;
    }
  };

  if (isLoading) {
    return <QuotationSkeleton />;
  }

  if (error || !request) {
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-32 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1000px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
            <div className="rounded-[14px] bg-white px-6 py-20 text-center">
              <h1 className="text-[28px] font-extrabold text-[#1a73e8]">
                Quotation not found
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
        </section>
      </main>
    );
  }

  if (!quotation) {
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-32 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1000px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
            <div className="rounded-[14px] bg-white px-6 py-20 text-center">
              <FileText
                size={30}
                className="mx-auto text-[#1a73e8]"
              />

              <h1 className="mt-5 text-[26px] font-extrabold text-[#1a73e8]">
                Quotation not ready yet
              </h1>

              <p className="mx-auto mt-3 max-w-[460px] text-[13px] leading-6 text-[#68737a]">
                Your service request is currently being
                reviewed. The quotation will appear here
                when it is ready.
              </p>

              <Link
                href={`/service-requests/${requestId}`}
                className="mt-6 inline-flex h-[42px] items-center justify-center rounded-[8px] bg-[#1a73e8] px-5 text-[12px] font-semibold text-white"
              >
                View Service Request
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const serviceTitle =
    request.issue?.name ||
    request.category?.name ||
    "Service";

  const imageMedia = request.media.filter(
    (media) =>
      media.mimeType.startsWith("image/"),
  );

  const videoMedia = request.media.filter(
    (media) =>
      media.mimeType.startsWith("video/"),
  );

  const finalAmount =
    quotation.negotiatedTotal ??
    quotation.totalAmount;

  const canRespond =
    request.status === "QUOTE_SENT" &&
    (quotation.status === "SENT" ||
      quotation.status === "VIEWED");

  const isAccepted =
    quotation.status === "ACCEPTED";

  const isRejected =
    quotation.status === "REJECTED";

  const isExpired =
    quotation.status === "EXPIRED" ||
    new Date(quotation.validUntil).getTime() <
      Date.now();

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-32 sm:px-8 lg:px-10 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-[1000px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
          <div className="rounded-[14px] border border-[#e7eff7] bg-white px-5 py-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/service-requests/${requestId}`}
                  className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6f7980] transition hover:text-[#1a73e8]"
                >
                  <ArrowLeft size={13} />
                  Service Request
                </Link>

                <h1
                  className="text-[30px] font-extrabold leading-[1.1] text-[#1a73e8] sm:text-[34px]"
                  style={{
                    fontFamily:
                      "Manrope, sans-serif",
                  }}
                >
                  Service Quotation
                </h1>

                <p className="mt-2 text-[12px] text-[#67727a] sm:text-[13px]">
                  Quote #{quotation.quoteNumber} for
                  service request #
                  {request.requestNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={openChat}
                className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0865d7]"
              >
                <MessageCircle size={15} />
                Live Chat
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#eaf3ff] text-[#1a73e8]">
                    <FileText size={16} />
                  </div>

                  <h2 className="text-[15px] font-semibold text-[#1a73e8]">
                    Service Summary
                  </h2>
                </div>

                <div className="mt-5 rounded-[10px] bg-[#f0f5ff] p-5">
                  <div>
                    <p className={labelClass}>
                      Service Type
                    </p>

                    <h3 className="mt-2 text-[16px] font-bold text-[#30373c]">
                      {serviceTitle}
                    </h3>
                  </div>

                  {request.category?.name &&
                    request.issue?.name && (
                      <div className="mt-5">
                        <p className={labelClass}>
                          Category
                        </p>

                        <p className="mt-2 text-[12px] font-medium text-[#333b40]">
                          {request.category.name}
                        </p>
                      </div>
                    )}

                  <div className="mt-5">
                    <p className={labelClass}>
                      Problem Description
                    </p>

                    <p className="mt-2 text-[12px] leading-[20px] text-[#59636a]">
                      {request.description}
                    </p>
                  </div>
                </div>
              </section>

              {(imageMedia.length > 0 ||
                videoMedia.length > 0) && (
                <section className="rounded-[14px] bg-white px-5 py-6 sm:px-7">
                  <div className="flex items-center gap-2">
                    <ImageIcon
                      size={16}
                      className="text-[#1a73e8]"
                    />

                    <h2 className="text-[15px] font-semibold text-[#1a73e8]">
                      Submitted Media
                    </h2>
                  </div>

                  {imageMedia.length > 0 && (
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {imageMedia.map(
                        (media) => (
                          <a
                            key={media.id}
                            href={media.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-[180px] items-center justify-center overflow-hidden rounded-[10px] border border-[#e7edf5] bg-[#fafbfc]"
                          >
                            <img
                              src={media.url}
                              alt="Service request"
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ),
                      )}
                    </div>
                  )}

                  {videoMedia.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {videoMedia.map(
                        (media) => (
                          <video
                            key={media.id}
                            src={media.url}
                            controls
                            className="max-h-[320px] w-full rounded-[10px] bg-black"
                          />
                        ),
                      )}
                    </div>
                  )}
                </section>
              )}

              {latestCounteroffer && (
                <NegotiationRequestCard
                  amount={
                    latestCounteroffer.requestedTotal
                  }
                  originalAmount={
                    quotation.totalAmount
                  }
                  note={
                    latestCounteroffer.note ?? ""
                  }
                  status={mapCounterofferStatus(
                    latestCounteroffer.status,
                  )}
                />
              )}
            </div>

            <div className="space-y-5">
              <section className="rounded-[14px] border border-[#e5edf6] bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#74818a]">
                      Quotation Details
                    </p>

                    <h2 className="mt-2 text-[20px] font-bold text-[#1a73e8]">
                      Price Breakdown
                    </h2>
                  </div>

                  <QuotationStatusBadge
                    status={quotation.status}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <PriceRow
                    title="Labor"
                    price={quotation.laborAmount}
                  />

                  <PriceRow
                    title="Parts"
                    price={quotation.partsAmount}
                  />

                  <PriceRow
                    title="Tax"
                    price={quotation.taxAmount}
                  />

                  {quotation.discountAmount >
                    0 && (
                    <PriceRow
                      title="Discount"
                      price={
                        -quotation.discountAmount
                      }
                    />
                  )}
                </div>

                <div className="mt-6 border-t border-[#e8edf2] pt-5">
                  {quotation.negotiatedTotal !==
                    null && (
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] text-[#7b858c]">
                        Original Total
                      </span>

                      <span className="text-[13px] font-medium text-[#7b858c] line-through">
                        {formatCurrency(
                          quotation.totalAmount,
                        )}
                      </span>
                    </div>
                  )}

                  <div className="flex items-end justify-between gap-4">
                    <span className="text-[13px] font-bold text-[#30373c]">
                      {quotation.negotiatedTotal !==
                      null
                        ? "Approved Price"
                        : "Total Amount"}
                    </span>

                    <span className="text-[26px] font-extrabold text-[#1a73e8]">
                      {formatCurrency(
                        finalAmount,
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-[8px] bg-[#fff4eb] px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.6px] text-[#9a642c]">
                    Valid Until
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-[#704820]">
                    {formatValidUntil(
                      quotation.validUntil,
                    )}
                  </p>
                </div>

                {quotation.notes && (
                  <div className="mt-5 rounded-[10px] bg-[#f0f5ff] p-4">
                    <p className={labelClass}>
                      Technician Notes
                    </p>

                    <p className="mt-2 text-[12px] leading-[20px] text-[#59636a]">
                      {quotation.notes}
                    </p>
                  </div>
                )}

                {approvedCounteroffer &&
                  !isAccepted && (
                    <div className="mt-5 rounded-[9px] border border-[#cfe2ff] bg-[#f0f6ff] px-4 py-3">
                      <CheckCircle
                        size={16}
                        className="text-[#1a73e8]"
                      />

                      <p className="mt-2 text-[12px] font-semibold text-[#1a73e8]">
                        Your negotiation was
                        approved.
                      </p>

                      <p className="mt-1 text-[11px] leading-[18px] text-[#68737a]">
                        Accept the updated quotation
                        to continue.
                      </p>
                    </div>
                  )}

                {canRespond && !isExpired && (
                  <>
                    <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-[9px] border border-[#e4e9ef] p-4">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(event) =>
                          setTermsAccepted(
                            event.target.checked,
                          )
                        }
                        className="mt-0.5 h-4 w-4 accent-[#1a73e8]"
                      />

                      <span className="text-[11px] leading-[18px] text-[#59636a]">
                        I have reviewed and agree
                        to the service quotation and
                        terms of service.
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={handleAccept}
                      disabled={
                        isAccepting ||
                        isRejecting ||
                        isNegotiating ||
                        !termsAccepted
                      }
                      className="mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white transition hover:bg-[#0865d7] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <ShieldCheck size={16} />

                      {isAccepting
                        ? "Accepting..."
                        : quotation.negotiatedTotal !==
                            null
                          ? "Accept Updated Quotation"
                          : "Accept Quotation"}
                    </button>

                    <button
                      type="button"
                      onClick={handleReject}
                      disabled={
                        isAccepting ||
                        isRejecting ||
                        isNegotiating
                      }
                      className="mt-3 flex h-[48px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#dbe4f0] text-[13px] font-semibold text-[#344054] transition hover:bg-[#f7f9fb] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <XCircle size={16} />

                      {isRejecting
                        ? "Rejecting..."
                        : "Reject Quotation"}
                    </button>

                    {!pendingCounteroffer &&
                      !approvedCounteroffer && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowNegotiation(
                              true,
                            )
                          }
                          disabled={
                            isNegotiating
                          }
                          className="mt-5 w-full text-[12px] font-semibold text-[#1a73e8] transition hover:underline disabled:opacity-60"
                        >
                          Go for negotiation →
                        </button>
                      )}

                    {pendingCounteroffer && (
                      <p className="mt-5 text-center text-[11px] font-medium text-[#8a642d]">
                        Your negotiation request is
                        awaiting review.
                      </p>
                    )}
                  </>
                )}

                {isAccepted && (
                  <div className="mt-6 rounded-[10px] border border-green-100 bg-green-50 px-4 py-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>
                        <p className="text-[12px] font-semibold text-green-700">
                          Quotation accepted
                        </p>

                        <p className="mt-1 text-[11px] leading-[18px] text-green-700/80">
                          {alreadyAuthorized ||
                          isServiceHoldActive(
                            quotation.payments?.[0],
                          )
                            ? "Card authorization is complete. The office will schedule your appointment shortly."
                            : "Authorize your card on Stripe so the office can schedule the service."}
                        </p>
                      </div>
                    </div>

                    {needsServiceAuthorization(request) &&
                      !alreadyAuthorized && (
                        <button
                          type="button"
                          onClick={authorize}
                          disabled={isAuthorizingPayment}
                          className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] text-[13px] font-semibold text-white transition hover:bg-[#0865d7] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <CreditCard size={16} />

                          {isAuthorizingPayment
                            ? "Redirecting to Stripe..."
                            : `Authorize ${formatCurrency(finalAmount)}`}
                        </button>
                      )}
                  </div>
                )}

                {isRejected && (
                  <div className="mt-6 rounded-[10px] border border-red-100 bg-red-50 px-4 py-4">
                    <div className="flex items-start gap-3">
                      <XCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-red-600"
                      />

                      <div>
                        <p className="text-[12px] font-semibold text-red-600">
                          Quotation rejected
                        </p>

                        <p className="mt-1 text-[11px] leading-[18px] text-red-600/80">
                          Your request has been
                          returned to the office for
                          further review.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {isExpired && !isAccepted && (
                  <div className="mt-6 rounded-[10px] border border-orange-100 bg-orange-50 px-4 py-4">
                    <p className="text-[12px] font-semibold text-orange-700">
                      This quotation has expired.
                    </p>

                    <p className="mt-1 text-[11px] leading-[18px] text-orange-700/80">
                      Please contact the service
                      team for an updated quotation.
                    </p>
                  </div>
                )}

                {(actionError || paymentError) && (
                  <div className="mt-5 rounded-[8px] border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-[11px] leading-[18px] text-red-600">
                      {actionError || paymentError}
                    </p>
                  </div>
                )}

                {isFetching && (
                  <p className="mt-4 text-center text-[10px] text-[#8a959d]">
                    Updating quotation...
                  </p>
                )}
              </section>

              <section
                className="rounded-[12px] p-5 text-white"
                style={{
                  background:
                    "linear-gradient(145deg, #0754bd 0%, #1a73e8 100%)",
                }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-[1.2px] text-white/70">
                  Quote Summary
                </p>

                <div className="mt-5 space-y-4">
                  <SummaryRow
                    label="Request"
                    value={
                      request.requestNumber
                    }
                  />

                  <SummaryRow
                    label="Quote"
                    value={
                      quotation.quoteNumber
                    }
                  />

                  <SummaryRow
                    label="Status"
                    value={formatQuotationStatus(
                      quotation.status,
                    )}
                  />
                </div>

                <div className="mt-5 h-px bg-white/15" />

                <div className="mt-5 flex items-end justify-between gap-4">
                  <span className="text-[12px] text-white/80">
                    Total
                  </span>

                  <span className="text-[24px] font-extrabold">
                    {formatCurrency(
                      finalAmount,
                    )}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <NegotiationModal
          open={showNegotiation}
          onClose={() => {
            if (!isNegotiating) {
              setShowNegotiation(false);
            }
          }}
          quotationAmount={
            quotation.negotiatedTotal ??
            quotation.totalAmount
          }
          onSubmit={handleNegotiationSubmit}
        />
      </section>
    </main>
  );
}

function PriceRow({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-[12px]">
      <span className="text-[#68737a]">
        {title}
      </span>

      <span className="font-semibold text-[#333b40]">
        {formatCurrency(price)}
      </span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[11px] text-white/70">
        {label}
      </span>

      <span className="text-right text-[11px] font-semibold">
        {value}
      </span>
    </div>
  );
}

function QuotationStatusBadge({
  status,
}: {
  status:
    | "SENT"
    | "VIEWED"
    | "ACCEPTED"
    | "REJECTED"
    | "EXPIRED"
    | "CANCELLED";
}) {
  const configs = {
    SENT: {
      label: "Quote Sent",
      className:
        "bg-[#e5f0ff] text-[#1a73e8]",
    },

    VIEWED: {
      label: "Viewed",
      className:
        "bg-[#edf3fa] text-[#5c7893]",
    },

    ACCEPTED: {
      label: "Accepted",
      className:
        "bg-[#dff7e9] text-[#2f9a55]",
    },

    REJECTED: {
      label: "Rejected",
      className:
        "bg-[#fdeaea] text-[#bd5252]",
    },

    EXPIRED: {
      label: "Expired",
      className:
        "bg-[#fff1e5] text-[#a96628]",
    },

    CANCELLED: {
      label: "Cancelled",
      className:
        "bg-[#f1f2f4] text-[#69747c]",
    },
  };

  const config = configs[status];

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-[9px] font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function mapCounterofferStatus(
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED",
): "PENDING" | "ACCEPTED" | "REJECTED" {
  if (status === "APPROVED") {
    return "ACCEPTED";
  }

  return status;
}

function formatCurrency(
  amount: number,
) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

function formatValidUntil(
  date: string,
) {
  return new Date(date).toLocaleString(
    "en-CA",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );
}

function formatQuotationStatus(
  status: string,
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
}

function QuotationSkeleton() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-32 sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-[1000px] rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
          <div className="animate-pulse">
            <div className="h-[115px] rounded-[14px] bg-white" />

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
              <div className="space-y-5">
                <div className="h-[260px] rounded-[14px] bg-white" />
                <div className="h-[260px] rounded-[14px] bg-white" />
              </div>

              <div className="space-y-5">
                <div className="h-[520px] rounded-[14px] bg-white" />
                <div className="h-[200px] rounded-[12px] bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const labelClass =
  "text-[9px] font-semibold uppercase tracking-[0.7px] text-[#74818a]";