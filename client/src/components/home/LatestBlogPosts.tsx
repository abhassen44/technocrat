import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Define the Blog type locally to ensure consistency
interface Blog {
  id: string | number;
  title: string;
  content: string;
  category: string;
}

// Simplified animation variants for better performance
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
};

// Mock data for development and to prevent rendering issues
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

export function LatestBlogPosts() {
  const { data: blogs = mockBlogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
    // Use mock data as fallback
    initialData: mockBlogs,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted rounded w-1/4"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="h-64 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.h2 
        className="text-4xl font-bold tracking-tight text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Latest Blog Posts
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog, index) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
          >
            <Link href={`/blogs/${blog.id}`}>
              <Card className="h-full cursor-pointer transition-all duration-200 border hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="transition-colors duration-200 hover:text-primary">
                    {blog.title}
                  </CardTitle>
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
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 