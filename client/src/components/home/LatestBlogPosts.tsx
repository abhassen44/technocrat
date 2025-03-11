"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Link } from "wouter"
import { motion } from "framer-motion"
import { Palette, Zap, Cpu } from "lucide-react"

interface Blog {
  id: string | number
  title: string
  content: string
  category: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const mockBlogs: Blog[] = [
    {
      id: 1,
      title: "The Future of Wearable Tech",
      content: "Exploring how wearable technology is evolving and what we can expect in the coming years...",
      category: "Technology Trends",
    },
    {
      id: 2,
      title: "Building Sustainable Electronics",
      content: "How engineers are designing greener electronic devices with reduced environmental impact...",
      category: "Sustainability",
    },
    {
      id: 3,
      title: "Introduction to Quantum Computing",
      content: "Understanding the basics of quantum computing and why it matters for future technologies...",
      category: "Quantum Tech",
    },
  ];

const categoryConfig: Record<string, { textColor: string; bgColor: string; icon: React.ReactNode }> = {
  Microcontrollers: {
    textColor: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950",
    icon: <Cpu className="w-4 h-4 mr-1" />,
  },
  IoT: {
    textColor: "text-purple-600", 
    bgColor: "bg-purple-100 dark:bg-purple-950",
    icon: <Zap className="w-4 h-4 mr-1" />,
  },
  Electronics: {
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-950", 
    icon: <Palette className="w-4 h-4 mr-1" />,
  },
}

const levelColors: Record<string, { textColor: string; bgColor: string }> = {
  Beginner: { textColor: "text-green-600", bgColor: "bg-green-100 dark:bg-green-950" },
  Intermediate: { textColor: "text-amber-600", bgColor: "bg-amber-100 dark:bg-amber-950" },
  Advanced: { textColor: "text-red-600", bgColor: "bg-red-100 dark:bg-red-950" },
}

export function LatestBlogPosts() {
  const [blogs] = useState<Blog[]>(mockBlogs)
  const [isLoading] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="h-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Latest Blog Posts
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog, index) => {
          const categoryConfig_ = categoryConfig[blog.category] || {
            textColor: "text-gray-600",
            bgColor: "bg-gray-100 dark:bg-gray-800",
            icon: null,
          }
          const levelColor = levelColors["Beginner"] || {
            textColor: "text-gray-600",
            bgColor: "bg-gray-100 dark:bg-gray-800",
          }

          return (
            <motion.div
              key={blog.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              <Link href={`/blogs/${blog.id}`}>
                <div className="h-full rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.content}</p>
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${levelColor.textColor} ${levelColor.bgColor} ring-1 ring-inset`}>
                        {levelColor.textColor}
                      </span>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${categoryConfig_.textColor} ${categoryConfig_.bgColor} ring-1 ring-inset`}>
                        {categoryConfig_.icon}
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="absolute -z-10 top-1/2 left-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute -z-10 top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute -z-10 bottom-1/2 right-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
    </div>
  )
}
