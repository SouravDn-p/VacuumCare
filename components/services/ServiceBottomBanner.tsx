import Image from "next/image";

interface Props {
    onRequest: () => void;
}

export default function ServiceBottomBanner({
    onRequest,
}: Props) {
    return (
        <section className="pb-24 pt-12 lg:pb-32 lg:pt-16">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
                <div className="relative min-h-[340px] overflow-hidden rounded-[20px]">
                    <Image
                        src="https://images.unsplash.com/photo-1758523670739-0d26a3ee976d?w=1320&h=516&fit=crop&auto=format"
                        alt="Enhancement service vehicle"
                        fill
                        sizes="(max-width: 1320px) 100vw, 1320px"
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/5" />

                    <div className="relative z-10 flex min-h-[340px] max-w-[550px] flex-col justify-center px-7 py-10 sm:px-12 lg:px-14">
                        <h2
                            className="text-[34px] font-extrabold leading-[1.08] text-white sm:text-[40px]"
                            style={{
                                fontFamily:
                                    "Manrope, sans-serif",
                            }}
                        >
                            Need help with your
                            <br />
                            vacuum system?
                        </h2>

                        <p className="mt-4 max-w-[460px] text-[14px] leading-6 text-white/85">
                            Our concierge team is
                            standing by to help you
                            choose the right system or
                            book a same-day repair
                            appointment.
                        </p>

                        <button
                            type="button"
                            onClick={onRequest}
                            className="mt-7 inline-flex h-[46px] w-fit items-center justify-center rounded-[8px] bg-white px-6 text-[13px] font-semibold text-[#0875f5] transition hover:bg-[#eef6ff]"
                        >
                            Request Service Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}