import { motion, AnimatePresence } from "framer-motion";
import MerchLogo from "@/components/ui/MerchLogo";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Filter, Search, Tag, Sparkles, X, SlidersHorizontal, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "@/components/shop/CartContext";

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

// Types
interface MerchItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
  category: string;
  tags?: string[];
}

// Mock merchandise data
const merchItems: MerchItem[] = [
  {
    id: 1,
    title: "Circuit Board T-Shirt",
    description: "100% cotton t-shirt with a stylish circuit board pattern design.",
    price: 24.99,
    image: "/merch/tshirt.jpg",
    featured: true,
    category: "Clothing",
    tags: ["T-Shirt", "Cotton", "Unisex"]
  },
  {
    id: 2,
    title: "Arduino Starter Kit",
    description: "Complete starter kit with Arduino Uno, breadboard, components, and tutorial guide.",
    price: 49.99,
    image: "/merch/arduino-kit.jpg",
    featured: false,
    category: "Electronics",
    tags: ["Arduino", "DIY", "Educational"]
  },
  {
    id: 3,
    title: "Tech Enthusiast Hoodie",
    description: "Comfortable hoodie with embroidered tech design and kangaroo pocket.",
    price: 39.99,
    image: "/merch/hoodie.jpg",
    featured: true,
    category: "Clothing",
    tags: ["Hoodie", "Cotton", "Unisex"]
  },
  {
    id: 4,
    title: "Raspberry Pi 4 Kit",
    description: "Raspberry Pi 4 with case, power supply, and pre-loaded SD card.",
    price: 69.99,
    image: "/merch/raspberry-pi.jpg",
    featured: false,
    category: "Electronics",
    tags: ["Raspberry Pi", "DIY", "Starter Kit"]
  },
  {
    id: 5,
    title: "Electronics Lab Notebook",
    description: "Graph paper notebook perfect for circuit sketches and project notes.",
    price: 12.99,
    image: "/merch/notebook.jpg",
    featured: false,
    category: "Accessories",
    tags: ["Notebook", "Stationery", "Graph Paper"]
  },
  {
    id: 6,
    title: "Tech Sticker Pack",
    description: "Pack of 10 high-quality vinyl stickers featuring tech and programming themes.",
    price: 9.99,
    image: "/merch/stickers.jpg",
    featured: false,
    category: "Accessories",
    tags: ["Stickers", "Vinyl", "Laptop"]
  }
];

// Category color mapping
const categoryColors: Record<string, { bg: string, text: string, hover: string, border: string }> = {
  "Clothing": { 
    bg: "bg-blue-100", 
    text: "text-blue-700", 
    hover: "hover:bg-blue-200", 
    border: "border-blue-300" 
  },
  "Electronics": { 
    bg: "bg-emerald-100", 
    text: "text-emerald-700", 
    hover: "hover:bg-emerald-200", 
    border: "border-emerald-300" 
  },
  "Accessories": { 
    bg: "bg-amber-100", 
    text: "text-amber-700", 
    hover: "hover:bg-amber-200", 
    border: "border-amber-300" 
  },
  "default": { 
    bg: "bg-gray-100", 
    text: "text-gray-700", 
    hover: "hover:bg-gray-200", 
    border: "border-gray-300" 
  }
};

