import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";

// Define the Tutorial type locally to ensure consistency
interface Tutorial {
  id: string | number;
  title: string;
  description: string;
  level: string;
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
  {
    id: 4,
    title: "Basic Electronics 101",
    description: "Introduction to electronic components and circuit design",
    level: "Beginner",
    category: "Electronics",
  },
  {
    id: 5,
    title: "Programming ESP32 Microcontrollers",
    description: "Learn how to program the powerful ESP32 platform",
    level: "Intermediate",
    category: "Microcontrollers",
  },
  {
    id: 6,
    title: "Advanced Sensor Networks",
    description: "Building complex sensor networks for data collection",
    level: "Advanced",
    category: "IoT",
  },
];

export default function Tutorials() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const { data: tutorials = mockTutorials, isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
    // Use mock data as fallback
    initialData: mockTutorials,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLevel = level === "all" || tutorial.level === level;
    return matchesSearch && matchesLevel;
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Tutorials</h1>
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
        Tutorials
      </motion.h1>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-8"
        variants={itemVariants}
      >
        <Input
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border hover:border-primary/30">
                <CardHeader>
                  <CardTitle>{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {tutorial.level}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                      {tutorial.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div 
            variants={itemVariants}
            className="col-span-3 py-12 text-center"
          >
            <p className="text-lg text-muted-foreground">No tutorials found matching your criteria. Try adjusting your filters.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}