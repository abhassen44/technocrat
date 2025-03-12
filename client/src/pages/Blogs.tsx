import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Filter, Clock, Tag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the Blog type locally to ensure consistency
interface Blog {
  id: string | number;
  title: string;
  content: string;
  category: string;
  readTime?: string;
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
  "Technology Trends": { 
    bg: "bg-purple-100", 
    text: "text-purple-700", 
    hover: "hover:bg-purple-200",
    gradientFrom: "from-purple-400",
    gradientTo: "to-purple-600"
  },
  "Sustainability": { 
    bg: "bg-green-100", 
    text: "text-green-800", 
    hover: "hover:bg-green-200",
    gradientFrom: "from-green-400",
    gradientTo: "to-green-600"
  },
  "Quantum Tech": { 
    bg: "bg-blue-100", 
    text: "text-blue-700", 
    hover: "hover:bg-blue-200",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600"
  },
  "Open Source": { 
    bg: "bg-orange-100", 
    text: "text-orange-700", 
    hover: "hover:bg-orange-200",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600"
  },
  "AI & Automation": { 
    bg: "bg-red-100", 
    text: "text-red-700", 
    hover: "hover:bg-red-200",
    gradientFrom: "from-red-400",
    gradientTo: "to-red-600"
  },
  "Industry News": { 
    bg: "bg-teal-100", 
    text: "text-teal-700", 
    hover: "hover:bg-teal-200",
    gradientFrom: "from-teal-400",
    gradientTo: "to-teal-600"
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
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "The Future of Wearable Tech",
    content: "Exploring how wearable technology is evolving and what we can expect in the coming years. From advanced health monitoring to augmented reality displays, the possibilities are expanding rapidly.",
    category: "Technology Trends",
    readTime: "5 min",
    featured: true
  },
  {
    id: 2,
    title: "Building Sustainable Electronics",
    content: "How engineers are designing greener electronic devices with reduced environmental impact. This includes biodegradable materials, energy-efficient components, and circular design principles.",
    category: "Sustainability",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Introduction to Quantum Computing",
    content: "Understanding the basics of quantum computing and why it matters for future technologies. Learn about qubits, superposition, and how quantum computers could revolutionize fields from cryptography to drug discovery.",
    category: "Quantum Tech",
    readTime: "10 min",
    featured: true
  },
  {
    id: 4,
    title: "The Rise of Open Source Hardware",
    content: "How open source hardware is democratizing innovation in electronics and empowering makers around the world to collaborate on groundbreaking projects.",
    category: "Open Source",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "AI in Electronics Manufacturing",
    content: "Exploring how artificial intelligence is transforming electronics manufacturing processes, improving quality control, and enabling more complex designs.",
    category: "AI & Automation",
    readTime: "8 min"
  },
  {
    id: 6,
    title: "The Electronics Supply Chain Crisis",
    content: "Analyzing the ongoing challenges in the global electronics supply chain and strategies for building more resilient systems in the future.",
    category: "Industry News",
    readTime: "4 min"
  },
];

// Fetch blogs from API
const fetchBlogs = async (): Promise<Blog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBlogs), 1000);
  });
};

export default function Blogs() {
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    placeholderData: mockBlogs,
  });

  // Get unique categories for filter
  const categories = blogs ? Array.from(new Set(blogs.map(blog => blog.category))) : [];

  // Filter blogs by category and search query
  const filteredBlogs = blogs 
    ? blogs.filter(blog => {
        const matchesCategory = filter ? blog.category === filter : true;
        const matchesSearch = searchQuery 
          ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            blog.content.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h2 className="text-2xl font-bold">Error loading blog posts</h2>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Tech Blog</h1>
            </motion.div>
            <p className="text-xl max-w-2xl">
              Stay up-to-date with the latest trends and insights in electronics and technology.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="py-6 border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-lg mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search blog posts by title or content..."
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
              All Posts
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

      {/* Blogs Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">
          {filter ? `${filter} Posts` : "All Blog Posts"}
          <span className="text-lg font-normal text-gray-500 ml-3">
            ({filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'})
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const colors = getCategoryColor(blog.category);
            const isExpanded = expandedCard === blog.id;
            const isHovered = hoveredCard === blog.id;
            
            return (
              <motion.div 
                key={blog.id} 
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(blog.id)}
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
                      <CardTitle className="text-xl font-bold">{blog.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isHovered 
                          ? 'bg-gradient-to-r ' + colors.gradientFrom + ' ' + colors.gradientTo + ' text-white' 
                          : colors.bg + ' ' + colors.text
                      }`}>
                        {blog.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      {isExpanded 
                        ? blog.content 
                        : `${blog.content.substring(0, 100)}${blog.content.length > 100 ? '...' : ''}`
                      }
                    </p>
                    
                    <div className="space-y-3">
                      {blog.featured && (
                        <div className="flex items-center text-sm">
                          <Tag size={16} className={`mr-2 ${isHovered ? 'text-violet-500' : 'text-gray-500'} transition-colors`} />
                          <span className="font-medium text-gray-700">Featured</span>
                        </div>
                      )}
                      {blog.readTime && (
                        <div className="flex items-center text-sm">
                          <Clock size={16} className={`mr-2 ${isHovered ? 'text-violet-500' : 'text-gray-500'} transition-colors`} />
                          <span className="font-medium text-gray-700">{blog.readTime} read</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        onClick={() => toggleCard(blog.id)}
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
                          Read Article
                        </div>
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium text-gray-500 mb-2">No blog posts found</h3>
              <p className="text-gray-400">
                {filter && searchQuery 
                  ? `No ${filter} posts match your search for "${searchQuery}".`
                  : filter 
                    ? `There are no ${filter} posts available at this time.` 
                    : searchQuery
                      ? `No posts match your search for "${searchQuery}".`
                      : 'There are no blog posts available.'
                }
              </p>
              {(filter || searchQuery) && (
                <button
                  onClick={() => {setFilter(null); setSearchQuery("");}}
                  className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-sm font-medium transition-colors"
                >
                  View all posts
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}