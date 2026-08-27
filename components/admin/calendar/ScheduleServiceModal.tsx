"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { DURATION_OPTIONS } from "./calendarData";
import {
  useAssignAdminServiceRequestMutation,
  useGetAdminServiceRequestByIdQuery,
  useGetAdminServiceRequestsQuery,
} from "@/redux/features/api/admin/serviceRequestsApi";
import { useGetAdminTechniciansQuery } from "@/redux/features/api/admin/techniciansApi";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import type { AdminServiceRequestItem } from "@/types/admin/serviceRequests";

interface ScheduleServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequestId?: string;
  initialTechnicianId?: string;
}

function addMinutes(iso: string, minutes: number) {
  return new Date(new Date(iso).getTime() + minutes * 60 * 1000).toISOString();
}

function personName(item: { firstName: string; lastName: string }) {
  return `${item.firstName} ${item.lastName}`.trim();
}

export default function ScheduleServiceModal({
  isOpen,
  onClose,
  initialRequestId = "",
  initialTechnicianId = "",
}: ScheduleServiceModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [customerId, setCustomerId] = useState("");
  const [requestId, setRequestId] = useState(initialRequestId);
  const [technicianId, setTechnicianId] = useState(initialTechnicianId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("120");

  const { data: acceptedPage } = useGetAdminServiceRequestsQuery(
    { status: "ACCEPTED", page: 1, pageSize: 100 },
    { skip: !isOpen },
  );
  const { data: selectedRequest } = useGetAdminServiceRequestByIdQuery(requestId, {
    skip: !isOpen || !requestId,
  });
  const { data: techniciansPage } = useGetAdminTechniciansQuery(
    {
      page: 1,
      pageSize: 100,
      verificationStatus: "VERIFIED",
      timezone:
        typeof Intl === "undefined"
          ? "UTC"
          : Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      ...(initialTechnicianId ? {} : { isAvailable: true }),
    },
    { skip: !isOpen },
  );
  const [assignRequest, { isLoading }] = useAssignAdminServiceRequestMutation();

  const acceptedRequests = acceptedPage?.items ?? [];
  const requests = useMemo(() => {
    const unassigned = acceptedRequests.filter((item) => !item.technician);
    if (
      requestId &&
      selectedRequest?.id === requestId &&
      selectedRequest.status === "ACCEPTED" &&
      !selectedRequest.technician &&
      !unassigned.some((item) => item.id === selectedRequest.id)
    ) {
      return [
        {
          id: selectedRequest.id,
          requestNumber: selectedRequest.requestNumber,
          status: selectedRequest.status,
          description: selectedRequest.description,
          customer: selectedRequest.customer
            ? {
                id: selectedRequest.customer.id,
                firstName: selectedRequest.customer.firstName,
                lastName: selectedRequest.customer.lastName,
                email: selectedRequest.customer.email,
                phone: null,
              }
            : {
                id: selectedRequest.customerId,
                firstName: "Customer",
                lastName: "",
                email: "",
                phone: null,
              },
          technician: null,
          category: selectedRequest.category ?? { id: "", name: "Service" },
          issue: selectedRequest.issue ?? null,
          scheduledStart: selectedRequest.scheduledStart,
          createdAt: "",
        } satisfies AdminServiceRequestItem,
        ...unassigned,
      ];
    }
    return unassigned;
  }, [acceptedRequests, requestId, selectedRequest]);

  const customers = useMemo(() => {
    const unique = new Map<string, string>();
    requests.forEach((item) => {
      unique.set(item.customer.id, personName(item.customer));
    });
    return Array.from(unique, ([id, name]) => ({ id, name }));
  }, [requests]);

  const filteredRequests = customerId
    ? requests.filter((item) => item.customer.id === customerId)
    : requests;

  const technicians = techniciansPage?.items ?? [];

  const selected = requests.find((item) => item.id === requestId);
  const address = selectedRequest?.address
    ? [
        selectedRequest.address.line1,
        selectedRequest.address.apartment,
        selectedRequest.address.city,
        selectedRequest.address.state,
        selectedRequest.address.zipCode,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  useEffect(() => {
    if (!isOpen) return;
    setCustomerId("");
    setRequestId(initialRequestId);
    setTechnicianId(initialTechnicianId);
    setDate("");
    setTime("");
    setDuration("120");
  }, [isOpen, initialRequestId, initialTechnicianId]);

  useEffect(() => {
    if (!isOpen || !requestId) return;
    if (selectedRequest?.id === requestId && selectedRequest.customer?.id) {
      setCustomerId(selectedRequest.customer.id);
    }
  }, [isOpen, requestId, selectedRequest]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("admin-no-scroll");
    } else {
      document.body.classList.remove("admin-no-scroll");
    }
    return () => {
      document.body.classList.remove("admin-no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!requestId || !technicianId || !date || !time) {
      toast.error("Select a request, technician, date, and time.");
      return;
    }

    const scheduledStart = new Date(`${date}T${time}:00`).toISOString();
    const scheduledEnd = addMinutes(scheduledStart, Number(duration) || 120);

    try {
      await assignRequest({
        id: requestId,
        body: { technicianId, scheduledStart, scheduledEnd },
      }).unwrap();
      toast.success("Service scheduled. The customer and technician were notified.");
      onClose();
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Could not schedule this request. It must be accepted and authorized.",
        ),
      );
    }
  };

  return (
    <div
      className="ssm-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ssm-title"
    >
      <div className="ssm-card" ref={dialogRef}>
        <div className="ssm-header">
          <h2 className="ssm-title" id="ssm-title">
            Schedule Service
          </h2>
          <button
            className="ssm-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="ssm-divider" />

        <form className="ssm-form" onSubmit={handleSubmit}>
          <div className="ssm-field ssm-field--full">
            <label htmlFor="ssm-customer" className="ssm-label">
              Customer
            </label>
            <select
              id="ssm-customer"
              className="ssm-select"
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                setRequestId("");
              }}
            >
              <option value="">Select customer...</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="ssm-row">
            <div className="ssm-field">
              <label htmlFor="ssm-sr" className="ssm-label">
                Service request
              </label>
              <select
                id="ssm-sr"
                className="ssm-select"
                value={requestId}
                onChange={(e) => {
                  const nextId = e.target.value;
                  setRequestId(nextId);
                  const next = requests.find((item) => item.id === nextId);
                  if (next) setCustomerId(next.customer.id);
                }}
              >
                <option value="">
                  {filteredRequests.length
                    ? "Select request..."
                    : "No accepted requests waiting for a technician"}
                </option>
                {filteredRequests.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.requestNumber} — {personName(item.customer)} ·{" "}
                    {item.category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ssm-field">
              <label htmlFor="ssm-tech" className="ssm-label">
                Assigned technician
              </label>
              <select
                id="ssm-tech"
                className="ssm-select"
                value={technicianId}
                onChange={(e) => setTechnicianId(e.target.value)}
              >
                <option value="">Select technician...</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {personName(tech)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ssm-row">
            <div className="ssm-field">
              <label htmlFor="ssm-date" className="ssm-label">
                Scheduled date
              </label>
              <input
                id="ssm-date"
                type="date"
                className="ssm-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="ssm-field">
              <label htmlFor="ssm-time" className="ssm-label">
                Scheduled time
              </label>
              <input
                id="ssm-time"
                type="time"
                className="ssm-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="ssm-row">
            <div className="ssm-field">
              <label htmlFor="ssm-duration" className="ssm-label">
                Estimated duration
              </label>
              <select
                id="ssm-duration"
                className="ssm-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {DURATION_OPTIONS.map((option) => (
                  <option key={option.minutes} value={String(option.minutes)}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="ssm-field">
              <label htmlFor="ssm-address" className="ssm-label">
                Service address
              </label>
              <input
                id="ssm-address"
                type="text"
                className="ssm-input"
                placeholder="123 Main St..."
                value={address}
                readOnly
              />
            </div>
          </div>

          <div className="ssm-field ssm-field--full">
            <label htmlFor="ssm-notes" className="ssm-label">
              Customer notes
            </label>
            <textarea
              id="ssm-notes"
              className="ssm-textarea"
              rows={4}
              placeholder="Add any relevant notes..."
              defaultValue={selected?.description ?? ""}
              readOnly
            />
          </div>

          <div className="ssm-actions">
            <button
              type="submit"
              id="ssm-save"
              className="ssm-btn ssm-btn--primary cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save schedule"}
            </button>
            <button
              type="submit"
              id="ssm-save-notify"
              className="ssm-btn ssm-btn--secondary cursor-pointer"
              disabled={isLoading}
            >
              Save &amp; notify customer
            </button>
            <button
              type="button"
              id="ssm-cancel"
              className="ssm-btn ssm-btn--ghost cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
