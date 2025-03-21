"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Zap, Cpu, BookOpen, Clock, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Blog {
  id: string | number
  title: string
  content: string
  category: string
  longDescription?: string
  publishDate?: string
  author?: string
  readTime?: string
  tags?: string[]
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
    scale: 1.02,
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
    longDescription: "Wearable technology has come a long way from simple fitness trackers to sophisticated health monitoring devices. This blog explores the latest innovations, upcoming trends, and how these devices are becoming more integrated into our daily lives. We'll look at advancements in sensors, battery life, and AI integration.",
    category: "Technology Trends",
    publishDate: "2025-03-01",
    author: "Alex Johnson",
    readTime: "5 min",
    tags: ["wearables", "tech", "innovation"]
  },
  {
    id: 2,
    title: "Building Sustainable Electronics",
    content: "How engineers are designing greener electronic devices with reduced environmental impact...",
    longDescription: "As climate concerns grow, the electronics industry is adapting with more sustainable practices. This post examines how companies are redesigning products to reduce e-waste, use recyclable materials, and lower energy consumption throughout the product lifecycle. We'll highlight innovative approaches and success stories.",
    category: "Sustainability",
    publishDate: "2025-02-15",
    author: "Maya Patel",
    readTime: "7 min",
    tags: ["sustainability", "green-tech", "environment"]
  },
  {
    id: 3,
    title: "Introduction to Quantum Computing",
    content: "Understanding the basics of quantum computing and why it matters for future technologies...",
    longDescription: "Quantum computing represents a paradigm shift in computing power and capabilities. This article breaks down the complex concepts into understandable terms, explaining qubits, quantum entanglement, and how these computers solve problems differently. We'll explore current applications and future potential across various industries.",
    category: "Quantum Tech",
    publishDate: "2025-02-28",
    author: "David Kim",
    readTime: "10 min",
    tags: ["quantum", "computing", "future-tech"]
  },
];

const categoryConfig: Record<string, { textColor: string; bgColor: string; hoverBgColor: string; gradient: string; hoverGradient: string; icon: React.ReactNode }> = {
  "Technology Trends": {
    textColor: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950",
    hoverBgColor: "bg-blue-200 dark:bg-blue-900",
    gradient: "from-blue-400 to-cyan-500",
    hoverGradient: "from-blue-500 to-cyan-600",
    icon: <Cpu className="w-4 h-4 mr-1" />,
  },
  "Sustainability": {
    textColor: "text-emerald-600", 
    bgColor: "bg-emerald-100 dark:bg-emerald-950",
    hoverBgColor: "bg-emerald-200 dark:bg-emerald-900", 
    gradient: "from-emerald-400 to-green-500",
    hoverGradient: "from-emerald-500 to-green-600",
    icon: <Palette className="w-4 h-4 mr-1" />,
  },
  "Quantum Tech": {
    textColor: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-950",
    hoverBgColor: "bg-purple-200 dark:bg-purple-900",
    gradient: "from-purple-400 to-pink-500",
    hoverGradient: "from-purple-500 to-pink-600",
    icon: <Zap className="w-4 h-4 mr-1" />,
  },
}

export function LatestBlogPosts() {
  const [blogs] = useState<Blog[]>(mockBlogs)
  const [isLoading] = useState(false)
  const [expandedCards, setExpandedCards] = useState<(string | number)[]>([])
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null)

  // Toggle card expansion
  const toggleCardExpansion = (id: string | number) => {
    setExpandedCards(prev => {
      if (prev.includes(id)) {
        return prev.filter(cardId => cardId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

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
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <motion.div
        className="flex flex-col items-start space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-2">
          <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            <span className="bg-clip-text text-foreground dark:text-white">
              Latest Blog Posts
            </span>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Stay updated with our latest articles, insights, and tech trends. 
          Discover in-depth coverage on electronics, sustainability, and emerging technologies.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {blogs.slice(0, 3).map((blog, index) => {
            const categoryData = categoryConfig[blog.category] || {
              textColor: "text-gray-600",
              bgColor: "bg-gray-100 dark:bg-gray-800",
              hoverBgColor: "bg-gray-200 dark:bg-gray-700",
              gradient: "from-gray-400 to-gray-500",
              hoverGradient: "from-gray-500 to-gray-600",
              icon: null,
            }
            const isHovered = hoveredCardId === blog.id
            const isExpanded = expandedCards.includes(blog.id)
            
            const displayDescription = isExpanded && blog.longDescription 
              ? blog.longDescription 
              : blog.content

            return (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                onMouseEnter={() => setHoveredCardId(blog.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <Card className="h-full flex flex-col border overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Card Header Bar */}
                  <motion.div 
                    className={`h-2 bg-gradient-to-r ${isHovered ? categoryData.hoverGradient : categoryData.gradient}`}
                    animate={{ height: isHovered ? "4px" : "2px" }}
                  ></motion.div>
                  
                  <CardHeader className="pb-2 relative">
                    <CardTitle className="text-lg font-bold line-clamp-2 hover:line-clamp-none">
                      {blog.title}
                    </CardTitle>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={`${categoryData.textColor} ${categoryData.bgColor} flex items-center gap-1`}>
                        {categoryData.icon}
                        {blog.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col pb-0">
                    <motion.p 
                      className="text-muted-foreground mt-1 flex-1"
                      animate={{ height: "auto" }}
                    >
                      {displayDescription}
                    </motion.p>
                    
                    {blog.longDescription && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mx-auto mt-1 text-xs text-muted-foreground" 
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleCardExpansion(blog.id);
                        }}
                      >
                        {isExpanded ? (
                          <span className="flex items-center">
                            <ChevronUp className="w-3 h-3 mr-1" /> Show less
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <ChevronDown className="w-3 h-3 mr-1" /> Show more
                          </span>
                        )}
                      </Button>
                    )}
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {blog.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="px-2 py-0 text-xs text-muted-foreground hover:bg-secondary/50 cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="mt-3 border-t pt-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {blog.readTime}
                      </div>
                      {blog.publishDate && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Published {formatDate(blog.publishDate)}
                        </div>
                      )}
                    </div>
                    
                    <Button variant="default" size="sm" asChild className="gap-1">
                      <Link href={`/blogs/${blog.id}`}>
                        Read more <ArrowRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="absolute -z-10 top-1/2 left-1/4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute -z-10 top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute -z-10 bottom-1/2 right-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
    </div>
  )
}