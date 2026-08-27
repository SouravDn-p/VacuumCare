"use client";

import { Home, MapPin, Pencil, Plus, Trash2 } from "lucide-react";

import type { CustomerAddress } from "@/types/customer/profile/profileTypes";

interface SavedAddressesProps {
  addresses: CustomerAddress[];

  onAdd: () => void;

  onEdit: (address: CustomerAddress) => void;

  onDelete: (id: string) => void;

  isDeleting?: boolean;
}

export default function SavedAddresses({
  addresses,
  onAdd,
  onEdit,
  onDelete,
  isDeleting,
}: SavedAddressesProps) {
  return (
    <section>
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-5">
        <h2
          className="text-[18px] font-bold text-[#1a73e8] sm:text-[20px]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Saved Addresses
        </h2>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1a73e8] hover:underline sm:text-[14px]"
        >
          <Plus size={16} strokeWidth={2} />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-[#cddff5] bg-white px-6 py-10 text-center">
          <MapPin size={30} className="mx-auto text-[#1a73e8]" />

          <p className="mt-3 text-[14px] text-[#59636a]">
            You don&apos;t have any saved addresses yet.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-4 text-[14px] font-semibold text-[#1a73e8] hover:underline"
          >
            Add your first address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {addresses.map((address, index) => {
            const Icon = address.isPrimary ? Home : MapPin;

            return (
              <article
                key={address.id}
                className="flex min-h-[230px] flex-col rounded-[14px] border border-[#e7f0fb] bg-white p-6"
              >
                {/* Title */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#1a73e8]"
                    />

                    <h3 className="text-[17px] font-semibold text-[#1a73e8] sm:text-[18px]">
                      {address.isPrimary
                        ? "Primary Address"
                        : `Address ${index + 1}`}
                    </h3>
                  </div>

                  {address.isPrimary && (
                    <span className="rounded-full bg-[#e7f1ff] px-2.5 py-1 text-[10px] font-semibold text-[#1a73e8]">
                      PRIMARY
                    </span>
                  )}
                </div>

                {/* Address */}
                <address className="mt-5 not-italic text-[14px] leading-[24px] text-[#505960] sm:text-[15px]">
                  <div>{address.line1}</div>

                  {address.apartment && <div>{address.apartment}</div>}

                  <div>
                    {address.city}, {address.state} {address.zipCode}
                  </div>

                  <div>{address.country}</div>
                </address>

                {/* Actions */}
                <div className="mt-auto border-t border-[#edf1f4] pt-5">
                  <div className="flex items-center gap-5">
                    <button
                      type="button"
                      onClick={() => onEdit(address)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#424c52] transition hover:text-[#1a73e8]"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => onDelete(address.id)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#424c52] transition hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
