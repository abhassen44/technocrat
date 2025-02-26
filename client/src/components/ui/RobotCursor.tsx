import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function RobotCursor() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    setMounted(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16C28 9.37 22.63 4 16 4ZM16 7C20.41 7 24 10.59 24 15C24 19.41 20.41 23 16 23C11.59 23 8 19.41 8 15C8 10.59 11.59 7 16 7Z"
          fill="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.circle
          cx="13"
          cy="14"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          cx="19"
          cy="14"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
          d="M16 19C14.5 19 13.25 18.5 12.5 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </svg>
    </motion.div>
  );
}
