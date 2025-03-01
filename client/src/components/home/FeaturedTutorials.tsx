import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Define the Tutorial type locally to ensure consistency
interface Tutorial {
  id: string | number;
  title: string;
  description: string;
  level: string;
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
const mockTutorials: Tutorial[] = [
  {
    id: 1,
    title: "Getting Started with Arduino",
    description: "Learn how to set up your Arduino and build your first project",
    level: "Beginner",
    category: "Microcontrollers",
  },
  {
    id: 2,
    title: "Build a Smart Home Hub",
    description: "Create your own smart home control center with Raspberry Pi",
    level: "Intermediate",
    category: "IoT",
  },
  {
    id: 3,
    title: "Advanced PCB Design",
    description: "Master the art of creating professional circuit boards",
    level: "Advanced",
    category: "Electronics",
  },
];

export function FeaturedTutorials() {
  const { data: tutorials = mockTutorials, isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
    // Use mock data as fallback
    initialData: mockTutorials,
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
        Featured Tutorials
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.slice(0, 3).map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
          >
            <Link href={`/tutorials/${tutorial.id}`}>
              <Card className="h-full cursor-pointer transition-all duration-200 border hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="transition-colors duration-200 hover:text-primary">
                    {tutorial.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {tutorial.level}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                      {tutorial.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 