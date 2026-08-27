export default function PaymentHistoryHeader() {
  return (
    <section className="rounded-[14px] border border-[#e5edf6] bg-white px-5 py-5 sm:px-6">
      <h1
        className="text-[30px] sm:text-[34px] font-extrabold leading-[1.1] text-[#202428]"
        style={{
          fontFamily: "Manrope, sans-serif",
        }}
      >
        Payment History
      </h1>

      <p
        className="mt-2 text-[13px] sm:text-[14px] text-[#59636a]"
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      >
        View and manage all your transactions
      </p>
    </section>
  );
}
    