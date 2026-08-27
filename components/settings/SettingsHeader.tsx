export default function SettingsHeader() {
  return (
    <div className="mb-10">
      <h1
        className="text-[40px] sm:text-[44px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-1.2px] text-[#1a73e8]"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Settings
      </h1>

      <p
        className="mt-2 text-[16px] sm:text-[17px] text-[#404848]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Manage your preferences and notifications
      </p>
    </div>
  );
}
