import { Paperclip } from "lucide-react";

export default function SupportRequestForm() {
  return (
    <div>
      <h2
        className="text-[24px] sm:text-[26px] font-bold text-[#20252b] mb-7"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        Submit a Request
      </h2>

      <form className="space-y-5">
        {/* Subject + Order ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-[12px] font-semibold text-[#4d555c] uppercase tracking-[0.4px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Subject
            </label>

            <div className="relative">
              <select
                id="subject"
                name="subject"
                defaultValue="technical"
                className="w-full h-[52px] appearance-none rounded-[10px] bg-[#f2f6ff] border border-transparent px-4 pr-10 text-[14px] text-[#404848] outline-none transition focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <option value="technical">Technical Issue</option>
                <option value="installation">Installation Support</option>
                <option value="repair">Repair Request</option>
                <option value="billing">Billing / Payment</option>
                <option value="warranty">Warranty</option>
                <option value="product">Product Question</option>
                <option value="other">Other</option>
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

          {/* Order ID */}
          <div>
            <label
              htmlFor="orderId"
              className="block mb-2 text-[12px] font-semibold text-[#4d555c] uppercase tracking-[0.4px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Order/Service ID
            </label>

            <input
              id="orderId"
              name="orderId"
              type="text"
              placeholder="#AV-XXXXXX"
              className="w-full h-[52px] rounded-[10px] bg-[#f2f6ff] border border-transparent px-4 text-[14px] text-[#404848] outline-none transition placeholder:text-[#8a9299] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-[12px] font-semibold text-[#4d555c] uppercase tracking-[0.4px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Please describe your issue in detail..."
            className="w-full min-h-[180px] resize-none rounded-[10px] bg-[#f2f6ff] border border-transparent p-4 text-[14px] text-[#404848] outline-none transition placeholder:text-[#8a9299] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* File upload */}
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
                Attach files (optional)
              </span>
            </div>

            <input
              id="attachment"
              name="attachment"
              type="file"
              className="hidden"
              multiple
            />
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-[54px] rounded-[10px] text-[15px] font-semibold text-white shadow-sm transition hover:opacity-90 active:opacity-80"
          style={{
            fontFamily: "Inter, sans-serif",
            background: "linear-gradient(110deg, #0754c5 0%, #1a73e8 100%)",
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
