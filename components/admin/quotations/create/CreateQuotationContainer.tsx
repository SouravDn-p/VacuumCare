"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CreateQuotationHeader from "./CreateQuotationHeader";
import PriceBreakdownCard from "./PriceBreakdownCard";
import QuotePartsCard, {
  partsNotes,
  partsTotal,
  type QuotePartLine,
} from "./QuotePartsCard";
import QuotationNotesCard from "./QuotationNotesCard";
import QuotationSummarySidebar from "./QuotationSummarySidebar";
import {
  useCreateAdminQuotationMutation,
  useGetAdminServiceRequestByIdQuery,
  useGetAdminServiceRequestsQuery,
} from "@/redux/features/api/admin/serviceRequestsApi";
import {
  useApproveAdminCounterofferMutation,
  useRejectAdminCounterofferMutation,
} from "@/redux/features/api/admin/counteroffersApi";
import CustomerNegotiationCard from "./CustomerNegotiationCard";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import AdminSubmitOverlay from "@/components/admin/ui/AdminSubmitOverlay";

const QUOTEABLE_REQUEST_STATUSES = new Set(["NEW", "UNDER_REVIEW", "QUOTE_SENT"]);
const LOCKED_QUOTE_STATUSES = new Set(["ACCEPTED", "CANCELLED"]);
const LOCKED_REQUEST_STATUSES = new Set([
  "ACCEPTED",
  "SCHEDULED",
  "IN_PROGRESS",
  "REPORT_SUBMITTED",
  "COMPLETED",
  "CANCELLED",
]);

function defaultValidUntilDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return toDateInput(date);
}

