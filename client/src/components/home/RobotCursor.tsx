import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useScroll } from 'framer-motion';

export function RobotCursor() {
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  const { scrollYProgress } = useScroll();
  
  // Create color interpolation based on scroll
  const robotColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#3b82f6', // blue
      '#06b6d4', // cyan
      '#10b981', // emerald
      '#8b5cf6', // violet
      '#ec4899', // pink
      '#f97316'  // orange
    ]
  );

  const antennaColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#60a5fa', // light blue
      '#22d3ee', // light cyan
      '#34d399', // light emerald
      '#a78bfa', // light violet
      '#f472b6', // light pink
      '#fb923c'  // light orange
    ]
  );

  const rotation = useTransform(smoothX, [-800, 800], [-15, 15]);
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (robotRef.current) {
        const robotBounds = robotRef.current.getBoundingClientRect();
        const robotCenterX = robotBounds.left + robotBounds.width / 2;
        const diff = e.clientX - robotCenterX;
        mouseX.set(diff);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  return (
    <motion.div
      ref={robotRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none"
      style={{
        x: smoothX,
        rotate: rotation,
        zIndex: 50
      }}
    >
      <div className="relative w-32 h-32">
        {/* Robot Head */}
        <motion.div 
          className="absolute bottom-0 w-24 h-24 rounded-t-3xl mx-auto left-0 right-0 shadow-lg"
          style={{
            backgroundColor: robotColor
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Eyes */}
          <div className="absolute top-6 left-0 right-0 flex justify-center space-x-6">
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-inner"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-inner"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </div>
          {/* Antenna */}
          <motion.div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-6"
            style={{
              backgroundColor: robotColor
            }}
            animate={{
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg"
              style={{
                backgroundColor: antennaColor
              }}
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        {/* Shadow */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/20 rounded-full blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.15, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
} 