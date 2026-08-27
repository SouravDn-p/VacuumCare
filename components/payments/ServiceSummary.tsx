interface ServiceSummaryProps {
  serviceType: string;
  technician: string;
  serviceDate: string;
  duration: string;
}

export default function ServiceSummary({
  serviceType,
  technician,
  serviceDate,
  duration,
}: ServiceSummaryProps) {
  const items = [
    {
      label: "Service Type",
      value: serviceType,
    },
    {
      label: "Technician",
      value: technician,
    },
    {
      label: "Service Date",
      value: serviceDate,
    },
    {
      label: "Duration",
      value: duration,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 rounded-[10px] bg-[#eaf3ff] px-5 py-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#75818a]">
            {item.label}
          </p>

          <p className="mt-2 text-[12px] font-semibold text-[#30373c]">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
