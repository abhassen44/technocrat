import { Hero } from "@/components/home/Hero";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main>
      <Hero />
      
      <AboutSection />
      <FeaturedContent />
    </main>
  );
}
