"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Plus } from "lucide-react";



import { useGetServiceRequestsQuery } from "@/redux/features/api/customer/service/customerServiceApi";

import type { CustomerServiceRequest } from "@/types/customer/service/customerTypes";
import ServiceRequestCard from "./ServiceRequestCard";

type RequestTab = "all" | "active" | "complete";

const tabs: {
  label: string;
  value: RequestTab;
}[] = [
  {
    label: "All Requests",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Complete",
    value: "complete",
  },
];

export default function ServiceRequestsPageClient() {
  const {
    data: requests = [],
    isLoading,
    isFetching,
    error,
  } = useGetServiceRequestsQuery();

  const [activeTab, setActiveTab] =
    useState<RequestTab>("all");

  const filteredRequests = useMemo(() => {
    const sorted = [...requests].sort(
      (a, b) =>
        getTimestamp(b) - getTimestamp(a),
    );

    if (activeTab === "active") {
      return sorted.filter(
        (request) =>
          request.status !== "COMPLETED" &&
          request.status !== "CANCELLED",
      );
    }

    if (activeTab === "complete") {
      return sorted.filter(
        (request) =>
          request.status === "COMPLETED",
      );
    }

    return sorted;
  }, [activeTab, requests]);

  if (isLoading) {
    return <RequestsSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-5">
        <div className="rounded-[14px] bg-white px-6 py-16 text-center">
          <p className="text-[14px] text-red-600">
            Unable to load service requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <div className="rounded-[14px] border border-[#e7eff7] bg-white px-5 py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-[30px] font-extrabold leading-[1.1] text-[#1a73e8] sm:text-[34px]"
              style={{
                fontFamily:
                  "Manrope, sans-serif",
              }}
            >
              Service Requests
            </h1>

            <p
              className="mt-2 text-[13px] text-[#59636a] sm:text-[14px]"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Track and manage your service activities.
            </p>
          </div>

          <Link
            href="/services#service-request"
            className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] px-5 text-[12px] font-semibold text-white transition hover:bg-[#0865d7]"
          >
            <Plus size={15} />
            Service Request
          </Link>
        </div>
      </div>

      <div className="mt-7 flex gap-4 overflow-x-auto border-b border-transparent sm:gap-8">
        {tabs.map((tab) => {
          const active =
            activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() =>
                setActiveTab(tab.value)
              }
              className={`relative whitespace-nowrap pb-3 text-[13px] transition sm:text-[14px] ${
                active
                  ? "font-semibold text-[#1a73e8]"
                  : "text-[#707a81] hover:text-[#1a73e8]"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#1a73e8]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-5">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(
            (request) => (
              <ServiceRequestCard
                key={request.id}
                request={request}
              />
            ),
          )
        ) : (
          <div className="rounded-[14px] bg-white px-6 py-16 text-center">
            <p className="text-[15px] text-[#68737a]">
              No service requests found in this
              category.
            </p>
          </div>
        )}
      </div>

      {isFetching && (
        <p className="mt-4 text-center text-[11px] text-[#859099]">
          Updating requests...
        </p>
      )}
    </div>
  );
}

function getTimestamp(
  request: CustomerServiceRequest,
) {
  const createdAt =
    "createdAt" in request
      ? (request as CustomerServiceRequest & {
          createdAt?: string;
        }).createdAt
      : undefined;

  return createdAt
    ? new Date(createdAt).getTime()
    : 0;
}

function RequestsSkeleton() {
  return (
    <div className="rounded-[18px] border border-[#dceafa] bg-[#f7fbff] p-4 sm:p-5">
      <div className="animate-pulse">
        <div className="h-[110px] rounded-[14px] bg-white" />

        <div className="mt-7 h-10 w-[280px] rounded-[8px] bg-white" />

        <div className="mt-6 space-y-5">
          <div className="h-[180px] rounded-[14px] bg-white" />
          <div className="h-[180px] rounded-[14px] bg-white" />
          <div className="h-[180px] rounded-[14px] bg-white" />
        </div>
      </div>
    </div>
  );
}