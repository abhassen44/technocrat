"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface MousePosition {
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  speedX: number
  speedY: number
  life: number
  maxLife: number
}

export function MouseParticles() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isActive, setIsActive] = useState(false)
  const requestRef = useRef<number>(0)
  const particleIdRef = useRef(0)
  const previousTimeRef = useRef<number>(0)
  const emissionRateRef = useRef(0)
  
  // Colors for particles
  const colors = [
    "#4299e1", // blue
    "#3182ce", // darker blue
    "#63b3ed", // lighter blue
    "#90cdf4", // very light blue
    "#2b6cb0"  // deep blue
  ]

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsActive(true)
      // Reset emission counter to create a burst of particles
      emissionRateRef.current = 0
    }
    
    const handleMouseLeave = () => {
      setIsActive(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  const createParticle = (): Particle => {
    // Random offset from cursor position
    const offsetX = (Math.random() - 0.5) * 20
    const offsetY = (Math.random() - 0.5) * 20
    
    // Random speed
    const speedX = (Math.random() - 0.5) * 3
    const speedY = (Math.random() - 0.5) * 3 - 1 // Slight upward bias
    
    // Random size between 2 and 6
    const size = Math.random() * 4 + 2
    
    // Random color from our palette
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    // Random life duration
    const maxLife = Math.random() * 50 + 30 // 30-80 frames
    
    return {
      id: particleIdRef.current++,
      x: mousePosition.x + offsetX,
      y: mousePosition.y + offsetY,
      size,
      color,
      opacity: 1,
      speedX,
      speedY,
      life: 0,
      maxLife
    }
  }

  const updateParticles = (time: number) => {
    if (previousTimeRef.current === 0) {
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(updateParticles)
      return
    }
    
    const deltaTime = time - previousTimeRef.current
    previousTimeRef.current = time
    
    // Add new particles if mouse is active
    if (isActive) {
      emissionRateRef.current += deltaTime
      
      // Emit particles at a controlled rate
      while (emissionRateRef.current > 30) { // Adjust for more/fewer particles
        setParticles(prevParticles => [
          ...prevParticles,
          createParticle()
        ])
        emissionRateRef.current -= 30
      }
    }
    
    // Update existing particles
    setParticles(prevParticles => 
      prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          speedY: particle.speedY + 0.05, // Gravity effect
          life: particle.life + 1,
          opacity: 1 - (particle.life / particle.maxLife)
        }))
        .filter(particle => particle.life < particle.maxLife) // Remove dead particles
    )
    
    requestRef.current = requestAnimationFrame(updateParticles)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateParticles)
    return () => cancelAnimationFrame(requestRef.current)
  }, [isActive])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )
} 