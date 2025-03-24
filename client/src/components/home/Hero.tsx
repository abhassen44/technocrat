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
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current || !subTextRef.current || !buttonsRef.current) return;

    // Split text into words
    const headingText = headingRef.current.innerHTML;
    const words = headingText.split(' ');
    headingRef.current.innerHTML = words.map(word => `<span class="inline-block">${word} </span>`).join('');

    // Create main timeline
    const tl = gsap.timeline({
      defaults: { 
        ease: "power4.out",
        duration: 1.5
      }
    });

    // Initial animations
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    .fromTo(headingRef.current.children,
      { 
        y: 100,
        opacity: 0,
        rotateX: -80
      },
      { 
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.1
      },
      "-=0.5"
    )
    .fromTo(subTextRef.current,
      { 
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1
      },
      "-=1"
    )
    .fromTo(buttonsRef.current.children,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8
      },
      "-=0.8"
    );

    // Scroll-triggered parallax effect
    gsap.to(textContainerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 200,
      opacity: 0,
      scale: 0.9
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/80 py-16"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Main content */}
      <div ref={textContainerRef} className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-primary to-primary/50 [perspective:1000px] mb-8"
          >
            We're&nbsp; All&nbsp; About&nbsp; Providing&nbsp; Hands&nbsp;On&nbsp; Experiences&nbsp;
          </h1>

          <p
            ref={subTextRef}
            className="mt-6 mb-10 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto"
          >
            Technocrats is the Emerging Technologies Club of IIIT Guwahati, 
            dedicated to nurturing interest in cutting-edge fields like 
            Robotics, IoT, Virtual and Mixed Reality.
          </p>

          <div 
            ref={buttonsRef}
            className="flex items-center justify-center gap-6 flex-wrap"
          >
            <Link href="/tutorials">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 relative overflow-hidden group"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-primary/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}