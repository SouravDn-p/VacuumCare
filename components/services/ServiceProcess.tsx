import {
    ClipboardCheck,
    FileText,
    Search,
    Send,
    Sparkles,
    CalendarCheck,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Submit Request",
        description:
            "Fill out our digital intake form with your details.",
        icon: Search,
    },
    {
        number: "02",
        title: "Upload Details",
        description:
            "Provide images or floor plans for accuracy.",
        icon: Sparkles,
    },
    {
        number: "03",
        title: "Admin Review",
        description:
            "Our experts analyze your specific requirements.",
        icon: ClipboardCheck,
    },
    {
        number: "04",
        title: "Receive Quote",
        description:
            "A transparent, itemized quotation sent to you.",
        icon: FileText,
    },
    {
        number: "05",
        title: "Schedule",
        description:
            "Accept and choose your preferred service date.",
        icon: CalendarCheck,
    },
    {
        number: "06",
        title: "Completed",
        description:
            "Service delivered with approval precision.",
        icon: Send,
    },
];

export default function ServiceProcess() {
    return (
        <section className="py-14 lg:py-20">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
                <h2
                    className="text-center text-[30px] font-extrabold text-[#0875f5] sm:text-[34px]"
                    style={{
                        fontFamily:
                            "Manrope, sans-serif",
                    }}
                >
                    The Path to Pristine Air
                </h2>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <article
                                key={step.number}
                                className="relative rounded-[12px] border border-[#e5edf6] bg-white px-4 pb-4 pt-12 text-center"
                            >
                                <div className="absolute left-1/2 top-0 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-white bg-[#0875f5] text-white shadow-sm">
                                    <Icon
                                        size={21}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <h3 className="text-[14px] font-bold text-[#0875f5]">
                                    {step.title}
                                </h3>

                                <p className="mt-2 min-h-[58px] text-[11px] leading-[16px] text-[#68747c]">
                                    {step.description}
                                </p>

                                <div className="mt-4 rounded-[4px] bg-[#0875f5] py-1.5 text-[10px] font-bold text-white">
                                    STEP {step.number}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}