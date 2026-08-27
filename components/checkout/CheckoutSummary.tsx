import Image from "next/image";

import { formatCurrency } from "@/lib/commerce";

import type { CartItem } from "@/types/commerce";

interface Props {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function CheckoutSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: Props) {
  return (
    <aside className="rounded-[16px] bg-white p-6 sm:p-8 shadow-[0_5px_30px_rgba(0,0,0,0.05)] lg:sticky lg:top-28">
      <h2
        className="text-[23px] font-bold text-[#20252b]"
        style={{
          fontFamily: "Manrope, sans-serif",
        }}
      >
        Order Summary
      </h2>

      <div className="space-y-4 mt-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[12px] border border-[#dfe4e9] p-3 flex gap-4"
          >
            <div className="relative w-24 h-24 rounded-[10px] border border-[#edf0f3] shrink-0">
              <Image
                src={item.image || "/images/web-logo.png"}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-[#1a73e8]">
                {item.name}
              </h3>

              <p className="text-[13px] text-[#515960] mt-2">{item.subtitle}</p>

              <div className="mt-4 flex justify-between">
                <span className="text-[13px]">Qty: {item.quantity}</span>

                <span className="font-semibold text-[#1a73e8]">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 space-y-4 text-[14px]">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />

        <Row
          label="Shipping"
          value={shipping === 0 ? "FREE" : formatCurrency(shipping)}
        />

        <Row label="Estimated Tax" value={formatCurrency(tax)} />
      </div>

      <div className="border-t mt-7 pt-6 flex justify-between items-center">
        <span className="text-[17px] font-semibold">Total</span>

        <span className="text-[25px] font-bold text-[#155952]">
          {formatCurrency(total)}
        </span>
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#525b62]">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}
