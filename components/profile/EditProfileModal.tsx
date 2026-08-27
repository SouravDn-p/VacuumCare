"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Camera, LoaderCircle, UserRound, X } from "lucide-react";

import type {
  CustomerProfile,
  UpdateProfileRequest,
} from "@/types/customer/profile/profileTypes";

interface EditProfileModalProps {
  open: boolean;

  profile: CustomerProfile;

  isLoading: boolean;

  onClose: () => void;

  onSave: (data: UpdateProfileRequest) => Promise<void>;
}

export default function EditProfileModal({
  open,
  profile,
  isLoading,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");

  const [avatar, setAvatar] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setPhone(profile.phone ?? "");
      setCompany(profile.company ?? "");
      setAvatar(null);
      setPreview(profile.avatarUrl);
      setError("");
    }
  }

  if (!open) return null;

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    try {
      await onSave({
        firstName,
        lastName,
        phone,
        company,
        avatar,
      });
    } catch {
      setError("Unable to update profile.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-[18px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edf0f2] px-6 py-5">
          <div>
            <h2
              className="text-[22px] font-bold text-[#1a73e8]"
              style={{
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Edit Profile
            </h2>

            <p className="mt-1 text-[13px] text-[#667085]">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f6f8] text-[#667085]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <label className="group relative cursor-pointer">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#eef6ff]">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={36} className="text-[#1a73e8]" />
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition group-hover:opacity-100">
                  <Camera size={22} className="text-white" />
                </div>
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatar}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="First Name"
              value={firstName}
              onChange={setFirstName}
            />

            <Field label="Last Name" value={lastName} onChange={setLastName} />
          </div>

          <Field
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            type="tel"
          />

          <Field label="Company" value={company} onChange={setCompany} />

          {/* Email readonly */}
          <div>
            <label className="mb-2 block text-[14px] font-medium text-[#20252b]">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="h-12 w-full rounded-[8px] border border-[#e1e5e9] bg-[#f6f7f8] px-4 text-[14px] text-[#8a9298]"
            />

            <p className="mt-1.5 text-[12px] text-[#879198]">
              Email cannot be changed from this form.
            </p>
          </div>

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
              disabled={isLoading || !firstName.trim() || !lastName.trim()}
              className="flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#1a73e8] px-6 text-[14px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading && <LoaderCircle size={17} className="animate-spin" />}

              {isLoading ? "Saving..." : "Save Changes"}
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
  type = "text",
}: {
  label: string;
  value: string;

  onChange: (value: string) => void;

  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#20252b]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-[8px] border border-[#cfd6dd] bg-white px-4 text-[14px] text-[#344054] outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
      />
    </div>
  );
}
