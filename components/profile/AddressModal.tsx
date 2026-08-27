"use client";

import { FormEvent, useEffect, useState } from "react";

import { LoaderCircle, MapPin, X } from "lucide-react";

import type {
  CreateAddressRequest,
  CustomerAddress,
} from "@/types/customer/profile/profileTypes";

interface AddressModalProps {
  open: boolean;

  address: CustomerAddress | null;

  isLoading: boolean;

  onClose: () => void;

  onSave: (data: CreateAddressRequest) => Promise<void>;
}

export default function AddressModal({
  open,
  address,
  isLoading,
  onClose,
  onSave,
}: AddressModalProps) {
  const [line1, setLine1] = useState("");

  const [apartment, setApartment] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [zipCode, setZipCode] = useState("");

  const [country, setCountry] = useState("Canada");

  const [isPrimary, setIsPrimary] = useState(false);

  const [error, setError] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setLine1(address?.line1 ?? "");
      setApartment(address?.apartment ?? "");
      setCity(address?.city ?? "");
      setState(address?.state ?? "");
      setZipCode(address?.zipCode ?? "");
      setCountry(address?.country ?? "Canada");
      setIsPrimary(address?.isPrimary ?? false);
      setError("");
    }
  }

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    try {
      await onSave({
        line1,
        apartment: apartment || undefined,

        city,
        state,
        zipCode,
        country,

        isPrimary,
      });
    } catch {
      setError(
        address ? "Unable to update address." : "Unable to add address.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-[580px] overflow-y-auto rounded-[18px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edf0f2] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef6ff] text-[#1a73e8]">
              <MapPin size={19} />
            </div>

            <div>
              <h2
                className="text-[21px] font-bold text-[#1a73e8]"
                style={{
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {address ? "Edit Address" : "Add Address"}
              </h2>

              <p className="mt-0.5 text-[12px] text-[#667085]">
                Save your delivery or service address.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f6f8]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <Field
            label="Street Address*"
            value={line1}
            onChange={setLine1}
            placeholder="123 Main Street"
          />

          <Field
            label="Apartment / Unit"
            value={apartment}
            onChange={setApartment}
            placeholder="Unit 4B"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="City*"
              value={city}
              onChange={setCity}
              placeholder="Toronto"
            />

            <Field
              label="State / Province*"
              value={state}
              onChange={setState}
              placeholder="ON"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="ZIP / Postal Code*"
              value={zipCode}
              onChange={setZipCode}
              placeholder="M5V 2T6"
            />

            <Field
              label="Country*"
              value={country}
              onChange={setCountry}
              placeholder="Canada"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-[8px] bg-[#f5f9ff] p-4">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(event) => setIsPrimary(event.target.checked)}
              className="h-4 w-4 accent-[#1a73e8]"
            />

            <div>
              <p className="text-[13px] font-semibold text-[#30373c]">
                Make this my primary address
              </p>

              <p className="mt-0.5 text-[11px] text-[#748089]">
                This address will be selected by default.
              </p>
            </div>
          </label>

          {error && (
            <div className="rounded-[8px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-[#edf0f2] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 rounded-[8px] border border-[#d9dfe5] px-5 text-[14px] font-semibold text-[#4c565d]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isLoading ||
                !line1.trim() ||
                !city.trim() ||
                !state.trim() ||
                !zipCode.trim() ||
                !country.trim()
              }
              className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] px-6 text-[14px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading && <LoaderCircle size={17} className="animate-spin" />}

              {isLoading
                ? "Saving..."
                : address
                  ? "Update Address"
                  : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;

  onChange: (value: string) => void;

  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#20252b]">
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[8px] border border-[#cfd6dd] bg-white px-4 text-[14px] text-[#344054] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
      />
    </div>
  );
}
