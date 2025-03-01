import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleBackground } from "./ParticleBackground";
import { RobotCursor } from "./RobotCursor";
import { FeaturedTutorials } from "./FeaturedTutorials";
import { LatestBlogPosts } from "./LatestBlogPosts";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedContent() {
  const containerRef = useRef<HTMLElement>(null);
  const tutorialsRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-16 space-y-32 min-h-screen">
      <ParticleBackground />
      <RobotCursor />
      
      <motion.div 
        ref={tutorialsRef}
        className="container relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedTutorials />
      </motion.div>

      <motion.div 
        ref={blogsRef}
        className="container relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <LatestBlogPosts />
      </motion.div>
    </section>
  );
}