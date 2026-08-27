"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CloudUpload,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  X,
} from "lucide-react";

import AddressModal from "../profile/AddressModal";

import {
  useAddAddressMutation,
  useGetProfileQuery,
} from "@/redux/features/api/customer/profile/profileApi";

import {
  useCreateServiceRequestMutation,
  useGetServiceCatalogQuery,
} from "@/redux/features/api/customer/service/customerServiceApi";

import type {
  CreateAddressRequest,
  CustomerAddress,
} from "@/types/customer/profile/profileTypes";

import type { ServiceCategory } from "@/types/customer/service/customerTypes";

import type { ServiceTab } from "./ServicesPageClient";

interface Props {
  activeTab: ServiceTab;
}

export default function ServiceRequestSection({
  activeTab,
}: Props) {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetProfileQuery();

  const {
    data: catalogData,
    isLoading: isCatalogLoading,
    error: catalogError,
  } = useGetServiceCatalogQuery();

  const catalog = catalogData ?? EMPTY_CATALOG;

  const [addAddress, { isLoading: isAddingAddress }] =
    useAddAddressMutation();

  const [createServiceRequest, { isLoading: isSubmitting }] =
    useCreateServiceRequestMutation();

  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("");

  const [preferredDate, setPreferredDate] = useState("");
  const [description, setDescription] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedCategory = useMemo(
    () =>
      catalog.find(
        (category) => category.id === selectedCategoryId,
      ) ?? null,
    [catalog, selectedCategoryId],
  );

  useEffect(() => {
    const addresses = profile?.addresses;
    if (!addresses?.length) return;

    setSelectedAddressId((current) => {
      if (current && addresses.some((address) => address.id === current)) {
        return current;
      }

      return (
        addresses.find((address) => address.isPrimary)?.id ??
        addresses[0].id
      );
    });
  }, [profile?.addresses]);

  useEffect(() => {
    if (!catalog.length) return;

    const defaultCategory = findCategoryForTab(catalog, activeTab);
    setSelectedCategoryId(defaultCategory.id);
    setSelectedIssueId("");
  }, [activeTab, catalog]);

  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategoryId(event.target.value);
    setSelectedIssueId("");
    setFormError("");
    setSuccessMessage("");
  };

  const handleImages = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    setFormError("");
    setSuccessMessage("");

    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      setFormError("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    const remainingSlots = 2 - imageFiles.length;

    if (remainingSlots <= 0) {
      setFormError(
        "You can upload a maximum of 2 images.",
      );
      event.target.value = "";
      return;
    }

    if (selectedFiles.length > remainingSlots) {
      setFormError(
        `You can only upload ${remainingSlots} more image${
          remainingSlots > 1 ? "s" : ""
        }.`,
      );

      event.target.value = "";
      return;
    }

    setImageFiles((current) => [
      ...current,
      ...selectedFiles,
    ]);

    event.target.value = "";
  };

  const handleVideo = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    setFormError("");
    setSuccessMessage("");

    if (!selectedFiles.length) return;

    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("video/"),
    );

    if (invalidFile) {
      setFormError("Only video files are allowed.");
      event.target.value = "";
      return;
    }

    if (videoFiles.length >= 1) {
      setFormError(
        "You can upload a maximum of 1 video.",
      );
      event.target.value = "";
      return;
    }

    if (selectedFiles.length > 1) {
      setFormError(
        "You can upload only 1 video.",
      );
      event.target.value = "";
      return;
    }

    setVideoFiles(selectedFiles);

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImageFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const removeVideo = (index: number) => {
    setVideoFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const handleSaveAddress = async (
    data: CreateAddressRequest,
  ) => {
    try {
      setFormError("");

      const createdAddress =
        await addAddress(data).unwrap();

      setSelectedAddressId(createdAddress.id);
      setAddressModalOpen(false);
    } catch (error) {
      setFormError(
        getApiErrorMessage(
          error,
          "Unable to add the address.",
        ),
      );
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (!selectedAddressId) {
      setFormError(
        "Please select a service address.",
      );
      return;
    }

    if (!selectedCategoryId) {
      setFormError(
        "Please select a service category.",
      );
      return;
    }

    if (!description.trim()) {
      setFormError(
        "Please describe the issue or service you need.",
      );
      return;
    }

    if (description.trim().length > 4000) {
      setFormError(
        "Problem description cannot exceed 4000 characters.",
      );
      return;
    }

    if (imageFiles.length > 2) {
      setFormError(
        "You can upload a maximum of 2 images.",
      );
      return;
    }

    if (videoFiles.length > 1) {
      setFormError(
        "You can upload a maximum of 1 video.",
      );
      return;
    }

    try {
      const result =
        await createServiceRequest({
          categoryId: selectedCategoryId,
          issueId: selectedIssueId || undefined,
          addressId: selectedAddressId,
          description: description.trim(),
          preferredDate: preferredDate
            ? toApiDate(preferredDate)
            : undefined,
          images: imageFiles,
          videos: videoFiles,
        }).unwrap();

      setDescription("");
      setPreferredDate("");
      setSelectedIssueId("");
      setImageFiles([]);
      setVideoFiles([]);

      setSuccessMessage(
        `Service request ${result.requestNumber} was submitted successfully.`,
      );
    } catch (error) {
      setFormError(
        getApiErrorMessage(
          error,
          "Unable to submit your service request.",
        ),
      );
    }
  };

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : "";

  const isPageLoading =
    isProfileLoading || isCatalogLoading;

  return (
    <>
      <section
        id="service-request"
        className="py-10 lg:py-16"
      >
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
          <div className="rounded-[20px] bg-[#f1f6ff] p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="py-3">
                <h2
                  className="text-[30px] font-extrabold text-[#0875f5] sm:text-[34px]"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  Begin Your Request
                </h2>

                <p className="mt-4 max-w-[390px] text-[14px] leading-6 text-[#69747c]">
                  Our process is designed for clarity and
                  precision. By providing detailed
                  information, you ensure a quote that
                  reflects the true scope of work needed.
                </p>

                <div className="mt-8 space-y-6">
                  <InfoRow
                    icon={ShieldCheck}
                    title="Secure Uploads"
                    description="Your home data and images are handled with strict confidentiality."
                  />

                  <InfoRow
                    icon={TimerReset}
                    title="Fast Response"
                    description="Typically receive your expert quotation within 24 business hours."
                  />

                  <InfoRow
                    icon={Sparkles}
                    title="Expert Review"
                    description="Real technicians review every service submission."
                  />
                </div>

                <blockquote className="mt-9 rounded-[12px] bg-[#0875f5] p-6 text-white">
                  <p className="text-[14px] leading-6">
                    “The quotation was so detailed it
                    included parts I didn&apos;t even know
                    needed checking. Exceptional service
                    from start to finish.”
                  </p>

                  <footer className="mt-4 text-[12px] font-semibold">
                    — Marcus D., Homeowner
                  </footer>
                </blockquote>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[18px] bg-white p-5 shadow-[0_10px_35px_rgba(8,76,153,0.12)] sm:p-7"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={fullName}
                    placeholder="Full name"
                    readOnly
                  />

                  <Field
                    label="Email Address"
                    type="email"
                    value={profile?.email ?? ""}
                    placeholder="Email address"
                    readOnly
                  />

                  <Field
                    label="Phone Number"
                    type="tel"
                    value={profile?.phone ?? ""}
                    placeholder="No phone number added"
                    readOnly
                  />

                  <Field
                    label="Preferred Date"
                    type="date"
                    value={preferredDate}
                    onChange={setPreferredDate}
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label className={labelClass}>
                      Service Address
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setAddressModalOpen(true)
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0875f5]"
                    >
                      <Plus size={13} />
                      Add New
                    </button>
                  </div>

                  <select
                    value={selectedAddressId}
                    onChange={(event) =>
                      setSelectedAddressId(
                        event.target.value,
                      )
                    }
                    disabled={isProfileLoading}
                    className={inputClass}
                  >
                    <option value="">
                      {isProfileLoading
                        ? "Loading addresses..."
                        : "Select service address"}
                    </option>

                    {profile?.addresses?.map(
                      (address) => (
                        <option
                          key={address.id}
                          value={address.id}
                        >
                          {formatAddress(address)}
                          {address.isPrimary
                            ? " (Primary)"
                            : ""}
                        </option>
                      ),
                    )}
                  </select>

                  {!isProfileLoading &&
                    profile &&
                    profile.addresses.length === 0 && (
                      <p className="mt-2 text-[11px] text-[#7b858c]">
                        You don&apos;t have a saved
                        address yet. Add one to continue.
                      </p>
                    )}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Category
                    </label>

                    <select
                      value={selectedCategoryId}
                      onChange={handleCategoryChange}
                      disabled={isCatalogLoading}
                      className={`${inputClass} mt-2`}
                    >
                      <option value="">
                        {isCatalogLoading
                          ? "Loading categories..."
                          : "Select category"}
                      </option>

                      {catalog.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Service Type
                    </label>

                    <select
                      value={selectedIssueId}
                      onChange={(event) =>
                        setSelectedIssueId(
                          event.target.value,
                        )
                      }
                      disabled={
                        !selectedCategory ||
                        selectedCategory.issues.length === 0
                      }
                      className={`${inputClass} mt-2`}
                    >
                      <option value="">
                        {selectedCategory?.issues.length
                          ? "Select service type"
                          : "No specific service type"}
                      </option>

                      {selectedCategory?.issues.map(
                        (issue) => (
                          <option
                            key={issue.id}
                            value={issue.id}
                          >
                            {issue.name}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                {selectedCategory?.description && (
                  <p className="mt-2 text-[11px] leading-5 text-[#7b858c]">
                    {selectedCategory.description}
                  </p>
                )}

                <div className="mt-5">
                  <label className={labelClass}>
                    Problem Description
                  </label>

                  <textarea
                    rows={5}
                    value={description}
                    maxLength={4000}
                    onChange={(event) =>
                      setDescription(
                        event.target.value,
                      )
                    }
                    placeholder="Please describe the issue or project details..."
                    className="mt-2 w-full resize-none rounded-[8px] border border-[#e1e9f2] bg-[#f4f7fc] px-4 py-3 text-[13px] text-[#48535b] outline-none transition focus:border-[#0875f5]"
                  />

                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-[#98a2aa]">
                      {description.length}/4000
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>
                    Upload Images
                  </label>

                  <label
                    className={`mt-2 flex min-h-[130px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#b9c8d9] bg-white px-4 text-center transition ${
                      imageFiles.length >= 2
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-[#0875f5]"
                    }`}
                  >
                    <CloudUpload
                      size={27}
                      strokeWidth={1.6}
                      className="text-[#6d7880]"
                    />

                    <p className="mt-3 text-[12px] text-[#66737b]">
                      Upload up to{" "}
                      <span className="font-semibold text-[#0875f5]">
                        2 images
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] text-[#9ba3aa]">
                      JPG, PNG or other image formats
                    </p>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      disabled={imageFiles.length >= 2}
                      onChange={handleImages}
                      className="hidden"
                    />
                  </label>

                  {imageFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {imageFiles.map(
                        (file, index) => (
                          <FileItem
                            key={`${file.name}-${index}`}
                            file={file}
                            type="Image"
                            onRemove={() =>
                              removeImage(index)
                            }
                          />
                        ),
                      )}
                    </div>
                  )}

                  <p className="mt-2 text-right text-[10px] text-[#8b969e]">
                    {imageFiles.length}/2 images
                  </p>
                </div>

                <div className="mt-5">
                  <label className={labelClass}>
                    Upload Video
                  </label>

                  <label
                    className={`mt-2 flex min-h-[130px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#b9c8d9] bg-white px-4 text-center transition ${
                      videoFiles.length >= 1
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-[#0875f5]"
                    }`}
                  >
                    <CloudUpload
                      size={27}
                      strokeWidth={1.6}
                      className="text-[#6d7880]"
                    />

                    <p className="mt-3 text-[12px] text-[#66737b]">
                      Upload up to{" "}
                      <span className="font-semibold text-[#0875f5]">
                        1 video
                      </span>
                    </p>

                    <p className="mt-1 text-[10px] text-[#9ba3aa]">
                      MP4 or other video formats
                    </p>

                    <input
                      type="file"
                      accept="video/*"
                      disabled={videoFiles.length >= 1}
                      onChange={handleVideo}
                      className="hidden"
                    />
                  </label>

                  {videoFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {videoFiles.map(
                        (file, index) => (
                          <FileItem
                            key={`${file.name}-${index}`}
                            file={file}
                            type="Video"
                            onRemove={() =>
                              removeVideo(index)
                            }
                          />
                        ),
                      )}
                    </div>
                  )}

                  <p className="mt-2 text-right text-[10px] text-[#8b969e]">
                    {videoFiles.length}/1 video
                  </p>
                </div>

                {(profileError || catalogError) && (
                  <div className="mt-5 rounded-[8px] border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-[12px] text-red-600">
                      Unable to load some required
                      information. Please refresh the
                      page and try again.
                    </p>
                  </div>
                )}

                {formError && (
                  <div className="mt-5 rounded-[8px] border border-red-100 bg-red-50 px-4 py-3">
                    <p className="text-[12px] text-red-600">
                      {formError}
                    </p>
                  </div>
                )}

                {successMessage && (
                  <div className="mt-5 rounded-[8px] border border-green-100 bg-green-50 px-4 py-3">
                    <p className="text-[12px] text-green-700">
                      {successMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    isPageLoading ||
                    isSubmitting ||
                    !selectedAddressId ||
                    !selectedCategoryId ||
                    !description.trim()
                  }
                  className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#0875f5] text-[15px] font-semibold text-white transition hover:bg-[#0668d8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Request"}

                  {!isSubmitting && (
                    <Send
                      size={16}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AddressModal
        open={addressModalOpen}
        address={null}
        isLoading={isAddingAddress}
        onClose={() =>
          setAddressModalOpen(false)
        }
        onSave={handleSaveAddress}
      />
    </>
  );
}

function FileItem({
  file,
  type,
  onRemove,
}: {
  file: File;
  type: "Image" | "Video";
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[8px] bg-[#f4f7fc] px-3 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-[#48535b]">
          {file.name}
        </p>

        <p className="mt-0.5 text-[9px] text-[#8b969e]">
          {type} · {formatFileSize(file.size)}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
      >
        <X size={14} />
      </button>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-white text-[#0875f5]">
        <Icon
          size={17}
          strokeWidth={1.8}
        />
      </div>

      <div>
        <h3 className="text-[14px] font-semibold text-[#354048]">
          {title}
        </h3>

        <p className="mt-1 text-[12px] leading-5 text-[#7b858c]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  readOnly = false,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        readOnly={readOnly}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        className={`${inputClass} mt-2 ${
          readOnly
            ? "cursor-default text-[#6f7980]"
            : ""
        }`}
      />
    </div>
  );
}

function formatAddress(
  address: CustomerAddress,
) {
  return [
    address.line1,
    address.apartment,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function findCategoryForTab(
  categories: ServiceCategory[],
  activeTab: ServiceTab,
) {
  const keywords =
    activeTab === "maintenance"
      ? [
          "maintenance",
          "repair",
          "service",
          "troubleshoot",
        ]
      : [
          "installation",
          "install",
          "upgrade",
          "new system",
        ];

  const category = categories.find(
    (item) => {
      const searchableText =
        `${item.name} ${item.description ?? ""}`.toLowerCase();

      return keywords.some((keyword) =>
        searchableText.includes(keyword),
      );
    },
  );

  return category ?? categories[0];
}

function toApiDate(date: string) {
  return new Date(
    `${date}T00:00:00.000Z`,
  ).toISOString();
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function getApiErrorMessage(
  error: unknown,
  fallback: string,
) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error
  ) {
    const data = (
      error as {
        data?: {
          message?: string | string[];
        };
      }
    ).data;

    if (Array.isArray(data?.message)) {
      return data.message.join(", ");
    }

    if (
      typeof data?.message === "string"
    ) {
      return data.message;
    }
  }

  return fallback;
}

const EMPTY_CATALOG: ServiceCategory[] = [];

const labelClass =
  "block text-[12px] font-semibold text-[#0875f5]";

const inputClass =
  "h-[44px] w-full rounded-[8px] border border-[#e4ebf3] bg-[#f4f7fc] px-4 text-[13px] text-[#48535b] outline-none transition focus:border-[#0875f5] disabled:cursor-not-allowed disabled:opacity-60";