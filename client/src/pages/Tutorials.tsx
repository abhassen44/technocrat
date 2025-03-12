import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Filter, Clock, Tag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the Tutorial type locally to ensure consistency
interface Tutorial {
  id: string | number;
  title: string;
  description: string;
  level: string;
  category: string;
  duration?: string;
  featured?: boolean;
}

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Define color scheme for different categories with enhanced hover effects
const categoryColors = {
  "Microcontrollers": { 
    bg: "bg-pink-100", 
    text: "text-pink-700", 
    hover: "hover:bg-pink-200",
    gradientFrom: "from-pink-400",
    gradientTo: "to-pink-600"
  },
  "IoT": { 
    bg: "bg-cyan-100", 
    text: "text-cyan-800", 
    hover: "hover:bg-cyan-200",
    gradientFrom: "from-cyan-400",
    gradientTo: "to-cyan-600"
  },
  "Electronics": { 
    bg: "bg-amber-100", 
    text: "text-amber-700", 
    hover: "hover:bg-amber-200",
    gradientFrom: "from-amber-400",
    gradientTo: "to-amber-600"
  },
  "Signal Processing": { 
    bg: "bg-indigo-100", 
    text: "text-indigo-700", 
    hover: "hover:bg-indigo-200",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-indigo-600"
  },
  "default": { 
    bg: "bg-gray-100", 
    text: "text-gray-700", 
    hover: "hover:bg-gray-200",
    gradientFrom: "from-gray-400",
    gradientTo: "to-gray-600"
  }
};

// Mock data for development
const mockTutorials: Tutorial[] = [
  { id: 1, title: "Getting Started with Arduino", description: "Learn how to set up your Arduino and build your first project", level: "Beginner", category: "Microcontrollers", duration: "1 hour", featured: true },
  { id: 2, title: "Build a Smart Home Hub", description: "Create your own smart home control center with Raspberry Pi", level: "Intermediate", category: "IoT", duration: "2.5 hours" },
  { id: 3, title: "Advanced PCB Design", description: "Master the art of creating professional circuit boards", level: "Advanced", category: "Electronics", duration: "4 hours", featured: true },
  { id: 4, title: "Basic Electronics 101", description: "Introduction to electronic components and circuit design", level: "Beginner", category: "Electronics", duration: "1.5 hours" },
  { id: 5, title: "Programming ESP32 Microcontrollers", description: "Learn how to program the powerful ESP32 platform", level: "Intermediate", category: "Microcontrollers", duration: "3 hours" },
  { id: 6, title: "Advanced Sensor Networks", description: "Building complex sensor networks for data collection", level: "Advanced", category: "IoT", duration: "5 hours" },
  { id: 7, title: "Intro to Digital Signal Processing", description: "Learn the basics of processing and analyzing digital signals", level: "Intermediate", category: "Signal Processing", duration: "2 hours" },
  { id: 8, title: "Soldering Techniques for Beginners", description: "Master the essential skill of soldering electronic components", level: "Beginner", category: "Electronics", duration: "45 minutes" },
];

// Fetch tutorials from API
const fetchTutorials = async (): Promise<Tutorial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTutorials), 1000);
  });
};

export default function Tutorials() {
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const { data: tutorials, isLoading, error } = useQuery({
    queryKey: ["tutorials"],
    queryFn: fetchTutorials,
    placeholderData: mockTutorials,
  });

  // Get unique categories for filter
  const categories = tutorials ? Array.from(new Set(tutorials.map(tutorial => tutorial.category))) : [];

  // Filter tutorials by category and search query
  const filteredTutorials = tutorials 
    ? tutorials.filter(tutorial => {
        const matchesCategory = filter ? tutorial.category === filter : true;
        const matchesSearch = searchQuery 
          ? tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesCategory && matchesSearch;
      })
    : [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Error loading tutorials</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  // Handle card toggle
  const toggleCard = (id: string | number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Get color for category
  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section with updated gradient */}
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Tech Tutorials</h1>
            </motion.div>
            <p className="text-xl max-w-2xl">
              Learn electronics, programming, and DIY projects with our comprehensive tutorials.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="py-6 border-b ">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search tutorials by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center mb-2">
            <Filter size={18} className="mr-2 text-gray-500" />
            <h3 className="font-medium">Filter by category:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === null 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Tutorials
            </button>
            {categories.map((category) => {
              const colors = getCategoryColor(category);
              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category 
                      ? 'bg-violet-600 text-white' 
                      : `${colors.bg} ${colors.text} ${colors.hover}`
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">
          {filter ? `${filter} Tutorials` : "All Tutorials"}
          <span className="text-lg font-normal text-gray-500 ml-3">
            ({filteredTutorials.length} {filteredTutorials.length === 1 ? 'tutorial' : 'tutorials'})
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => {
            const colors = getCategoryColor(tutorial.category);
            const isExpanded = expandedCard === tutorial.id;
            const isHovered = hoveredCard === tutorial.id;
            
            return (
              <motion.div 
                key={tutorial.id} 
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(tutorial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`h-full overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  {/* Colorful top bar that changes on hover */}
                  <div 
                    className={`h-2 w-full transition-all duration-500 bg-gradient-to-r ${
                      isHovered 
                        ? `${colors.gradientFrom} ${colors.gradientTo}` 
                        : `from-gray-200 to-gray-300`
                    }`}
                  ></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">{tutorial.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isHovered 
                          ? 'bg-gradient-to-r ' + colors.gradientFrom + ' ' + colors.gradientTo + ' text-white' 
                          : colors.bg + ' ' + colors.text
                      }`}>
                        {tutorial.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      {isExpanded 
                        ? tutorial.description 
                        : `${tutorial.description.substring(0, 100)}${tutorial.description.length > 100 ? '...' : ''}`
                      }
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Tag size={16} className={`mr-2 ${isHovered ? 'text-violet-500' : 'text-gray-500'} transition-colors`} />
                        <span className="font-medium text-gray-700">{tutorial.level}</span>
                      </div>
                      {tutorial.duration && (
                        <div className="flex items-center text-sm">
                          <Clock size={16} className={`mr-2 ${isHovered ? 'text-violet-500' : 'text-gray-500'} transition-colors`} />
                          <span className="font-medium text-gray-700">{tutorial.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        onClick={() => toggleCard(tutorial.id)}
                        className={`text-sm font-medium transition-colors ${
                          isHovered ? 'text-violet-600' : colors.text
                        } hover:underline`}
                      >
                        {isExpanded ? 'Show less' : 'Show more'}
                      </button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 text-white rounded-full text-sm font-medium transition-colors ${
                          isHovered 
                            ? `bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo}` 
                            : 'bg-violet-600 hover:bg-violet-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Tutorial
                        </div>
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {filteredTutorials.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium text-gray-500 mb-2">No tutorials found</h3>
              <p className="text-gray-400">
                {filter && searchQuery 
                  ? `No ${filter} tutorials match your search for "${searchQuery}".`
                  : filter 
                    ? `There are no ${filter} tutorials available at this time.` 
                    : searchQuery
                      ? `No tutorials match your search for "${searchQuery}".`
                      : 'There are no tutorials available.'
                }
              </p>
              {(filter || searchQuery) && (
                <button
                  onClick={() => {setFilter(null); setSearchQuery("");}}
                  className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-sm font-medium transition-colors"
                >
                  View all tutorials
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
