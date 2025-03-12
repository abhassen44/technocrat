import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Layers, Tag, ExternalLink, Search, Filter, Sparkles } from "lucide-react";
import ProjectsLogo from "@/components/ui/ProjectsLogo";

// Define the Project type locally to ensure consistency
interface Project {
  id: string | number;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  image?: string;
  tags?: string[];
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

// Define color scheme for different project categories
const categoryColors = {
  "IoT": { bg: "bg-emerald-100", text: "text-emerald-700", hover: "hover:bg-emerald-200", border: "border-emerald-300" },
  "Test Equipment": { bg: "bg-amber-100", text: "text-amber-700", hover: "hover:bg-amber-200", border: "border-amber-300" },
  "Environmental": { bg: "bg-teal-100", text: "text-teal-700", hover: "hover:bg-teal-200", border: "border-teal-300" },
  "Robotics": { bg: "bg-violet-100", text: "text-violet-700", hover: "hover:bg-violet-200", border: "border-violet-300" },
  "Input Devices": { bg: "bg-rose-100", text: "text-rose-700", hover: "hover:bg-rose-200", border: "border-rose-300" },
  "RF Engineering": { bg: "bg-sky-100", text: "text-sky-700", hover: "hover:bg-sky-200", border: "border-sky-300" },
  "default": { bg: "bg-gray-100", text: "text-gray-700", hover: "hover:bg-gray-200", border: "border-gray-300" }
};

// Difficulty labels with corresponding colors
const difficultyLabels = {
  "Beginner": { bg: "bg-green-100", text: "text-green-700" },
  "Intermediate": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "Advanced": { bg: "bg-red-100", text: "text-red-700" },
  "default": { bg: "bg-gray-100", text: "text-gray-700" }
};

// Mock data for development and to prevent rendering issues
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Smart Home Control Hub",
    description: "A central hub for controlling all your smart home devices using voice commands and mobile app.",
    category: "IoT",
    difficulty: "Intermediate",
    tags: ["Arduino", "Raspberry Pi", "WiFi"]
  },
  {
    id: 2,
    title: "DIY Oscilloscope",
    description: "Build your own digital oscilloscope using affordable components and open-source software.",
    category: "Test Equipment",
    difficulty: "Advanced",
    tags: ["Signal Processing", "Display", "Microcontroller"]
  },
  {
    id: 3,
    title: "Solar-Powered Weather Station",
    description: "An energy-efficient weather station that collects and transmits environmental data.",
    category: "Environmental",
    difficulty: "Intermediate",
    tags: ["Solar", "Sensors", "Wireless"]
  },
  {
    id: 4,
    title: "Gesture-Controlled Robot",
    description: "A robot that responds to hand gestures captured by a camera system.",
    category: "Robotics",
    difficulty: "Advanced",
    tags: ["Computer Vision", "Motors", "AI"]
  },
  {
    id: 5,
    title: "Custom Mechanical Keyboard",
    description: "Design and build your own mechanical keyboard with custom keycaps and switches.",
    category: "Input Devices",
    difficulty: "Beginner",
    tags: ["3D Printing", "Switches", "PCB Design"]
  },
  {
    id: 6,
    title: "Portable Spectrum Analyzer",
    description: "A compact device for visualizing RF signals in the field.",
    category: "RF Engineering",
    difficulty: "Advanced",
    tags: ["SDR", "Display", "Battery Powered"]
  },
];

export default function Projects() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects = mockProjects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    // Use mock data as fallback
    initialData: mockProjects,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Get unique categories and difficulty levels for filters
  const categories = Array.from(new Set(projects.map(project => project.category)));
  const difficultyLevels = Array.from(new Set(projects.map(project => project.difficulty).filter(Boolean)));

  // Filter projects based on category, difficulty, and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    const matchesDifficulty = !difficultyFilter || project.difficulty === difficultyFilter;
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Project Showcase</h1>
        <ProjectsLogo />
        
      </div>
    );
  }

  // Handle card toggle
  const toggleCard = (id: string | number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Get color for project category
  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  };

  // Get color for difficulty level
  const getDifficultyColor = (difficulty: string = "") => {
    return difficultyLabels[difficulty as keyof typeof difficultyLabels] || difficultyLabels.default;
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Sparkles size={48} strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Showcase</h1>
            <p className="text-xl max-w-2xl">
              Explore our collection of innovative DIY electronics projects to inspire your next build.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <Filter size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      categoryFilter === null 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => {
                    const colors = getCategoryColor(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          categoryFilter === category 
                            ? 'bg-teal-600 text-white' 
                            : `${colors.bg} ${colors.text} ${colors.hover}`
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Layers size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Difficulty:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDifficultyFilter(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      difficultyFilter === null 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  {difficultyLevels.map((difficulty) => {
                    if (!difficulty) return null;
                    const colors = getDifficultyColor(difficulty);
                    return (
                      <button
                        key={difficulty}
                        onClick={() => setDifficultyFilter(difficulty)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          difficultyFilter === difficulty 
                            ? 'bg-teal-600 text-white' 
                            : `${colors.bg} ${colors.text} hover:bg-opacity-80`
                        }`}
                      >
                        {difficulty}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">
          {categoryFilter ? `${categoryFilter} Projects` : "All Projects"}
          <span className="text-lg font-normal text-gray-500 ml-3">
            ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
          </span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const categoryColor = getCategoryColor(project.category);
            const difficultyColor = project.difficulty ? getDifficultyColor(project.difficulty) : null;
            const isExpanded = expandedCard === project.id;
            
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card 
                  className={`h-full cursor-pointer overflow-hidden transform transition-all duration-300 ${
                    isExpanded ? 'shadow-xl' : 'shadow hover:shadow-xl'
                  } ${categoryColor.border}`}
                  onClick={() => toggleCard(project.id)}
                >
                  {/* Top colored bar based on category */}
                  <div className={`h-2 w-full ${categoryColor.text.replace('text', 'bg').replace('-700', '-500')}`}></div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl group-hover:text-teal-600 transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
                        {project.category}
                      </span>
                      
                      {project.difficulty && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor?.bg} ${difficultyColor?.text}`}>
                          {project.difficulty}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {isExpanded 
                        ? project.description 
                        : `${project.description.substring(0, 90)}${project.description.length > 90 ? '...' : ''}`
                      }
                    </p>
                    
                    {isExpanded && project.tags && (
                      <div className="mt-4">
                        <div className="flex items-center mb-2">
                          <Tag size={14} className="mr-1 text-gray-500" />
                          <span className="text-sm text-gray-600">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className={`mt-4 flex justify-${isExpanded ? 'between' : 'end'} items-center`}>
                      {isExpanded && (
                        <button className="text-sm text-gray-500">
                          {isExpanded ? 'Click to collapse' : ''}
                        </button>
                      )}
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // This would link to project details
                        }}
                        className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>View Project</span>
                        <ExternalLink size={14} />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium text-gray-500 mb-2">No projects found</h3>
              <p className="text-gray-400">
                {searchQuery 
                  ? `No projects match your search for "${searchQuery}"`
                  : categoryFilter 
                    ? `No ${categoryFilter} projects found with the selected filters`
                    : 'No projects match the selected filters'}
              </p>
              <button
                onClick={() => {
                  setCategoryFilter(null);
                  setDifficultyFilter(null);
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                Reset all filters
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}