const ProductCard = ({ item }: { item: MerchItem }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = -(e.clientX - centerX) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  const categoryColor = categoryColors[item.category] || categoryColors.default;

  return (
    <motion.div
      className="h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotation}
      onClick={() => setExpanded(!expanded)}
      style={{
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/product/${item.id}`}>
        <motion.div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "all 0.15s ease"
          }}
        >
          <Card className={`h-full overflow-hidden border-0 bg-gradient-to-br from-background/80 to-background shadow-lg backdrop-blur-sm ${
            expanded ? 'shadow-xl ring-2 ring-primary/20' : ''
          } border-[0.5px] border-white/10`}>
            <div className={`h-2 w-full bg-gradient-to-r from-primary/70 to-primary`}></div>
            <div className="relative h-56 bg-gradient-to-br from-purple-500/5 to-blue-500/10 overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="w-full h-full flex items-center justify-center relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0"
                  animate={{ 
                    background: isHovered 
                      ? 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.15))' 
                      : 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.1))'
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <motion.span 
                    className="text-gray-400 text-sm"
                    animate={{ 
                      y: isHovered ? -5 : 0,
                      opacity: isHovered ? 0.7 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    [Product Image: {item.title}]
                  </motion.span>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-primary/60 text-xs font-medium"
                    >
                      Click to view details
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              {item.featured && (
                <motion.div 
                  className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs px-2 py-1 rounded-full flex items-center"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Star className="w-3 h-3 mr-1 fill-black" /> Featured
                </motion.div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center justify-between">
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {item.title}
                </span>
                <motion.span 
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"
                  style={{
                    textShadow: "0 0 15px rgba(16, 185, 129, 0.2)"
                  }}
                >
                  ₹{(item.price * 83).toFixed(0)}
                </motion.span>
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <motion.span 
                  className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text} border border-white/5`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {item.category}
                </motion.span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {expanded ? item.description : `${item.description.substring(0, 60)}${item.description.length > 60 ? '...' : ''}`}
              </p>
              
              {expanded && item.tags && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-2">
                    <Tag size={14} className="mr-1 text-primary/80" />
                    <span className="text-sm text-primary/80">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <motion.span 
                        key={tag} 
                        className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary/80 rounded-full text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full font-medium rounded-full relative overflow-hidden group"
                style={{
                  transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
                  transition: "transform 0.2s ease",
                  background: "linear-gradient(to right, rgb(126, 34, 206), rgb(79, 70, 229))"
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 z-0"
                  animate={{ 
                    x: isHovered ? "100%" : "0%",
                    opacity: isHovered ? 0 : 1
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-0 opacity-0"
                  animate={{ 
                    x: isHovered ? "0%" : "-100%",
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.span 
                  className="flex items-center justify-center relative z-10"
                  animate={{ y: isHovered ? -2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Learn More
                </motion.span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function Merch() {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  
  // Get unique categories
  const categories = Array.from(new Set(merchItems.map(item => item.category)));

  // Filter items based on category, search query, and featured status
  const filteredItems = merchItems.filter(item => {
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesFeatured = !featuredOnly || item.featured;
    
    return matchesCategory && matchesSearch && matchesFeatured;
  });

  // Get color for item category
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || categoryColors.default;
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-background to-background/80"
    >
      {/* Hero Section with MerchLogo */}
      <div className="bg-gradient-to-r from-violet-600/70 to-indigo-600/70 relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          style={{
            backgroundSize: '200% 200%',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <MerchLogo width={240} height={80} />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
              }}
            >
              Tech Merch Store
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Show your tech passion with our high-quality merchandise featuring electronics-inspired designs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                className="relative overflow-hidden rounded-full px-8 py-6 group"
                style={{
                  background: "linear-gradient(to right, rgb(126, 34, 206), rgb(79, 70, 229))"
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 z-0"
                  whileHover={{ 
                    x: "100%",
                    opacity: 0
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-0 opacity-0"
                  whileHover={{ 
                    x: "0%",
                    opacity: 1
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.span className="relative z-10 flex items-center text-lg font-medium">
                  {showFilters ? <X className="mr-2 h-5 w-5" /> : <Filter className="mr-2 h-5 w-5" />}
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filter Section - animated slide down when shown */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-b"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-full focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-6">
              {/* Category Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <Tag size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      categoryFilter === null 
                        ? 'bg-primary text-white' 
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
                            ? 'bg-primary text-white' 
                            : `${colors.bg} ${colors.text} ${colors.hover}`
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Featured Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <Star size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Featured:</span>
                </div>
                <button
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    featuredOnly 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {featuredOnly ? 'Featured Only' : 'Show All'}
                </button>
              </div>
              
              {/* Reset Filters Button */}
              {(categoryFilter !== null || searchQuery || featuredOnly) && (
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setCategoryFilter(null);
                      setSearchQuery('');
                      setFeaturedOnly(false);
                    }}
                    className="px-4 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full text-xs font-medium transition-colors flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {categoryFilter ? `${categoryFilter} Products` : featuredOnly ? "Featured Products" : "All Products"}
            <span className="text-lg font-normal text-blue-300/80 ml-3">
              ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
            </span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium flex items-center gap-2 transition-colors md:hidden"
          >
            <SlidersHorizontal size={16} />
            {showFilters ? 'Hide Filters' : 'Filters'}
          </motion.button>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <ProductCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium text-gray-500 mb-2">No products found</h3>
              <p className="text-gray-400">
                {searchQuery 
                  ? `No products match your search for "${searchQuery}"`
                  : categoryFilter 
                    ? `No ${categoryFilter} products found with the selected filters`
                    : 'No products match the selected filters'}
              </p>
              <button
                onClick={() => {
                  setCategoryFilter(null);
                  setSearchQuery("");
                  setFeaturedOnly(false);
                }}
                className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-colors"
              >
                Reset all filters
              </button>
            </motion.div>
          </div>
        )}
        
        {filteredItems.length > 0 && (
          <div className="mt-16 text-center">
            <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
              View All Products
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}