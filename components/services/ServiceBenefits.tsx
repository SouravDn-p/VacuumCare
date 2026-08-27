import {
    BadgeCheck,
    FileText,
    Microscope,
    ThumbsUp,
} from "lucide-react";

const benefits = [
    {
        title: "Expert Technicians",
        icon: BadgeCheck,
    },
    {
        title: "Accurate Diagnosis",
        icon: Microscope,
    },
    {
        title: "Transparent Quotation",
        icon: FileText,
    },
    {
        title: "Reliable Service",
        icon: ThumbsUp,
    },
];

export default function ServiceBenefits() {
    return (
        <section>
            <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex min-h-[120px] flex-col items-center justify-center rounded-[10px] border border-[#e4edf7] bg-[#f8fbff] px-5 text-center"
                            >
                                <Icon
                                    size={25}
                                    strokeWidth={1.7}
                                    className="text-[#1680f3]"
                                />

                                <p className="mt-4 text-[14px] font-semibold text-[#3e4850]">
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}