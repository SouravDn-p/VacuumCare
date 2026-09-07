import AboutHero from "@/components/about/AboutHero";
import AboutVision from "@/components/about/AboutVision";
import AboutStory from "@/components/about/AboutStory";
import AboutTrust from "@/components/about/AboutTrust";
import AboutLeaderShip from "@/components/about/AboutLeaderShip";
import AboutCta from "@/components/about/AboutCta";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <AboutHero />
        <AboutVision />
        <AboutStory />
        <AboutTrust />
        <AboutLeaderShip />
        <AboutCta />
      </main>
    </div>
  );
}
