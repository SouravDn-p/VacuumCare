"use client";

export type NotificationFilter =
  | "all"
  | "service"
  | "e-commerce"
  | "refund"
  | "unread";

interface NotificationFiltersProps {
  activeFilter: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
}

const filters: {
  label: string;
  value: NotificationFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Service",
    value: "service",
  },
  {
    label: "E-Commerce",
    value: "e-commerce",
  },
  {
    label: "Refund",
    value: "refund",
  },
  {
    label: "Unread",
    value: "unread",
  },
];

export default function NotificationFilters({
  activeFilter,
  onChange,
}: NotificationFiltersProps) {
  return (
    <div className="inline-flex max-w-full overflow-x-auto rounded-[9px] bg-[#f2f6fb] p-1">
      {filters.map((filter) => {
        const active = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`h-10 whitespace-nowrap rounded-[7px] px-5 text-[13px] font-medium transition ${
              active
                ? "bg-white text-[#1a73e8] shadow-sm"
                : "text-[#444d54] hover:text-[#1a73e8]"
            }`}
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
