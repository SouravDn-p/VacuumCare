"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  useGetAdminTechniciansQuery,
  useVerifyAdminTechnicianMutation,
} from "@/redux/features/api/admin/techniciansApi";
import type { AdminTechnicianItem } from "@/types/admin/technicians";

const PAGE_SIZE = 8;

function initials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function pageNumbers(page: number, totalPages: number) {
  return Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (value) =>
      value === 1 || value === totalPages || Math.abs(value - page) <= 1,
  );
}

export default function PendingApprovals() {
  const [page, setPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const { data, isLoading: isListLoading, isFetching } = useGetAdminTechniciansQuery({
    page,
    pageSize: PAGE_SIZE,
    timezone: "America/Toronto",
    verificationStatus: "PENDING_VERIFICATION",
  });
  const [verifyTechnician, { isLoading }] = useVerifyAdminTechnicianMutation();

  const technicians = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const decide = async (id: string, status: "VERIFIED" | "REJECTED") => {
    setBusyId(id);
    try {
      await verifyTechnician({ id, body: { status } }).unwrap();
      toast.success(
        status === "VERIFIED"
          ? "Technician approved"
          : "Technician registration declined",
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          status === "VERIFIED"
            ? "Could not approve this technician"
            : "Could not decline this technician",
        ),
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="tech-reports-panel tech-pending-panel">
      <div className="tech-reports-panel__header">
        <h2 className="tech-reports-panel__title">Pending approval</h2>
        <span className="tech-pending-count">{total}</span>
      </div>

      <div
        className={`tech-reports-panel__content${isFetching ? " tech-pending-content--busy" : ""}`}
      >
        {isListLoading && technicians.length === 0 ? (
          <p className="tech-pending-empty">Loading pending approvals…</p>
        ) : technicians.length === 0 ? (
          <p className="tech-pending-empty">
            No technician signups waiting for approval.
          </p>
        ) : (
          technicians.map((tech: AdminTechnicianItem) => (
            <div key={tech.id} className="tech-report-row">
              <div className="tech-report-row__user">
                <div className="tech-report-row__avatar" aria-hidden="true">
                  <span className="tech-report-row__avatar-text">
                    {initials(tech.firstName, tech.lastName)}
                  </span>
                </div>
                <div className="tech-report-row__info">
                  <p className="tech-report-row__name">
                    {`${tech.firstName} ${tech.lastName}`.trim()}
                  </p>
                  <p className="tech-report-row__role">
                    {tech.skills[0] || "Field Technician"}
                    {tech.serviceArea ? ` · ${tech.serviceArea}` : ""}
                  </p>
                  <p className="tech-pending-meta">
                    {tech.email}
                    {tech.phone ? ` · ${tech.phone}` : ""}
                    {!tech.isActive ? " · Email not verified yet" : ""}
                  </p>
                </div>
              </div>

              <div className="tech-report-row__actions">
                <button
                  type="button"
                  className="tech-report-btn tech-report-btn--reject"
                  disabled={isLoading && busyId === tech.id}
                  onClick={() => void decide(tech.id, "REJECTED")}
                >
                  Decline
                </button>
                <button
                  type="button"
                  className="tech-report-btn tech-report-btn--approve"
                  disabled={isLoading && busyId === tech.id}
                  onClick={() => void decide(tech.id, "VERIFIED")}
                >
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {total > PAGE_SIZE && (
        <div className="tech-pending-pager" aria-label="Pending approvals pages">
          <p className="tech-pending-pager__range">
            Showing {from}–{to} of {total}
          </p>

          <div className="tech-pending-pager__controls">
            <button
              type="button"
              className="tech-pending-pager__nav"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="tech-pending-pager__pages">
              {pageNumbers(page, totalPages).map((value, index, pages) => (
                <div key={value} className="tech-pending-pager__page-wrap">
                  {index > 0 && pages[index - 1] !== value - 1 && (
                    <span className="tech-pending-pager__ellipsis">…</span>
                  )}
                  <button
                    type="button"
                    className={`tech-pending-pager__page${page === value ? " tech-pending-pager__page--active" : ""}`}
                    onClick={() => setPage(value)}
                    aria-current={page === value ? "page" : undefined}
                  >
                    {value}
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="tech-pending-pager__nav"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
