import Image from "next/image";

interface ServiceHeroProps {
    onRequestService: () => void;
    onRequestInstallation: () => void;
}

export default function ServiceHero({
    onRequestService,
    onRequestInstallation,
}: ServiceHeroProps) {
    return (
        <section className="bg-gradient-to-b from-[#f1f8ff] to-white pt-24 sm:pt-28 lg:pt-32">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
                <div className="grid min-h-0 sm:min-h-[380px] lg:min-h-[430px] grid-cols-1 items-center gap-8 lg:gap-10 lg:grid-cols-2 pb-8 lg:pb-0">
                    {/* Left */}
                    <div className="max-w-[610px] mx-auto lg:mx-0 text-center lg:text-left">
                        <h1
                            className="text-[32px] font-extrabold leading-[1.15] tracking-[-0.8px] text-[#075fc7] sm:text-[44px] lg:text-[56px] sm:leading-[1.12] sm:tracking-[-1px]"
                            style={{
                                fontFamily:
                                    "Manrope, sans-serif",
                            }}
                        >
                            Professional
                            <br />
                            Vacuum Services &
                            <br />
                            Installation
                        </h1>

                        <p
                            className="mt-4 sm:mt-5 max-w-[540px] mx-auto lg:mx-0 text-[14px] leading-7 text-[#68747d] sm:text-[16px]"
                            style={{
                                fontFamily:
                                    "Inter, sans-serif",
                            }}
                        >
                            Submit your request and
                            receive a customized
                            quotation from our experts.
                            Precision engineering for
                            the infrastructure of your
                            healthy home.
                        </p>

                        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                            <button
                                type="button"
                                onClick={
                                    onRequestService
                                }
                                className="inline-flex h-[48px] w-full sm:w-auto items-center justify-center rounded-[8px] bg-[#0b68d8] px-6 text-[14px] font-semibold text-white transition hover:bg-[#0759bd]"
                            >
                                Request a Service
                            </button>

                            <button
                                type="button"
                                onClick={
                                    onRequestInstallation
                                }
                                className="inline-flex h-[48px] w-full sm:w-auto items-center justify-center rounded-[8px] border border-[#d7e6f6] bg-white px-6 text-[14px] font-semibold text-[#0b68d8] transition hover:bg-[#f5f9ff]"
                            >
                                Request Installation
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative h-[220px] w-full max-w-[360px] sm:h-[310px] sm:max-w-[520px] lg:h-[380px]">
                            <Image
                                src="/images/services/service-hero.jpg"
                                alt="Professional vacuum"
                                fill
                                priority
                                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 90vw, 520px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
