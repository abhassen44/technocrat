import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Split text animation
    const headingText = headingRef.current?.textContent || "";
    headingRef.current!.innerHTML = headingText.split("").map(char => 
      `<span class="inline-block">${char}</span>`
    ).join("");

    const chars = headingRef.current?.children || [];

    gsap.set(chars, { y: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: false,
      },
    });

    // Staggered text reveal
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.02,
      ease: "back.out(1.7)",
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.5")
    .from(buttonRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3");

    // Parallax background effect
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: (i, target) => -target.offsetHeight * 0.3,
      scale: 1.2,
      ease: "none",
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-b from-background to-accent/10"
      >
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            ref={headingRef}
            className="text-5xl font-bold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
          >
            Learn Electronics Engineering Made Simple
          </h1>

          <motion.p
            ref={textRef}
            className="mt-8 text-xl leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover practical electronics tutorials, projects, and resources
            designed to help you learn and build amazing things.
          </motion.p>

          <motion.div 
            ref={buttonRef}
            className="mt-12 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/tutorials">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 relative overflow-hidden group"
                asChild
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Button>
            </Link>
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 relative overflow-hidden group"
                asChild
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                  <motion.div
                    className="absolute inset-0 bg-primary/5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}