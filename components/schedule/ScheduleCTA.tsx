import Link from "next/link";

export default function ScheduleCTA() {
  return (
    <div className="mt-6 rounded-[18px] bg-[#2478e8] px-6 py-8 text-center text-white">
      <h2 className="text-[24px] font-bold">Need something else?</h2>

      <p className="mt-2 text-sm">
        Quickly book specialized repairs or routine checkups with our
        top-rated technicians.
      </p>

      <Link
        href="/services#service-request"
        className="mt-5 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0875f5]"
      >
        Request a Service →
      </Link>
    </div>
  );
}
