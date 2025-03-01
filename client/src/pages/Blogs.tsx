import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

// Define the Blog type locally to ensure consistency
interface Blog {
  id: string | number;
  title: string;
  content: string;
  category: string;
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

// Mock data for development and to prevent rendering issues
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "The Future of Wearable Tech",
    content: "Exploring how wearable technology is evolving and what we can expect in the coming years. From advanced health monitoring to augmented reality displays, the possibilities are expanding rapidly.",
    category: "Technology Trends",
  },
  {
    id: 2,
    title: "Building Sustainable Electronics",
    content: "How engineers are designing greener electronic devices with reduced environmental impact. This includes biodegradable materials, energy-efficient components, and circular design principles.",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "Introduction to Quantum Computing",
    content: "Understanding the basics of quantum computing and why it matters for future technologies. Learn about qubits, superposition, and how quantum computers could revolutionize fields from cryptography to drug discovery.",
    category: "Quantum Tech",
  },
  {
    id: 4,
    title: "The Rise of Open Source Hardware",
    content: "How open source hardware is democratizing innovation in electronics and empowering makers around the world to collaborate on groundbreaking projects.",
    category: "Open Source",
  },
  {
    id: 5,
    title: "AI in Electronics Manufacturing",
    content: "Exploring how artificial intelligence is transforming electronics manufacturing processes, improving quality control, and enabling more complex designs.",
    category: "AI & Automation",
  },
  {
    id: 6,
    title: "The Electronics Supply Chain Crisis",
    content: "Analyzing the ongoing challenges in the global electronics supply chain and strategies for building more resilient systems in the future.",
    category: "Industry News",
  },
];

export default function Blogs() {
  const [search, setSearch] = useState("");

  const { data: blogs = mockBlogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
    // Use mock data as fallback
    initialData: mockBlogs,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="animate-pulse space-y-8">
          <div className="max-w-sm h-10 bg-muted rounded"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="container py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        className="text-4xl font-bold mb-8"
        variants={itemVariants}
      >
        Blog Posts
      </motion.h1>

      <motion.div variants={itemVariants}>
        <Input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm mb-8"
        />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border hover:border-primary/30">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.content}
                  </p>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {blog.category}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div 
            variants={itemVariants}
            className="col-span-3 py-12 text-center"
          >
            <p className="text-lg text-muted-foreground">No blog posts found matching your search. Try a different keyword.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
