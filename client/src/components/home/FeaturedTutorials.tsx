"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "wouter"
import { motion } from "framer-motion"
import { Palette, Zap, Cpu } from "lucide-react"

// Define the Tutorial type
interface Tutorial {
  id: string | number
  title: string
  description: string
  level: string
  category: string
}

// Simplified animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
  hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } },
}

// Mock tutorial data
const tutorials: Tutorial[] = [
  { id: 1, title: "Getting Started with Arduino", description: "Learn how to set up your Arduino and build your first project", level: "Beginner", category: "Microcontrollers" },
  { id: 2, title: "Build a Smart Home Hub", description: "Create your own smart home control center with Raspberry Pi", level: "Intermediate", category: "IoT" },
  { id: 3, title: "Advanced PCB Design", description: "Master the art of creating professional circuit boards", level: "Advanced", category: "Electronics" },
]

// Category and level mappings
const categoryConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode }> = {
  Microcontrollers: { color: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-950", icon: <Cpu className="w-4 h-4 mr-1" /> },
  IoT: { color: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-950", icon: <Zap className="w-4 h-4 mr-1" /> },
  Electronics: { color: "text-emerald-600", bgColor: "bg-emerald-100 dark:bg-emerald-950", icon: <Palette className="w-4 h-4 mr-1" /> },
}

const levelColors: Record<string, { color: string; bgColor: string }> = {
  Beginner: { color: "text-green-600", bgColor: "bg-green-100 dark:bg-green-950" },
  Intermediate: { color: "text-amber-600", bgColor: "bg-amber-100 dark:bg-amber-950" },
  Advanced: { color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-950" },
}

export function FeaturedTutorials() {
  return (
    <div className="space-y-8">
      {/* Section Heading */}
      <motion.div className="flex items-center space-x-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-violet-500 rounded-full"></div>
        <h2 className="text-4xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Featured Tutorials
        </h2>
      </motion.div>

      {/* Tutorial Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial, index) => {
          const categoryData = categoryConfig[tutorial.category] || { color: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-800", icon: <Cpu className="w-4 h-4 mr-1" /> }
          const levelColor = levelColors[tutorial.level] || { color: "text-gray-600", bgColor: "bg-gray-100 dark:bg-gray-800" }

          return (
            <motion.div key={tutorial.id} variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" custom={index}>
              <Link href={`/tutorials/${tutorial.id}`}>
                <Card className="h-full cursor-pointer transition-all duration-200 border overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="transition-colors duration-200 hover:text-primary">{tutorial.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${levelColor.color} ${levelColor.bgColor}`}>
                        {tutorial.level}
                      </span>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${categoryData.color} ${categoryData.bgColor}`}>
                        {categoryData.icon}
                        {tutorial.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
