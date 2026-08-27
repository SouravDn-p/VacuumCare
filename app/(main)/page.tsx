
import CTABanner from "@/components/home/CTABanner";
import CTACards from "@/components/home/CTACards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <Hero />
      <CTACards />
      <FeaturedProducts />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <CTABanner />
    </div>
  );
}
