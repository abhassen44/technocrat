import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const images = [
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.13 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.12 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.11 AM (1).jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.11 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.10 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.09 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.07 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.06 AM.jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.05 AM (1).jpg",
  "/src/assets/images/WhatsApp Image 2025-03-03 at 11.27.05 AM.jpg",
];

export function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.2,
            }}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 3 },
            }}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl"
          >
            About Technocrats
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground md:text-xl"
          >
            We are a dynamic team of tech enthusiasts, innovators, and problem solvers.
            Our passion lies in creating cutting-edge solutions that transform ideas into reality.
            With expertise spanning across various domains of technology, we strive to push
            the boundaries of what's possible.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => window.location.href = '/about'}
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 