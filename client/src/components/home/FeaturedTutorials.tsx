"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Palette, Zap, Cpu, Search, Filter, X, ChevronDown, 
  ChevronUp, Waves, BookOpen, Clock, ArrowRight, Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "../theme/ThemeToggle"

// Define the Tutorial type with more properties
interface Tutorial {
  id: string | number
  title: string
  description: string
  level: string
  category: string
  longDescription?: string
  duration?: string
  author?: string
  image?: string
  tags?: string[]
  popularity?: number
  lastUpdated?: string
}

// Enhanced animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
  hover: { 
    scale: 1.02, 
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.2, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
}

// Expanded mock tutorial data with additional properties
const allTutorials: Tutorial[] = [
  { 
    id: 1, 
    title: "Getting Started with Arduino", 
    description: "Learn how to set up your Arduino and build your first project", 
    longDescription: "This comprehensive tutorial will guide you through everything you need to know to get started with Arduino. We'll cover basic electronics concepts, setting up your development environment, understanding the Arduino IDE, and building your first LED blinking project. Perfect for absolute beginners!",
    level: "Beginner", 
    category: "Microcontrollers",
    duration: "1h 30m",
    author: "Lisa Johnson",
    lastUpdated: "2024-12-10",
    tags: ["arduino", "electronics", "led", "programming"],
    popularity: 95
  },
  { 
    id: 2, 
    title: "Build a Smart Home Hub", 
    description: "Create your own smart home control center with Raspberry Pi", 
    longDescription: "Transform your home with this DIY smart home controller built on a Raspberry Pi. You'll learn how to connect various sensors, set up a web interface, integrate with popular smart home protocols like Zigbee and Z-Wave, and create automation routines that make your home truly intelligent.",
    level: "Intermediate", 
    category: "IoT",
    duration: "3h 15m",
    author: "Marcus Chen",
    lastUpdated: "2025-01-15",
    tags: ["raspberry pi", "smart home", "automation", "zigbee"],
    popularity: 87
  },
  { 
    id: 3, 
    title: "Advanced PCB Design", 
    description: "Master the art of creating professional circuit boards", 
    longDescription: "Take your electronics projects to the next level by learning professional PCB design techniques. This tutorial covers schematic capture, component selection, layout optimization, signal integrity, power distribution, thermal management, and preparing your designs for manufacturing.",
    level: "Advanced", 
    category: "Electronics",
    duration: "4h 45m",
    author: "Elena Rodriguez",
    lastUpdated: "2024-11-30",
    tags: ["pcb", "circuit design", "kicad", "altium"],
    popularity: 78
  },
  { 
    id: 4, 
    title: "IoT Weather Station", 
    description: "Build a connected weather station using ESP8266", 
    longDescription: "Create a fully-functional Internet of Things weather station that measures temperature, humidity, pressure, and air quality. We'll show you how to connect sensors to an ESP8266, set up real-time data logging to the cloud, create beautiful visualizations, and even send alerts when conditions change.",
    level: "Intermediate", 
    category: "IoT",
    duration: "2h 45m",
    author: "James Wilson",
    lastUpdated: "2025-02-05",
    tags: ["esp8266", "sensors", "mqtt", "cloud"],
    popularity: 91
  },
  { 
    id: 5, 
    title: "Robot Arm Programming", 
    description: "Program a robotic arm with precise movements", 
    longDescription: "Learn the fundamentals of robotics programming by building and controlling a multi-axis robotic arm. This tutorial covers forward and inverse kinematics, trajectory planning, obstacle avoidance, and how to program complex pick-and-place operations for your robot.",
    level: "Advanced", 
    category: "Robotics",
    duration: "5h 20m",
    author: "Aisha Patel",
    lastUpdated: "2025-01-08",
    tags: ["robotics", "kinematics", "servo motors", "python"],
    popularity: 83
  },
  { 
    id: 6, 
    title: "Digital Signal Processing Basics", 
    description: "Understand DSP fundamentals for audio applications", 
    longDescription: "Dive into the world of Digital Signal Processing with this practical tutorial. You'll learn about sampling theory, Fourier transforms, filter design, and real-time processing techniques. We'll implement basic audio effects and analyzers using Python and show you how to apply these concepts to your own projects.",
    level: "Intermediate", 
    category: "Signal Processing",
    duration: "3h 50m",
    author: "David Kim",
    lastUpdated: "2024-12-22",
    tags: ["dsp", "audio", "python", "fourier"],
    popularity: 76
  },
]