function toDateInput(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toValidUntilIso(date: string) {
  return new Date(`${date}T23:59:59.000`).toISOString();
}

export default function CreateQuotationContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestIdFromQuery = searchParams.get("requestId") ?? "";

  const [selectedRequestId, setSelectedRequestId] = useState(requestIdFromQuery);
  const [laborAmount, setLaborAmount] = useState("");
  const [partLines, setPartLines] = useState<QuotePartLine[]>([]);
  const [existingPartsAmount, setExistingPartsAmount] = useState(0);
  const [discount, setDiscount] = useState("");
  const [validUntil, setValidUntil] = useState(defaultValidUntilDate);
  const [customerNotes, setCustomerNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const { data: requestList } = useGetAdminServiceRequestsQuery({
    page: 1,
    pageSize: 100,
  });
  const { data: request } = useGetAdminServiceRequestByIdQuery(
    selectedRequestId,
    { skip: !selectedRequestId },
  );
  const [createQuotation, { isLoading: isSending }] =
    useCreateAdminQuotationMutation();
  const [approveCounteroffer, { isLoading: isApproving }] =
    useApproveAdminCounterofferMutation();
  const [rejectCounteroffer, { isLoading: isRejecting }] =
    useRejectAdminCounterofferMutation();
  const isDeciding = isApproving || isRejecting;

  const quoteableRequests = useMemo(
    () =>
      (requestList?.items ?? []).filter((item) =>
        QUOTEABLE_REQUEST_STATUSES.has(item.status),
      ),
    [requestList],
  );

  useEffect(() => {
    if (requestIdFromQuery) {
      setSelectedRequestId(requestIdFromQuery);
    }
  }, [requestIdFromQuery]);

  useEffect(() => {
    const quote = request?.quotation;
    if (!quote) return;

    setLaborAmount(quote.laborAmount ? String(quote.laborAmount) : "");
    setExistingPartsAmount(quote.partsAmount ?? 0);
    setDiscount(quote.discountAmount ? String(quote.discountAmount) : "");
    setCustomerNotes(quote.notes ?? "");
    if (quote.validUntil) {
      setValidUntil(toDateInput(quote.validUntil));
    }
  }, [request]);

  const laborVal = Number((parseFloat(laborAmount) || 0).toFixed(2));
  const partsVal = partLines.length
    ? partsTotal(partLines)
    : Number(existingPartsAmount.toFixed(2));
  const discountVal = Number((parseFloat(discount) || 0).toFixed(2));
  const taxAmount = 0;
  const totalAmount = Number(
    Math.max(0, laborVal + partsVal + taxAmount - discountVal).toFixed(2),
  );

  const customerName = request?.customer
    ? `${request.customer.firstName} ${request.customer.lastName}`.trim()
    : "Select a request";
  const requestNumber = request?.requestNumber ?? "—";
  const quoteNumber = request?.quotation?.quoteNumber ?? "New quote";
  const quoteStatus = request?.quotation?.status;
  const quotedAmount = Number(request?.quotation?.totalAmount ?? totalAmount);
  const pendingNegotiation = (request?.quotation?.counteroffers ?? []).find(
    (offer) => offer.status === "PENDING",
  );
  const negotiationAmount = pendingNegotiation
    ? Number(pendingNegotiation.requestedTotal)
    : request?.quotation?.negotiatedTotal != null
      ? Number(request.quotation.negotiatedTotal)
      : null;
  const showNegotiation = negotiationAmount != null && !Number.isNaN(negotiationAmount);
  const isLocked = Boolean(
    (quoteStatus && LOCKED_QUOTE_STATUSES.has(quoteStatus)) ||
      (request?.status && LOCKED_REQUEST_STATUSES.has(request.status)),
  );
  const pageTitle = isLocked
    ? `View Quotation — ${quoteNumber}`
    : request?.quotation
      ? `Revise Quotation — ${quoteNumber}`
      : `Create Quotation — ${quoteNumber}`;
  const lockNote =
    quoteStatus === "ACCEPTED"
      ? "This quotation was accepted and can no longer be changed."
      : "This quotation can no longer be updated.";

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    toast("Drafts are not stored on the server. Send the quotation to the customer.");
    window.setTimeout(() => setIsDraftSaved(false), 2500);
  };

  const handleSendQuotation = async () => {
    if (isLocked) {
      toast.error(lockNote);
      return;
    }

    if (!selectedRequestId) {
      toast.error("Select a service request before sending a quotation.");
      return;
    }

    if (laborVal <= 0 && partsVal <= 0) {
      toast.error("Add a labor amount or at least one product part.");
      return;
    }

    if (!validUntil) {
      toast.error("Set a valid-until date.");
      return;
    }

    const notes = [customerNotes.trim(), partsNotes(partLines)]
      .filter(Boolean)
      .join("\n\n");

    try {
      await createQuotation({
        requestId: selectedRequestId,
        body: {
          laborAmount: laborVal,
          partsAmount: partsVal,
          taxAmount,
          discountAmount: discountVal,
          notes: notes || undefined,
          validUntil: toValidUntilIso(validUntil),
        },
      }).unwrap();
      toast.success("Quotation successfully sent to customer!");
      router.push("/admin/quotations");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Could not send the quotation."));
    }
  };

  const handleApproveNegotiation = async () => {
    if (!pendingNegotiation) return;
    try {
      await approveCounteroffer({ id: pendingNegotiation.id }).unwrap();
      toast.success(
        "Offer approved. The customer still needs to accept the quotation.",
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not approve the customer offer."),
      );
    }
  };

  const handleRejectNegotiation = async () => {
    if (!pendingNegotiation) return;
    try {
      await rejectCounteroffer({ id: pendingNegotiation.id }).unwrap();
      toast.success("Customer offer rejected.");
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not reject the customer offer."),
      );
    }
  };

  return (
    <div className="cq-page">
      <CreateQuotationHeader
        quoteId={quoteNumber}
        serviceRequestId={requestNumber}
        customerName={customerName}
        title={pageTitle}
        readOnly={isLocked}
        lockNote={lockNote}
        onSaveDraft={handleSaveDraft}
        onSendQuotation={handleSendQuotation}
      />

      <div className="cq-main-layout">
        <div className="cq-left-col">
          {!requestIdFromQuery && (
            <div className="cq-card">
              <h2 className="cq-card__title">Service request</h2>
              <div className="cq-field-group">
                <label htmlFor="cq-request-select" className="cq-field-label">
                  Select a request to quote
                </label>
                <select
                  id="cq-request-select"
                  className="cq-currency-input"
                  value={selectedRequestId}
                  onChange={(e) => setSelectedRequestId(e.target.value)}
                >
                  <option value="">Select service request...</option>
                  {quoteableRequests.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.requestNumber} — {item.customer.firstName}{" "}
                      {item.customer.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {showNegotiation && negotiationAmount != null ? (
            <CustomerNegotiationCard
              quotedAmount={quotedAmount}
              requestedAmount={negotiationAmount}
              note={pendingNegotiation?.note ?? null}
              status={pendingNegotiation ? "PENDING" : "APPROVED"}
              onApprove={handleApproveNegotiation}
              onReject={handleRejectNegotiation}
              isDeciding={isDeciding}
            />
          ) : null}

          <QuotePartsCard
            lines={partLines}
            onChange={setPartLines}
            readOnly={isLocked}
          />

          <PriceBreakdownCard
            laborAmount={laborAmount}
            onLaborChange={setLaborAmount}
            partsAmount={partsVal}
            discount={discount}
            onDiscountChange={setDiscount}
            taxAmount={taxAmount}
            validUntil={validUntil}
            onValidUntilChange={setValidUntil}
            totalAmount={totalAmount}
            readOnly={isLocked}
          />

          <QuotationNotesCard
            customerNotes={customerNotes}
            onCustomerNotesChange={setCustomerNotes}
            internalNotes={internalNotes}
            onInternalNotesChange={setInternalNotes}
            readOnly={isLocked}
          />
        </div>

        <div className="cq-right-col">
          <QuotationSummarySidebar
            customerName={customerName}
            serviceRequestId={requestNumber}
            totalAmount={totalAmount}
            quotedAmount={quotedAmount}
            customerOfferAmount={showNegotiation ? negotiationAmount : null}
            offerPending={Boolean(pendingNegotiation)}
            onSendQuotation={handleSendQuotation}
            onSaveDraft={handleSaveDraft}
            onApproveOffer={handleApproveNegotiation}
            onRejectOffer={handleRejectNegotiation}
            isSending={isSending}
            isDeciding={isDeciding}
            isDraftSaved={isDraftSaved}
            readOnly={isLocked}
            statusNote={lockNote}
          />
        </div>
      </div>
      <AdminSubmitOverlay
        open={isSending || isDeciding}
        message={isDeciding ? "Updating negotiation..." : "Sending quotation..."}
      />
    </div>
  );
}
