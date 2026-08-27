import {
    AirVent,
    Cable,
    Fan,
    Gauge,
    Grid2X2,
    HousePlus,
    PlugZap,
    SearchCheck,
    Settings2,
    Sparkles,
    ArrowRight,
} from "lucide-react";

import type { ServiceTab } from "./ServicesPageClient";

interface ServiceTabsProps {
    activeTab: ServiceTab;
    onTabChange: (tab: ServiceTab) => void;
    onGetQuote: () => void;
}

const maintenanceServices = [
    {
        title: "Vacuum Repair",
        description:
            "Full diagnostic and restoration of central vacuum motor units and power heads.",
        icon: Settings2,
    },
    {
        title: "Maintenance & Troubleshooting",
        description:
            "Preventative care to ensure your system operates at peak efficiency year-round.",
        icon: SearchCheck,
    },
    {
        title: "Low Suction Fix",
        description:
            "Specialized blockage removal and seal integrity checks for restored power.",
        icon: Gauge,
    },
    {
        title: "Broken Inlet Repair",
        description:
            "Replacement of damaged wall valves and low-voltage wiring restoration.",
        icon: PlugZap,
    },
    {
        title: "General Service",
        description:
            "Comprehensive system health check including filter cleaning and line purging.",
        icon: Fan,
    },
    {
        title: "System Inspection",
        description:
            "Detailed inspection of your central vacuum system to identify hidden issues and ensure optimal performance.",
        icon: AirVent,
    },
];

const installationServices = [
    {
        title: "New System",
        description:
            "Full blueprinting and installation for new home constructions.",
        icon: HousePlus,
    },
    {
        title: "Custom Fit",
        description:
            "Bespoke layouts for commercial or unique residential spaces.",
        icon: Grid2X2,
    },
    {
        title: "System Upgrade",
        description:
            "Retrofitting modern power units to existing piping networks.",
        icon: Cable,
    },
    {
        title: "Architectural",
        description:
            "Seamless integration into luxury bespoke home designs.",
        icon: Sparkles,
    },
];

export default function ServiceTabs({
    activeTab,
    onTabChange,
    onGetQuote,
}: ServiceTabsProps) {
    const services =
        activeTab === "maintenance"
            ? maintenanceServices
            : installationServices;

    return (
        <section className="py-12 lg:py-16">
            <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
                {/* =====================================================
            TABS
        ===================================================== */}
                <div className="flex items-end gap-5 sm:gap-7 ">
                    <button
                        type="button"
                        onClick={() => onTabChange("maintenance")}
                        className={`relative px-2 pb-4 text-[18px] font-semibold transition-colors duration-300 sm:text-[20px] lg:text-[22px] ${activeTab === "maintenance"
                            ? "text-[#1478f2]"
                            : "text-[#9a9a9a] hover:text-[#1478f2]"
                            }`}
                        style={{
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        Service &amp; Maintenance

                        <span
                            className={`absolute bottom-0 left-0 h-[2px] rounded-full! bg-[#1478f2] transition-all duration-300 ${activeTab === "maintenance"
                                ? "w-full opacity-100"
                                : "w-0 opacity-0"
                                }`}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={() => onTabChange("installation")}
                        className={`relative px-2 pb-4 text-[18px] font-semibold transition-colors duration-300 sm:text-[20px] lg:text-[22px] ${activeTab === "installation"
                            ? "text-[#1478f2]"
                            : "text-[#9a9a9a] hover:text-[#1478f2]"
                            }`}
                        style={{
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        Installation

                        <span
                            className={`absolute rounded-full bottom-0 left-0 h-[2px] rounded-full bg-[#1478f2] transition-all duration-300 ${activeTab === "installation"
                                ? "w-full opacity-100"
                                : "w-0 opacity-0"
                                }`}
                        />
                    </button>
                </div>

                {/* =====================================================
            SERVICE GRID
        ===================================================== */}
                <div
                    className={`mt-12 grid overflow-hidden border-l border-t rounded  border-[#FAFAFA22]! ${activeTab === "maintenance"
                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                        }`}
                >
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article
                                key={service.title}
                                className="
                  group
                  relative
                  flex
                  min-h-[250px]
                  flex-col
                  overflow-hidden
                  border-b
                  border-r
                  border-[#edf0f3]
                  bg-gradient-to-b
                  from-white
                  to-[#f8fbff]
                  px-8
                  py-8
                  transition-all
                  duration-300
                  ease-out
                  hover:z-10
                  hover:border-[#2478e8]
                  hover:from-[#2478e8]
                  hover:to-[#2478e8]
                  hover:shadow-[0_16px_35px_rgba(36,120,232,0.22)]
                  focus-within:z-10
                  focus-within:border-[#2478e8]
                  focus-within:from-[#2478e8]
                  focus-within:to-[#2478e8]
                  sm:px-8
                  sm:py-8
                "
                            >
                                {/* Icon */}
                                <div className="text-[#20272d] transition-colors duration-300 group-hover:text-white group-focus-within:text-white">
                                    <Icon
                                        size={24}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="
                    mt-7
                    text-[18px]
                    font-bold
                    leading-[1.3]
                    text-[#16191c]
                    transition-colors
                    duration-300
                    group-hover:text-white
                    group-focus-within:text-white
                    sm:text-[19px]
                    lg:text-[20px]
                  "
                                    style={{
                                        fontFamily: "Manrope, sans-serif",
                                    }}
                                >
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="
                    mt-3
                    max-w-[350px]
                    text-[14px]
                    leading-[1.7]
                    text-[#4f555b]
                    transition-colors
                    duration-300
                    group-hover:text-white/95
                    group-focus-within:text-white/95
                    sm:text-[15px]
                  "
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    {service.description}
                                </p>

                                {/* Quote */}
                                <button
                                    type="button"
                                    onClick={onGetQuote}
                                    className="
                    mt-auto
                    flex
                    w-fit
                    items-center
                    gap-2
                    pt-6
                    text-[14px]
                    font-semibold
                    text-[#0875f5]
                    outline-none
                    transition-all
                    duration-300
                    group-hover:text-white
                    group-focus-within:text-white
                  "
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    <span>Get Quote</span>

                                    <ArrowRight
                                        size={16}
                                        strokeWidth={1.8}
                                        className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1.5
                    "
                                    />
                                </button>

                                {/* Hover glow */}
                                <div
                                    className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-[180px]
                    w-[180px]
                    rounded-full
                    bg-white/10
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                                />
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}