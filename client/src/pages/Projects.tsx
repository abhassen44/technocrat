import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Define the Project type locally to ensure consistency
interface Project {
  id: string | number;
  title: string;
  description: string;
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
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Smart Home Control Hub",
    description: "A central hub for controlling all your smart home devices using voice commands and mobile app.",
    category: "IoT",
  },
  {
    id: 2,
    title: "DIY Oscilloscope",
    description: "Build your own digital oscilloscope using affordable components and open-source software.",
    category: "Test Equipment",
  },
  {
    id: 3,
    title: "Solar-Powered Weather Station",
    description: "An energy-efficient weather station that collects and transmits environmental data.",
    category: "Environmental",
  },
  {
    id: 4,
    title: "Gesture-Controlled Robot",
    description: "A robot that responds to hand gestures captured by a camera system.",
    category: "Robotics",
  },
  {
    id: 5,
    title: "Custom Mechanical Keyboard",
    description: "Design and build your own mechanical keyboard with custom keycaps and switches.",
    category: "Input Devices",
  },
  {
    id: 6,
    title: "Portable Spectrum Analyzer",
    description: "A compact device for visualizing RF signals in the field.",
    category: "RF Engineering",
  },
];

export default function Projects() {
  const { data: projects = mockProjects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    // Use mock data as fallback
    initialData: mockProjects,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Project Showcase</h1>
        <div className="animate-pulse space-y-8">
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
        Project Showcase
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="h-full"
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border hover:border-primary/30">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {project.category}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
