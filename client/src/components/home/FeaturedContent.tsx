import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Tutorial, Blog } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1], // Cubic bezier for smooth easing
    },
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function FeaturedContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tutorialsRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  const { data: tutorials, isLoading: tutorialsLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  useEffect(() => {
    // Initialize GSAP animations
    const sections = gsap.utils.toArray([tutorialsRef.current, blogsRef.current]);

    sections.forEach((section, i) => {
      // Heading animation
      const heading = section?.querySelector('h2');
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
      });

      // Pin section
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        toggleClass: "active",
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0.7,
            y: 50,
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0.7,
            y: -50,
            duration: 0.5,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  if (tutorialsLoading || blogsLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse space-y-16">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-10 bg-muted rounded w-1/4 mb-8"></div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-64 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="py-16 space-y-32 overflow-hidden">
      <div ref={tutorialsRef} className="container">
        <h2 className="text-4xl font-bold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Featured Tutorials
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials?.slice(0, 3).map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <Link href={`/tutorials/${tutorial.id}`}>
                <Card className="h-full cursor-pointer group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {tutorial.level}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                        {tutorial.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={blogsRef} className="container">
        <h2 className="text-4xl font-bold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Latest Blog Posts
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <Link href={`/blogs/${blog.id}`}>
                <Card className="h-full cursor-pointer group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {blog.content}
                    </p>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {blog.category}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}