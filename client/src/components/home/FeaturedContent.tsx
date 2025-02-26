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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export function FeaturedContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: tutorials, isLoading: tutorialsLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  useEffect(() => {
    const headings = containerRef.current?.querySelectorAll('h2');

    headings?.forEach(heading => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  if (tutorialsLoading || blogsLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="py-16 overflow-hidden">
      <div className="container">
        <h2 className="text-4xl font-bold tracking-tight mb-12">
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
                <Card className="h-full cursor-pointer group">
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

        <h2 className="text-4xl font-bold tracking-tight mb-12 mt-24">
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
                <Card className="h-full cursor-pointer group">
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