// Enhanced category config with more styling options
const categoryConfig: Record<string, { 
  color: string; 
  bgColor: string; 
  hoverBgColor: string;
  gradient: string;
  hoverGradient: string;
  icon: React.ReactNode 
}> = {
  Microcontrollers: { 
    color: "text-blue-600", 
    bgColor: "bg-blue-100 dark:bg-blue-950", 
    hoverBgColor: "bg-blue-200 dark:bg-blue-900",
    gradient: "from-blue-400 to-cyan-500",
    hoverGradient: "from-blue-500 to-cyan-600",
    icon: <Cpu className="w-4 h-4 mr-1" /> 
  },
  IoT: { 
    color: "text-purple-600", 
    bgColor: "bg-purple-100 dark:bg-purple-950",
    hoverBgColor: "bg-purple-200 dark:bg-purple-900", 
    gradient: "from-purple-400 to-pink-500",
    hoverGradient: "from-purple-500 to-pink-600",
    icon: <Zap className="w-4 h-4 mr-1" /> 
  },
  Electronics: { 
    color: "text-emerald-600", 
    bgColor: "bg-emerald-100 dark:bg-emerald-950",
    hoverBgColor: "bg-emerald-200 dark:bg-emerald-900", 
    gradient: "from-emerald-400 to-green-500",
    hoverGradient: "from-emerald-500 to-green-600",
    icon: <Palette className="w-4 h-4 mr-1" /> 
  },
  Robotics: { 
    color: "text-rose-600", 
    bgColor: "bg-rose-100 dark:bg-rose-950",
    hoverBgColor: "bg-rose-200 dark:bg-rose-900", 
    gradient: "from-rose-400 to-red-500",
    hoverGradient: "from-rose-500 to-red-600",
    icon: <Zap className="w-4 h-4 mr-1" /> 
  },
  "Signal Processing": { 
    color: "text-amber-600", 
    bgColor: "bg-amber-100 dark:bg-amber-950",
    hoverBgColor: "bg-amber-200 dark:bg-amber-900", 
    gradient: "from-amber-400 to-yellow-500",
    hoverGradient: "from-amber-500 to-yellow-600",
    icon: <Waves className="w-4 h-4 mr-1" /> 
  },
}

// Enhanced level colors with gradients
const levelColors: Record<string, { 
  color: string; 
  bgColor: string;
  gradient: string;
  icon: React.ReactNode;
}> = {
  Beginner: { 
    color: "text-green-600", 
    bgColor: "bg-green-100 dark:bg-green-950",
    gradient: "from-green-400 to-emerald-500",
    icon: <BookOpen className="w-3 h-3 mr-1" />
  },
  Intermediate: { 
    color: "text-amber-600", 
    bgColor: "bg-amber-100 dark:bg-amber-950",
    gradient: "from-amber-400 to-yellow-500",
    icon: <BookOpen className="w-3 h-3 mr-1" />
  },
  Advanced: { 
    color: "text-red-600", 
    bgColor: "bg-red-100 dark:bg-red-950",
    gradient: "from-red-400 to-rose-500",
    icon: <BookOpen className="w-3 h-3 mr-1" />
  },
}

// Sort options
const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "latest", label: "Recently Updated" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "duration-asc", label: "Duration (Shortest)" },
  { value: "duration-desc", label: "Duration (Longest)" },
];

