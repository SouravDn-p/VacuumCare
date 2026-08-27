"use client";

import { FormEvent, useState } from "react";
import { Paperclip, X } from "lucide-react";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useIsLoggedIn } from "@/lib/useIsLoggedIn";
import { useSubmitContactMutation } from "@/redux/features/api/customer/contact/contactApi";
import { useGetProfileQuery } from "@/redux/features/api/customer/profile/profileApi";
import {
  useOpenSupportConversationMutation,
  useSendConversationMessageMutation,
} from "@/redux/features/api/customer/service/customerServiceApi";

const SUBJECT_OPTIONS = [
  { value: "technical", label: "Technical Issue" },
  { value: "installation", label: "Installation Support" },
  { value: "repair", label: "Repair Request" },
  { value: "billing", label: "Billing / Payment" },
  { value: "warranty", label: "Warranty" },
  { value: "product", label: "Product Question" },
  { value: "other", label: "Other" },
] as const;

const fieldClass =
  "w-full h-[52px] rounded-[10px] bg-[#f2f6ff] border border-transparent px-4 text-[14px] text-[#404848] outline-none transition placeholder:text-[#8a9299] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10";

export default function SupportRequestForm() {
  const isLoggedIn = useIsLoggedIn();

  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  const [submitContact] = useSubmitContactMutation();
  const [openSupport] = useOpenSupportConversationMutation();
  const [sendMessage] = useSendConversationMessageMutation();

  const [subject, setSubject] = useState<(typeof SUBJECT_OPTIONS)[number]["value"]>(
    "technical",
  );
  const [orderId, setOrderId] = useState("");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjectLabel =
    SUBJECT_OPTIONS.find((option) => option.value === subject)?.label ??
    "Support request";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!description.trim()) {
      setError("Please describe your issue in detail.");
      return;
    }

    const name = isLoggedIn
      ? `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim()
      : fullName.trim();
    const contactEmail = isLoggedIn ? profile?.email ?? "" : email.trim();
    const contactPhone = isLoggedIn ? profile?.phone ?? "" : phone.trim();

    if (!name || !contactEmail) {
      setError(
        isLoggedIn
          ? "Unable to load your profile. Please refresh and try again."
          : "Please enter your name and email so we can follow up.",
      );
      return;
    }

    const message = [
      `Subject: ${subjectLabel}`,
      `Order/Service ID: ${orderId.trim() || "—"}`,
      "",
      description.trim(),
    ].join("\n");

    setIsSubmitting(true);

    try {
      let delivered = false;

      if (isLoggedIn) {
        try {
          const conversation = await openSupport().unwrap();
          const images = files.filter((file) => file.type.startsWith("image/")).slice(0, 5);
          const videos = files.filter((file) => file.type.startsWith("video/")).slice(0, 5);
          const attachments = [...images, ...videos].slice(0, 5);
          const imageFiles = attachments.filter((file) => file.type.startsWith("image/"));
          const videoFiles = attachments.filter((file) => file.type.startsWith("video/"));

          await sendMessage({
            conversationId: conversation.id,
            data: {
              body: message,
              images: imageFiles,
              videos: videoFiles,
            },
          }).unwrap();
          delivered = true;
        } catch {
          // Fall through to the public contact inbox.
        }
      }

      try {
        await submitContact({
          fullName: name,
          email: contactEmail,
          phone: contactPhone || undefined,
          service: subjectLabel,
          message,
        }).unwrap();
        delivered = true;
      } catch (contactError) {
        if (!delivered) throw contactError;
      }

      if (!delivered) {
        throw new Error("Unable to submit your request. Please try again.");
      }

      setDescription("");
      setOrderId("");
      setFiles([]);
      if (!isLoggedIn) {
        setFullName("");
        setEmail("");
        setPhone("");
      }
      setSuccess(
        isLoggedIn
          ? "Your request was sent. Our team can continue the conversation in Messages."
          : "Your request was sent. We will follow up by email shortly.",
      );
    } catch (submitError) {
      setError(
        getApiErrorMessage(
          submitError,
          "Unable to submit your request. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2
        className="text-[24px] sm:text-[26px] font-bold text-[#20252b] mb-7"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Submit a Request
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your name"
                className={fieldClass}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className={fieldClass}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className={labelClass}>
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                className={fieldClass}
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>
        )}

        {/* Subject + Order ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="subject" className={labelClass}>
              Subject
            </label>

            <div className="relative">
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={(event) =>
                  setSubject(
                    event.target.value as (typeof SUBJECT_OPTIONS)[number]["value"],
                  )
                }
                className="w-full h-[52px] appearance-none rounded-[10px] bg-[#f2f6ff] border border-transparent px-4 pr-10 text-[14px] text-[#404848] outline-none transition focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#667085"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div>
            <label htmlFor="orderId" className={labelClass}>
              Order/Service ID
            </label>

            <input
              id="orderId"
              name="orderId"
              type="text"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="#AV-XXXXXX"
              className={fieldClass}
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Please describe your issue in detail..."
            className="w-full min-h-[180px] resize-none rounded-[10px] bg-[#f2f6ff] border border-transparent p-4 text-[14px] text-[#404848] outline-none transition placeholder:text-[#8a9299] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div>
          <label
            htmlFor="attachment"
            className="group flex min-h-[74px] cursor-pointer items-center rounded-[10px] border border-dashed border-[#d5dde6] bg-white px-4 transition hover:border-[#1a73e8] hover:bg-[#f9fbff]"
          >
            <div className="flex items-center gap-3">
              <Paperclip
                size={20}
                strokeWidth={1.8}
                className="text-[#1a73e8]"
              />

              <span
                className="text-[14px] text-[#5d6670]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {isLoggedIn
                  ? "Attach files (optional)"
                  : "Log in to attach files. Guests can describe the issue instead."}
              </span>
            </div>

            <input
              id="attachment"
              name="attachment"
              type="file"
              className="hidden"
              multiple
              disabled={!isLoggedIn}
              onChange={(event) => {
                setFiles(Array.from(event.target.files ?? []).slice(0, 5));
                event.target.value = "";
              }}
            />
          </label>

          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-[8px] bg-[#f2f6ff] px-3 py-2"
                >
                  <p className="truncate text-[12px] text-[#48535b]">{file.name}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((current) =>
                        current.filter((_, fileIndex) => fileIndex !== index),
                      )
                    }
                    className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="rounded-[8px] border border-red-100 bg-red-50 px-4 py-3 text-[12px] text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-[8px] border border-green-100 bg-green-50 px-4 py-3 text-[12px] text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[54px] rounded-[10px] text-[15px] font-semibold text-white shadow-sm transition hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            fontFamily: "Inter, sans-serif",
            background: "linear-gradient(110deg, #0754c5 0%, #1a73e8 100%)",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

const labelClass =
  "block mb-2 text-[12px] font-semibold text-[#4d555c] uppercase tracking-[0.4px]";
