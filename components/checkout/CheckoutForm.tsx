"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkout.schema";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { getAccessToken } from "@/lib/useCookies";
import { clearBuyNow, readBuyNow } from "@/lib/buyNow";
import { useCart } from "@/context/CartContext";
import { useGetProfileQuery, useAddAddressMutation } from "@/redux/features/api/customer/profile/profileApi";
import {
  useCheckoutCartMutation,
  useCheckoutOrderMutation,
  usePreviewCheckoutMutation,
} from "@/redux/features/api/customer/checkout/checkoutApi";
import { previewItemsToCartItems } from "@/types/customer/cart";
import type { CartItem } from "@/types/commerce";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow") === "1";
  const { items, ready, totals, clearCart } = useCart();
  const token = Boolean(getAccessToken());

  const { data: profile } = useGetProfileQuery(undefined, { skip: !token });
  const [addAddress] = useAddAddressMutation();
  const [previewCheckout] = usePreviewCheckoutMutation();
  const [checkoutCart] = useCheckoutCartMutation();
  const [checkoutOrder] = useCheckoutOrderMutation();

  const buyNowItem = buyNow ? readBuyNow() : null;
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [previewItems, setPreviewItems] = useState<CartItem[]>([]);
  const [previewTotals, setPreviewTotals] = useState(totals);
  const [paying, setPaying] = useState(false);

  const addresses = profile?.addresses ?? [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      apartment: "",
      country: "Canada",
      state: "",
      city: "",
      zipCode: "",
      saveAddress: true,
    },
  });

  useEffect(() => {
    if (!ready) return;
    if (!token) {
      const next = buyNow ? "/checkout?buyNow=1" : "/checkout";
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [buyNow, ready, router, token]);

  useEffect(() => {
    if (!profile) return;
    reset((current) => ({
      ...current,
      email: profile.email || current.email,
      name: `${profile.firstName} ${profile.lastName}`.trim(),
      phone: profile.phone || current.phone,
    }));
    const primary =
      addresses.find((address) => address.isPrimary) ?? addresses[0];
    if (primary && !selectedAddressId) {
      setSelectedAddressId(primary.id);
    }
    if (!addresses.length) {
      setShowNewAddress(true);
    }
  }, [addresses, profile, reset, selectedAddressId]);

  const checkoutItems = useMemo(() => {
    if (buyNowItem) {
      return [{ productId: buyNowItem.productId, quantity: buyNowItem.quantity }];
    }
    return items.map((item) => ({ productId: item.id, quantity: item.quantity }));
  }, [buyNowItem, items]);

  useEffect(() => {
    if (!token || !checkoutItems.length) return;
    void previewCheckout({
      items: buyNowItem ? checkoutItems : undefined,
      shippingAddressId: selectedAddressId || undefined,
    })
      .unwrap()
      .then((preview) => {
        setPreviewItems(previewItemsToCartItems(preview.items));
        setPreviewTotals({
          subtotal: preview.subtotal,
          shipping: preview.shippingFee,
          tax: preview.tax,
          total: preview.total,
        });
      })
      .catch(() => undefined);
  }, [buyNowItem, checkoutItems, previewCheckout, selectedAddressId, token]);

  useEffect(() => {
    if (ready && !buyNowItem && !items.length) {
      router.replace("/cart");
    }
  }, [buyNowItem, items.length, ready, router]);

  const displayItems =
    previewItems.length > 0
      ? previewItems
      : buyNowItem
        ? [
            {
              id: buyNowItem.productId,
              slug: buyNowItem.slug,
              name: buyNowItem.name,
              subtitle: buyNowItem.subtitle,
              image: buyNowItem.image,
              price: buyNowItem.price,
              quantity: buyNowItem.quantity,
            },
          ]
        : items;

  const onPay = async (values: CheckoutFormValues) => {
    if (!checkoutItems.length) {
      router.push("/cart");
      return;
    }

    setPaying(true);
    try {
      let shippingAddressId = selectedAddressId;
      if (showNewAddress || !shippingAddressId) {
        const created = await addAddress({
          line1: values.address,
          apartment: values.apartment,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
          isPrimary: Boolean(values.saveAddress) || !addresses.length,
        }).unwrap();
        shippingAddressId = created.id;
        setSelectedAddressId(created.id);
      }

      const session = buyNowItem
        ? await checkoutOrder({
            items: checkoutItems,
            shippingAddressId,
          }).unwrap()
        : await checkoutCart({ shippingAddressId }).unwrap();

      if (!buyNowItem) {
        await clearCart().catch(() => undefined);
      }
      clearBuyNow();
      window.location.assign(session.checkoutUrl);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to start Stripe checkout"));
      setPaying(false);
    }
  };

  if (!ready || !token) {
    return <div className="py-20 text-center">Loading checkout...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.95fr] gap-7">
      <form
        id="checkout-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!showNewAddress && selectedAddressId) {
            void onPay({
              email: profile?.email || "",
              name: `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim(),
              phone: profile?.phone || "0000000",
              address: "saved",
              apartment: "",
              country: "Canada",
              state: "ON",
              city: "Toronto",
              zipCode: "000",
              saveAddress: false,
            });
            return;
          }
          void handleSubmit(onPay)();
        }}
        noValidate
        className="rounded-[16px] bg-white p-6 sm:p-8 shadow-[0_5px_30px_rgba(0,0,0,0.05)]"
      >
        <h2 className="text-[21px] font-bold text-[#1a73e8]">
          Contact Information
        </h2>

        <div className="mt-5">
          <FieldLabel>Email</FieldLabel>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
          <ErrorText message={errors.email?.message} />
        </div>

        <div className="flex items-center justify-between mt-7 mb-5">
          <h2 className="text-[21px] font-bold text-[#1a73e8]">
            Shipping Address
          </h2>
          <button
            type="button"
            onClick={() => setShowNewAddress(true)}
            className="text-[13px] font-semibold text-[#1a73e8]"
          >
            + Add New
          </button>
        </div>

        {addresses.length > 0 && (
          <div className="mb-5 space-y-2">
            {addresses.map((address) => (
              <label
                key={address.id}
                className="flex items-start gap-3 rounded-[10px] border border-[#e5e9ee] p-3 text-[13px]"
              >
                <input
                  type="radio"
                  name="saved-address"
                  checked={selectedAddressId === address.id && !showNewAddress}
                  onChange={() => {
                    setSelectedAddressId(address.id);
                    setShowNewAddress(false);
                  }}
                  className="mt-1 accent-[#1a73e8]"
                />
                <span>
                  {address.line1}
                  {address.apartment ? `, ${address.apartment}` : ""}
                  <br />
                  {address.city}, {address.state} {address.zipCode}
                </span>
              </label>
            ))}
          </div>
        )}

        {(showNewAddress || !addresses.length) && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name" error={errors.name?.message}>
                <input
                  placeholder="Jane Doe"
                  {...register("name")}
                  className={inputClass(!!errors.name)}
                />
              </Field>
              <Field label="Phone Number" error={errors.phone?.message}>
                <input
                  placeholder="+1 416 555 0100"
                  {...register("phone")}
                  className={inputClass(!!errors.phone)}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Address" error={errors.address?.message}>
                <input
                  placeholder="123 Main Street"
                  {...register("address")}
                  className={inputClass(!!errors.address)}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Apartment / Suite">
                <input
                  placeholder="Unit 4B (optional)"
                  {...register("apartment")}
                  className={inputClass(false)}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Country" error={errors.country?.message}>
                <input
                  placeholder="Canada"
                  {...register("country")}
                  className={inputClass(!!errors.country)}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
              <Field label="State" error={errors.state?.message}>
                <input
                  placeholder="ON"
                  {...register("state")}
                  className={inputClass(!!errors.state)}
                />
              </Field>
              <Field label="City" error={errors.city?.message}>
                <input
                  placeholder="Toronto"
                  {...register("city")}
                  className={inputClass(!!errors.city)}
                />
              </Field>
              <Field label="Zip code" error={errors.zipCode?.message}>
                <input
                  placeholder="M5V 2T6"
                  {...register("zipCode")}
                  className={inputClass(!!errors.zipCode)}
                />
              </Field>
            </div>

            <label className="flex items-center gap-3 mt-6 text-[13px] text-[#555e65]">
              <input
                type="checkbox"
                {...register("saveAddress")}
                className="accent-[#1a73e8]"
              />
              Save this address for future purchases
            </label>
          </>
        )}

        <div className="mt-8 border-t border-[#e8ebef] pt-7">
          <div className="flex justify-between items-center">
            <h2 className="text-[21px] font-bold text-[#20252b]">Payment</h2>
            <div className="flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-3 py-1.5 text-[11px] font-semibold text-white">
              <LockKeyhole size={13} />
              SECURE PAYMENT
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-6 text-[#505960]">
            Card details are collected on Stripe&apos;s hosted checkout. You will
            be redirected to complete payment securely.
          </p>
        </div>

        <button
          type="submit"
          disabled={paying}
          className="lg:hidden mt-7 w-full h-[52px] rounded-[9px] bg-[#1a73e8] text-white font-semibold"
        >
          {paying ? "Redirecting to Stripe..." : "Pay with Stripe"}
        </button>
      </form>

      <div>
        <CheckoutSummary items={displayItems} {...previewTotals} />
        <button
          form="checkout-form"
          type="submit"
          disabled={paying}
          className="hidden lg:block mt-5 w-full h-[54px] rounded-[9px] bg-gradient-to-r from-[#0754c6] to-[#1a73e8] text-white font-semibold shadow-sm disabled:opacity-60"
        >
          {paying ? "Redirecting to Stripe..." : "Pay with Stripe"}
        </button>
        <p className="hidden lg:block mt-4 px-5 text-center text-[12px] leading-[19px] text-[#5e666c]">
          By placing this order, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-2 text-[13px] font-medium text-[#30363b]">
      {children}
    </label>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
      <ErrorText message={error} />
    </div>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[12px] text-red-500 mt-1.5">{message}</p>;
}

function inputClass(hasError: boolean) {
  return `w-full h-[46px] rounded-[8px] bg-[#f2f6ff] border px-4 outline-none text-[14px] transition placeholder:text-[#8a949c] focus:ring-2 focus:ring-[#1a73e8]/10 ${
    hasError ? "border-red-400" : "border-transparent focus:border-[#1a73e8]"
  }`;
}
