import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "./ParticleBackground";
import { FeaturedTutorials } from "./FeaturedTutorials";
import { LatestBlogPosts } from "./LatestBlogPosts";

// Simple animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  }
};

export function FeaturedContent() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="relative py-16 space-y-32 min-h-screen"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 space-y-32">
        {/* Tutorials section */}
        <motion.div 
          className="relative"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FeaturedTutorials />
        </motion.div>

        {/* Blog posts section */}
        <motion.div 
          className="relative"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LatestBlogPosts />
        </motion.div>
      </div>
    </section>
  );
}