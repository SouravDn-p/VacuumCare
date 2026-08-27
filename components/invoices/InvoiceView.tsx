"use client";

import Image from "next/image";
import { Download, Printer } from "lucide-react";
import type { PaymentInvoice } from "@/types/customer/invoice";

function money(value: number) {
  const amount = Number(value || 0);
  const formatted = Math.abs(amount).toFixed(2);
  return amount < 0 ? `-$${formatted}` : `$${formatted}`;
}

function statusClass(label: string) {
  if (label === "PAID") return "bg-[#1a73e8] text-white";
  if (label === "REFUNDED") return "bg-[#e5efff] text-[#1a73e8]";
  if (label === "FAILED") return "bg-[#ffe1df] text-[#d83932]";
  if (label === "AUTHORIZED") return "bg-[#fff0d6] text-[#cc8300]";
  return "bg-[#fff0d6] text-[#cc8300]";
}

interface InvoiceViewProps {
  invoice: PaymentInvoice;
}

export default function InvoiceView({ invoice }: InvoiceViewProps) {
  const handlePrint = () => window.print();

  return (
    <article className="invoice-sheet rounded-[18px] border border-[#e7eef5] bg-white px-5 py-6 shadow-[0_10px_40px_rgba(26,115,232,0.06)] sm:px-8 sm:py-8 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1
            className="text-[34px] font-extrabold leading-none tracking-tight text-[#1f2933] sm:text-[40px]"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Invoice
          </h1>
          <p className="mt-3 text-[13px] text-[#6b7780]">
            ID: #{invoice.invoiceNumber}
          </p>
          <p className="mt-1 text-[13px] text-[#6b7780]">Date: {invoice.date}</p>
        </div>

        <div className="invoice-actions flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.6px] ${statusClass(
              invoice.statusLabel,
            )}`}
          >
            {invoice.statusLabel}
          </span>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-[8px] border border-[#d7e0e8] bg-white px-3 py-2 text-[12px] font-semibold text-[#314047] hover:bg-[#f7fafc]"
          >
            <Printer size={15} strokeWidth={1.8} />
            Print
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#1a73e8] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#155fc0]"
          >
            <Download size={15} strokeWidth={1.8} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2">
            {invoice.vendor.logoUrl && /^https?:\/\//.test(invoice.vendor.logoUrl) ? (
              <Image
                src={invoice.vendor.logoUrl}
                alt={invoice.vendor.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1a73e8] text-[14px] font-extrabold text-[#1a73e8]">
                E
              </div>
            )}
            <p className="text-[15px] font-bold text-[#243038]">{invoice.vendor.name}</p>
          </div>
          {invoice.vendor.addressLines.map((line) => (
            <p key={line} className="text-[13px] leading-6 text-[#66737c]">
              {line}
            </p>
          ))}
          {invoice.vendor.email && (
            <p className="mt-1 text-[13px] text-[#66737c]">{invoice.vendor.email}</p>
          )}
        </div>

        <div className="sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#8a959c]">
            Bill To
          </p>
          <p className="mt-2 text-[15px] font-bold text-[#243038]">{invoice.billTo.name}</p>
          {invoice.billTo.addressLines.map((line) => (
            <p key={line} className="text-[13px] leading-6 text-[#66737c]">
              {line}
            </p>
          ))}
          {invoice.billTo.email && (
            <p className="mt-1 text-[13px] text-[#66737c]">{invoice.billTo.email}</p>
          )}
        </div>
      </div>

      {invoice.service && (
        <section className="mt-8 grid grid-cols-1 gap-5 rounded-[10px] bg-[#eaf3ff] px-5 py-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Service Type", invoice.service.serviceType],
            ["Technician", invoice.service.technician],
            ["Service Date", invoice.service.serviceDate],
            ["Duration", invoice.service.duration],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#75818a]">
                {label}
              </p>
              <p className="mt-2 text-[12px] font-semibold text-[#30373c]">{value}</p>
            </div>
          ))}
        </section>
      )}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#edf1f4]">
              <th className="pb-3 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a959c]">
                Item & Description
              </th>
              <th className="pb-3 text-center text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a959c]">
                Qty
              </th>
              <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a959c]">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-b border-[#f3f6f8]">
                <td className="py-4">
                  <p className="text-[14px] font-semibold text-[#243038]">{item.name}</p>
                  {item.description && (
                    <p className="mt-1 text-[12px] text-[#748089]">{item.description}</p>
                  )}
                </td>
                <td className="py-4 text-center text-[13px] text-[#4b585f]">
                  {item.quantity}
                </td>
                <td className="py-4 text-right text-[14px] font-semibold text-[#243038]">
                  {money(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a959c]">
            Customer Notes
          </p>
          <div className="mt-2 min-h-[88px] rounded-[8px] border border-[#e7eef3] bg-[#fbfcfd] px-3 py-3 text-[13px] text-[#66737c]">
            {invoice.notes || ""}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[13px] text-[#5d6a72]">
            <span>Subtotal</span>
            <span>{money(invoice.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[13px] text-[#5d6a72]">
            <span>Service Charges</span>
            <span>{money(invoice.serviceCharges)}</span>
          </div>
          <div className="flex items-center justify-between text-[13px] text-[#5d6a72]">
            <span>Tax ({invoice.taxPercent}%)</span>
            <span>{money(invoice.tax)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#edf1f4] pt-3">
            <span className="text-[14px] font-bold text-[#243038]">Total Amount</span>
            <span className="text-[22px] font-extrabold text-[#1a73e8]">
              {money(invoice.total)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
