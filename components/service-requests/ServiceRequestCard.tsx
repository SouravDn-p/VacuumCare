"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";



import { needsServiceAuthorization } from "@/lib/servicePayment";
import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";
import ServiceRequestStatusBadge from "./ServiceRequestStatusBadge";
import ServiceRequestProgress from "./ServiceRequestProgress";

interface Props {
  request: CustomerServiceRequest;
}

export default function ServiceRequestCard({
  request,
}: Props) {
  const title =
    request.issue?.name ||
    request.category?.name ||
    "Service Request";

  const actionLabel = needsServiceAuthorization(request)
    ? "Authorize Payment"
    : request.status === "QUOTE_SENT"
      ? "Review Quote"
      : request.status === "SCHEDULED"
        ? "View Appointment"
        : "View Details";

  return (
    <article className="overflow-hidden rounded-[14px] border border-[#e9edf2] bg-white">
      <div className="px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#edf3f7] px-3 py-1 text-[10px] font-bold text-[#1a73e8]">
                #{request.requestNumber}
              </span>

              <span className="text-[10px] text-[#707a81]">
                {formatRequestDate(request)}
              </span>

              <ServiceRequestStatusBadge
                status={request.status}
              />
            </div>

            <h2
              className="mt-4 text-[16px] font-bold text-[#252b30]"
              style={{
                fontFamily:
                  "Manrope, sans-serif",
              }}
            >
              {title}
            </h2>

            <p className="mt-1.5 max-w-[650px] line-clamp-2 text-[12px] leading-[20px] text-[#68737a]">
              {request.description}
            </p>

            {request.status !== "COMPLETED" &&
              request.status !==
                "CANCELLED" && (
                <div className="mt-5 max-w-[390px]">
                  <ServiceRequestProgress
                    status={request.status}
                  />
                </div>
              )}

            <RequestMeta request={request} />
          </div>

          <Link
            href={
              request.status === "SCHEDULED" ||
              request.status === "IN_PROGRESS" ||
              request.status === "REPORT_SUBMITTED"
                ? `/schedule/${request.id}`
                : `/service-requests/${request.id}`
            }
            className={`inline-flex h-[42px] shrink-0 items-center justify-center gap-2 self-start rounded-[8px] px-5 text-[12px] font-semibold transition sm:self-center ${
              request.status === "QUOTE_SENT" ||
              needsServiceAuthorization(request) ||
              request.status === "SCHEDULED"
                ? "bg-[#edf4ff] text-[#1a73e8] hover:bg-[#e1edff]"
                : "bg-[#f1f4f7] text-[#333b40] hover:bg-[#e6ebf0]"
            }`}
          >
            {actionLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function RequestMeta({
  request,
}: {
  request: CustomerServiceRequest;
}) {
  if (request.status === "COMPLETED") {
    return (
      <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-[#1a73e8]">
        <CheckCircle2 size={14} />
        Service completed
      </div>
    );
  }

  if (request.status === "QUOTE_SENT") {
    return (
      <div className="mt-5 flex items-center gap-2 text-[11px] text-[#69747c]">
        <Clock3 size={14} />
        Waiting for your quote response
      </div>
    );
  }

  if (needsServiceAuthorization(request)) {
    return (
      <div className="mt-5 flex items-center gap-2 text-[11px] text-[#69747c]">
        <Clock3 size={14} />
        Quote accepted — authorize payment to continue
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[#4f5960]">
      {request.scheduledStart && (
        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={14}
            className="text-[#1a73e8]"
          />

          {new Date(
            request.scheduledStart,
          ).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </div>
      )}

      {request.address && (
        <div className="flex items-center gap-1.5">
          <MapPin
            size={14}
            className="text-[#1a73e8]"
          />

          {request.address.city},{" "}
          {request.address.state}
        </div>
      )}

      {request.technicianId && (
        <div className="flex items-center gap-1.5">
          <UserRound
            size={14}
            className="text-[#1a73e8]"
          />

          Technician assigned
        </div>
      )}
    </div>
  );
}

function formatRequestDate(
  request: CustomerServiceRequest,
) {
  const createdAt =
    (
      request as CustomerServiceRequest & {
        createdAt?: string;
      }
    ).createdAt;

  if (!createdAt) {
    return request.preferredDate
      ? new Date(
          request.preferredDate,
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";
  }

  return new Date(
    createdAt,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}