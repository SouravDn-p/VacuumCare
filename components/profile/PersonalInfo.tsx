interface PersonalInfoProps {
  name: string;
  email: string;

  phone: string | null;
  company: string | null;
}

const infoLabelClass =
  "text-[11px] sm:text-[12px] font-semibold uppercase tracking-[1px] text-[#6a737a]";

const infoValueClass =
  "mt-2 text-[15px] sm:text-[16px] font-medium text-[#0875f5]";

export default function PersonalInfo({
  name,
  email,
  phone,
  company,
}: PersonalInfoProps) {
  return (
    <section>
      <h2
        className="mb-5 text-[18px] font-bold text-[#1a73e8] sm:text-[20px]"
        style={{
          fontFamily: "Manrope, sans-serif",
        }}
      >
        Personal Info
      </h2>

      <div className="rounded-[14px] border border-[#e7f0fb] bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InfoItem label="Full Name" value={name} />

          <InfoItem label="Email Address" value={email} />

          <InfoItem label="Phone Number" value={phone || "Not provided"} />

          <InfoItem label="Company" value={company || "Not provided"} />
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={infoLabelClass}>{label}</p>

      <p className={infoValueClass}>{value}</p>
    </div>
  );
}
