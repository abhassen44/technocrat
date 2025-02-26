import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.2"
      );
  }, []);

  return (
    <div className="relative">
      <div className="container py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            ref={headingRef}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Learn Electronics Engineering 
            <span className="text-primary">Made Simple</span>
          </h1>
          
          <p
            ref={textRef}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Discover practical electronics tutorials, projects, and resources
            designed to help you learn and build amazing things.
          </p>
          
          <div ref={buttonRef} className="mt-10 flex items-center justify-center gap-6">
            <Link href="/tutorials">
              <Button size="lg">
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
