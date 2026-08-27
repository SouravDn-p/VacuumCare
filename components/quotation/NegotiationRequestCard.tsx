export default function NegotiationRequestCard({
  amount,
  originalAmount,
  note,
  status,
}: {
  amount: number;
  originalAmount: number;
  note: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}) {
  return (
    <section
      className="mt-8 rounded-[14px] border bg-white p-6"
    >
      <h2
        className="mt-8 rounded-[14px] border bg-white p-6 text-xl font-bold text-[#1a73e8]"
      >
        Your Negotiation Request
      </h2>

      <div
        className="mt-5 rounded-lg bg-[#f1f5ff] p-5"
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-gray-500">Your Offer</p>

            <p className="text-xl font-bold text-blue-600">${amount}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Quotation</p>

            <p className="text-xl font-bold">${originalAmount}</p>
          </div>
        </div>

        <p className="mt-5 text-sm">{note}</p>
      </div>

      <div className="mt-4">
        <span
          className=" rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700"
        >
          {status}
        </span>

        <p className="mt-3 text-sm text-gray-500">
          Waiting for admin review.
        </p>
      </div>
    </section>
  );
}
