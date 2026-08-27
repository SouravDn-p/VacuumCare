"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, HelpCircle, Send, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useSubmitContactMutation } from "@/redux/features/api/customer/contact/contactApi";

export default function ContactFormSection() {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!fullName || !email || !message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    try {
      await submitContact({
        fullName,
        email,
        phone: phone || undefined,
        service: service || undefined,
        message,
      }).unwrap();
      setSent(true);
      form.reset();
      toast.success("Message sent. We will get back to you shortly.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to send your message"));
    }
  };

  return (
    <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pb-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 xl:gap-20 items-start">
        <div>
          <div className="mb-8">
            <h2
              className="text-[28px] sm:text-[32px] font-extrabold text-[#1a73e8] leading-[1.2]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Send a message
            </h2>
            <p
              className="mt-3 max-w-[600px] text-[14px] sm:text-[15px] leading-[24px] text-[#687078]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Have a specific question or request? Fill out the form below and
              our concierge will get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-[13px] font-semibold text-[#404848] uppercase">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full h-12 rounded-[10px] bg-[#f2f6ff] px-4 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-[13px] font-semibold text-[#404848] uppercase">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="w-full h-12 rounded-[10px] bg-[#f2f6ff] px-4 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block mb-2 text-[13px] font-semibold text-[#404848] uppercase">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (550) 4258214"
                  className="w-full h-12 rounded-[10px] bg-[#f2f6ff] px-4 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition"
                />
              </div>
              <div>
                <label htmlFor="service" className="block mb-2 text-[13px] font-semibold text-[#404848] uppercase">
                  Service Category
                </label>
                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className="w-full h-12 rounded-[10px] bg-[#f2f6ff] px-4 text-[14px] text-[#7c858c] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition appearance-none"
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  <option value="installation">Installation</option>
                  <option value="repair">Repair</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="product">Product Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-[13px] font-semibold text-[#404848] uppercase">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Type here..."
                className="w-full min-h-[170px] resize-none rounded-[10px] bg-[#f2f6ff] p-4 text-[14px] text-[#404848] outline-none border border-transparent focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/10 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-[10px] bg-gradient-to-r from-[#0044ad] to-[#1a73e8] text-white flex items-center justify-center gap-2 text-[15px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isLoading ? "Sending..." : sent ? "Message sent" : "Send Message"}
              <Send size={17} strokeWidth={1.8} />
            </button>
          </form>
        </div>

        <div className="space-y-7">
          <div className="rounded-[14px] overflow-hidden h-[260px] border border-[#edf1f5]">
            <iframe
              src="https://www.google.com/maps?q=Melbourne&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Enhancement location"
              className="border-0"
            />
          </div>

          <div
            className="relative overflow-hidden rounded-[14px] p-7 sm:p-8 text-white"
            style={{
              background: "linear-gradient(125deg, #0a5ac9 0%, #1a73e8 100%)",
            }}
          >
            <div className="absolute -top-[65px] -right-[55px] w-[170px] h-[170px] rounded-full border-[18px] border-white/[0.04]" />
            <div className="relative z-10">
              <h2 className="text-[26px] sm:text-[30px] font-bold text-white mb-7">
                Quick Support FAQ
              </h2>
              <div className="flex gap-3">
                <HelpCircle size={18} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-semibold text-white">
                    Do you service emergency outages?
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] leading-[22px] text-white/80">
                    Yes, we have a dedicated emergency response team for
                    commercial properties and VIP residential members.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <HelpCircle size={18} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[15px] font-semibold text-white">
                    Where can I see service areas?
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] leading-[22px] text-white/80">
                    We currently cover the entire Tri-state area Florida, and
                    California coast. Check our coverage map below.
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/30 my-7" />
              <div className="flex items-center gap-3">
                <CheckCircle2 size={17} strokeWidth={1.8} className="text-white" />
                <p className="text-[12px] sm:text-[13px] text-white/80">
                  Full system testing from unit to every inlet.
                </p>
                <ShieldCheck size={16} strokeWidth={1.8} className="ml-auto text-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
