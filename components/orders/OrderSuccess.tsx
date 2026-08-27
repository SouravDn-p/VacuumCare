"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { CalendarDays, Check, MapPin, Truck } from "lucide-react";

import { formatCurrency } from "@/lib/commerce";

import type { Order } from "@/types/commerce";
import { getOrder } from "@/data/order-storage";

export default function OrderSuccess({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>();

  useEffect(() => {
    setOrder(getOrder(orderId) ?? null);
  }, [orderId]);

  if (order === undefined) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-20">Order not found.</div>;
  }

  const item = order.items[0];

  return (
    <>
      {/* Success */}
      <div className="text-center max-w-[680px] mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#e8f2ff] flex items-center justify-center mx-auto">
          <div className="w-10 h-10 rounded-full bg-[#1a73e8] flex items-center justify-center">
            <Check size={22} className="text-white" />
          </div>
        </div>

        <h1
          className="mt-6 text-[36px] sm:text-[42px] font-extrabold text-[#1a73e8]"
          style={{
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-[16px] leading-[26px] text-[#4f5960]">
          Thank you for your purchase. Your order has been confirmed and is
          being processed for professional delivery.
        </p>
      </div>

      {/* Order Card */}
      <div className="mt-12 rounded-[16px] bg-white p-6 sm:p-8 shadow-[0_5px_30px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div className="lg:border-r lg:pr-8 border-[#e4e8ec]">
            <div className="flex justify-between items-start border-b pb-5">
              <div>
                <p className="text-[11px] uppercase font-semibold tracking-[1px]">
                  Order ID
                </p>

                <p className="text-[18px] font-bold text-[#1a73e8] mt-1">
                  #{order.id}
                </p>
              </div>

              <span className="rounded-full bg-[#e2efff] px-3 py-1 text-[11px] font-semibold text-[#1a73e8]">
                ✓ PAID
              </span>
            </div>

            <div className="mt-5 border rounded-[12px] p-3 flex gap-4">
              <div className="relative w-24 h-24 rounded-[8px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <p className="text-[#1a73e8] font-semibold">{item.name}</p>

                <p className="mt-2 text-[14px] text-[#4d565d]">
                  {item.subtitle}
                </p>

                <p className="mt-3 text-[#1a73e8] font-semibold">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-5 space-y-3">
              <Row label="Subtotal" value={formatCurrency(order.subtotal)} />

              <Row label="Tax" value={formatCurrency(order.tax)} />

              <div className="flex justify-between pt-3 text-[18px] font-bold text-[#1a73e8]">
                <span>Total Amount</span>

                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-[10px] bg-[#edf4ff] p-6 grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <MapPin className="text-[#1a73e8] shrink-0" size={21} />

                <div>
                  <p className="text-[11px] uppercase text-[#6e7880]">
                    Delivery Address
                  </p>

                  <p className="mt-2 text-[14px] leading-[22px]">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays className="text-[#1a73e8]" size={21} />

                <div>
                  <p className="text-[11px] uppercase text-[#6e7880]">
                    Estimated Delivery
                  </p>

                  <p className="mt-2 font-semibold">
                    {new Date(order.estimatedDelivery).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/orders/${order.id}`}
              className="mt-5 h-[52px] rounded-[9px] bg-[#1a73e8] text-white font-semibold flex items-center justify-center"
            >
              View Order Details
            </Link>

            <Link
              href={`/orders/${order.id}`}
              className="mt-4 h-[52px] rounded-[9px] bg-[#edf5ff] text-[#24292e] font-semibold flex items-center justify-center gap-2"
            >
              <Truck size={18} />
              Track Order
            </Link>

            <Link
              href="/products"
              className="mt-4 h-[52px] rounded-[9px] border border-[#d7e0e8] text-[#1a73e8] font-semibold flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[14px]">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