export function FeaturedTutorials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<{
    levels: string[];
    categories: string[];
    tags: string[];
  }>({
    levels: [],
    categories: [],
    tags: []
  })
  const [tutorials, setTutorials] = useState(allTutorials)
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCards, setExpandedCards] = useState<(string | number)[]>([])
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null)
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Extract unique levels, categories, and tags for filters
  const allLevels = Array.from(new Set(allTutorials.map(t => t.level)))
  const allCategories = Array.from(new Set(allTutorials.map(t => t.category)))
  const allTags = Array.from(new Set(allTutorials.flatMap(t => t.tags || [])))

  // Filter and sort tutorials
  useEffect(() => {
    let filtered = allTutorials
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tutorial.tags && tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }
    
    // Apply level filters
    if (activeFilters.levels.length > 0) {
      filtered = filtered.filter(tutorial => 
        activeFilters.levels.includes(tutorial.level)
      )
    }
    
    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(tutorial => 
        activeFilters.categories.includes(tutorial.category)
      )
    }
    
    // Apply tag filters
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(tutorial => 
        tutorial.tags && tutorial.tags.some(tag => activeFilters.tags.includes(tag))
      )
    }
    
    // Apply sorting
    let sorted = [...filtered]
    switch (sortBy) {
      case "popularity":
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        break
      case "latest":
        sorted.sort((a, b) => new Date(b.lastUpdated || "").getTime() - new Date(a.lastUpdated || "").getTime())
        break
      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "duration-asc":
        sorted.sort((a, b) => {
          const getMinutes = (duration: string) => {
            const match = duration.match(/(\d+)h\s+(\d+)m/)
            if (match) return parseInt(match[1]) * 60 + parseInt(match[2])
            return 0
          }
          return getMinutes(a.duration || "") - getMinutes(b.duration || "")
        })
        break
      case "duration-desc":
        sorted.sort((a, b) => {
          const getMinutes = (duration: string) => {
            const match = duration.match(/(\d+)h\s+(\d+)m/)
            if (match) return parseInt(match[1]) * 60 + parseInt(match[2])
            return 0
          }
          return getMinutes(b.duration || "") - getMinutes(a.duration || "")
        })
        break
    }
    
    setTutorials(sorted)
  }, [searchTerm, activeFilters, sortBy])

  // Toggle filter selection
  const toggleFilter = (type: 'levels' | 'categories' | 'tags', value: string) => {
    setActiveFilters(prev => {
      const current = [...prev[type]]
      const index = current.indexOf(value)
      
      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }
      
      return {
        ...prev,
        [type]: current
      }
    })
  }

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

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({ levels: [], categories: [], tags: [] })
    setSearchTerm("")
  }

  // Get total active filters count
  const getActiveFiltersCount = () => {
    return activeFilters.levels.length + activeFilters.categories.length + activeFilters.tags.length
  }

  // Format last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Section Heading with Animation */}
      <motion.div 
        className="flex flex-col items-start space-y-2" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-2">
          <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-violet-500 rounded-full"></div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            <span className="bg-clip-text text-foreground dark:text-white">
              Featured Tutorials
            </span>
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover our collection of high-quality tutorials to help you master electronics, 
          robotics, and more. Filter by difficulty, category, or search for specific topics.
        </p>
      </motion.div>

      {/* Enhanced Search, Filters, and Sort Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search Box with Animation */}
          <motion.div 
            className="relative flex-1 min-w-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search tutorials..."
              className="pl-10 h-11 border-gray-300 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8" 
                onClick={() => setSearchTerm("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </motion.div>

          {/* Filter Button with Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 h-11"
            >
              <Filter className="w-4 h-4" /> 
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 flex items-center justify-center rounded-full p-0 text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </motion.div>

          {/* Sort Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative"
          >
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </motion.div>

          {/* View Toggle: Grid/List */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex rounded-md border border-input overflow-hidden"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => setViewMode("grid")}
                    className="rounded-none border-0 h-11 px-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    onClick={() => setViewMode("list")}
                    className="rounded-none border-0 h-11 px-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Clear Filters Button */}
          {getActiveFiltersCount() > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground h-11">
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>

        {/* Filter options panel with animation */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              transition={{ duration: 0.3 }}
            >
              <div className="p-5 border rounded-lg bg-background space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Difficulty Level Filters */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-lg">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      Difficulty Level
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allLevels.map(level => {
                        const isActive = activeFilters.levels.includes(level)
                        const levelData = levelColors[level]
                        
                        return (
                          <Badge 
                            key={level}
                            variant={isActive ? "default" : "outline"}
                            className={`cursor-pointer ${isActive ? `${levelData.color} ${levelData.bgColor}` : ''} px-3 py-1.5 text-xs transition-all duration-200 hover:shadow-sm`}
                            onClick={() => toggleFilter('levels', level)}
                          >
                            <span className="flex items-center">
                              {levelData.icon}
                              {level}
                            </span>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Categories Filters */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-lg">
                      <Palette className="w-4 h-4 mr-2 text-primary" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map(category => {
                        const isActive = activeFilters.categories.includes(category)
                        const categoryData = categoryConfig[category]
                        
                        return (
                          <Badge 
                            key={category}
                            variant={isActive ? "default" : "outline"}
                            className={`cursor-pointer ${isActive ? `${categoryData.color} ${categoryData.bgColor}` : ''} px-3 py-1.5 text-xs transition-all duration-200 hover:shadow-sm`}
                            onClick={() => toggleFilter('categories', category)}
                          >
                            <span className="flex items-center">
                              {categoryData.icon}
                              {category}
                            </span>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Tags Filters */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center text-lg">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 12).map(tag => {
                        const isActive = activeFilters.tags.includes(tag)
                        
                        return (
                          <Badge 
                            key={tag}
                            variant={isActive ? "default" : "outline"}
                            className={`cursor-pointer ${isActive ? 'bg-primary/90 hover:bg-primary' : ''} px-3 py-1.5 text-xs transition-all duration-200 hover:shadow-sm`}
                            onClick={() => toggleFilter('tags', tag)}
                          >
                            #{tag}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tutorial Results Stats */}
      <div className="flex justify-between items-center">
        <motion.div 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Showing {tutorials.length} of {allTutorials.length} tutorials
          {getActiveFiltersCount() > 0 && ` (filtered)`}
        </motion.div>
      </div>

      {/* Grid View of Tutorial Cards */}
      {tutorials.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {tutorials.map((tutorial, index) => {
                const categoryData = categoryConfig[tutorial.category] || { 
                  color: "text-gray-600", 
                  bgColor: "bg-gray-100 dark:bg-gray-800",
                  hoverBgColor: "bg-gray-200 dark:bg-gray-700",
                  gradient: "from-gray-400 to-gray-500",
                  hoverGradient: "from-gray-500 to-gray-600",
                  icon: <Cpu className="w-4 h-4 mr-1" /> 
                }
                const levelData = levelColors[tutorial.level] || { 
                  color: "text-gray-600", 
                  bgColor: "bg-gray-100 dark:bg-gray-800",
                  gradient: "from-gray-400 to-gray-500",
                  icon: <BookOpen className="w-3 h-3 mr-1" />
                }
                const isHovered = hoveredCardId === tutorial.id
                const isExpanded = expandedCards.includes(tutorial.id)
                
                const displayDescription = isExpanded && tutorial.longDescription 
                  ? tutorial.longDescription 
                  : tutorial.description

                return (
                  <motion.div 
                    key={tutorial.id} 
                    layout
                    variants={cardVariants} 
                    initial="hidden" 
                    animate="visible" 
                    exit="exit"
                    custom={index}
                    onMouseEnter={() => setHoveredCardId(tutorial.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    whileHover="hover"
                    className="h-full flex"
                  >
                    <Card className="h-full w-full flex flex-col border overflow-hidden transition-all duration-300 hover:shadow-xl">
                      {/* Card Header Bar */}
                      <motion.div 
                        className={`h-2 bg-gradient-to-r ${isHovered ? categoryData.hoverGradient : categoryData.gradient}`}
                        animate={{ height: isHovered ? "4px" : "2px" }}
                      ></motion.div>
                      
                      <CardHeader className="pb-2 relative">
                        {/* Popularity Indicator */}
                        {tutorial.popularity && tutorial.popularity > 90 && (
                         <Badge variant="secondary" className="absolute -right-1 -top-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> Popular
                          </Badge>
                        )}
                        
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold line-clamp-2 hover:line-clamp-none">
                            {tutorial.title}
                          </CardTitle>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={`${levelData.color} ${levelData.bgColor} flex items-center gap-1`}>
                            {levelData.icon}
                            {tutorial.level}
                          </Badge>
                          
                          <Badge variant="outline" className={`${categoryData.color} ${categoryData.bgColor} flex items-center gap-1`}>
                            {categoryData.icon}
                            {tutorial.category}
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
                        
                        {tutorial.longDescription && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mx-auto mt-1 text-xs text-muted-foreground" 
                            onClick={(e) => {
                              e.preventDefault(); 
                              toggleCardExpansion(tutorial.id);
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
                        {tutorial.tags && tutorial.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {tutorial.tags.slice(0, 3).map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="px-2 py-0 text-xs text-muted-foreground hover:bg-secondary/50 cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleFilter('tags', tag);
                                }}
                              >
                                #{tag}
                              </Badge>
                            ))}
                            {tutorial.tags.length > 3 && (
                              <Badge 
                                variant="outline" 
                                className="px-2 py-0 text-xs text-muted-foreground"
                              >
                                +{tutorial.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="mt-3 border-t pt-3 flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {tutorial.duration}
                          </div>
                          {tutorial.lastUpdated && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Updated {formatDate(tutorial.lastUpdated)}
                            </div>
                          )}
                        </div>
                        
                        <Button variant="default" size="sm" asChild className="gap-1">
                          <Link href={`/tutorials/${tutorial.id}`}>
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {tutorials.map((tutorial, index) => {
                const categoryData = categoryConfig[tutorial.category] || { 
                  color: "text-gray-600", 
                  bgColor: "bg-gray-100 dark:bg-gray-800",
                  hoverBgColor: "bg-gray-200 dark:bg-gray-700",
                  gradient: "from-gray-400 to-gray-500",
                  hoverGradient: "from-gray-500 to-gray-600",
                  icon: <Cpu className="w-4 h-4 mr-1" /> 
                }
                const levelData = levelColors[tutorial.level] || { 
                  color: "text-gray-600", 
                  bgColor: "bg-gray-100 dark:bg-gray-800",
                  gradient: "from-gray-400 to-gray-500",
                  icon: <BookOpen className="w-3 h-3 mr-1" />
                }
                const isHovered = hoveredCardId === tutorial.id
                const isExpanded = expandedCards.includes(tutorial.id)
                
                const displayDescription = isExpanded && tutorial.longDescription 
                  ? tutorial.longDescription 
                  : tutorial.description

                return (
                  <motion.div 
                    key={tutorial.id} 
                    layout
                    variants={cardVariants} 
                    initial="hidden" 
                    animate="visible" 
                    exit="exit"
                    custom={index}
                    onMouseEnter={() => setHoveredCardId(tutorial.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    whileHover="hover"
                  >
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      {/* Card Header Bar */}
                      <motion.div 
                        className={`h-1 bg-gradient-to-r ${isHovered ? categoryData.hoverGradient : categoryData.gradient}`}
                        animate={{ height: isHovered ? "3px" : "1px" }}
                      ></motion.div>
                      
                      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                          <div className="flex flex-wrap items-start gap-2 mb-1">
                            <h3 className="text-lg font-bold mr-auto">{tutorial.title}</h3>
                            
                            {tutorial.popularity && tutorial.popularity > 90 && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 flex items-center gap-1">
                                <Zap className="w-3 h-3" /> Popular
                              </Badge>
                            )}
                            
                            <Badge variant="outline" className={`${levelData.color} ${levelData.bgColor} flex items-center gap-1`}>
                              {levelData.icon}
                              {tutorial.level}
                            </Badge>
                            
                            <Badge variant="outline" className={`${categoryData.color} ${categoryData.bgColor} flex items-center gap-1`}>
                              {categoryData.icon}
                              {tutorial.category}
                            </Badge>
                          </div>
                          
                          <motion.p 
                            className="text-muted-foreground mt-2"
                            animate={{ height: "auto" }}
                          >
                            {displayDescription}
                          </motion.p>
                          
                          {tutorial.longDescription && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-1.5 text-xs text-muted-foreground" 
                              onClick={(e) => {
                                e.preventDefault(); 
                                toggleCardExpansion(tutorial.id);
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
                          {tutorial.tags && tutorial.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {tutorial.tags.map(tag => (
                                <Badge 
                                  key={tag} 
                                  variant="outline" 
                                  className="px-2 py-0 text-xs text-muted-foreground hover:bg-secondary/50 cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleFilter('tags', tag);
                                  }}
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-row md:flex-col justify-between items-start md:items-end gap-4 md:border-l md:pl-4">
                          <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {tutorial.duration}
                            </div>
                            {tutorial.author && (
                              <div className="text-xs text-muted-foreground mt-1">
                                By {tutorial.author}
                              </div>
                            )}
                            {tutorial.lastUpdated && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Updated {formatDate(tutorial.lastUpdated)}
                              </div>
                            )}
                          </div>
                          
                          <Button variant="default" size="sm" asChild className="gap-1">
                            <Link href={`/tutorials/${tutorial.id}`}>
                              View Tutorial <ArrowRight className="w-3 h-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )
      ) : (
        // Empty state with animation
        <motion.div 
          className="text-center py-16 border rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="bg-muted rounded-full p-3">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No tutorials found</h3>
            <p className="text-muted-foreground max-w-sm">
              We couldn't find any tutorials matching your current filters. 
              Try adjusting your search terms or clearing some filters.
            </p>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="mt-4"
            >
              Clear all filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}