import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Define the Event type locally to ensure consistency
interface Event {
  id: string | number;
  title: string;
  description: string;
  date: string;
  type: string;
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
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Meetup 2023",
    description: "Join us for a day of tech talks, workshops, and networking with industry experts.",
    date: "2023-12-15",
    type: "Meetup",
  },
  {
    id: 2,
    title: "Electronics Hackathon",
    description: "Build innovative electronic projects in 48 hours and compete for prizes.",
    date: "2023-11-20",
    type: "Hackathon",
  },
  {
    id: 3,
    title: "IoT Workshop",
    description: "Hands-on workshop to learn about Internet of Things and how to build connected devices.",
    date: "2023-10-05",
    type: "Workshop",
  },
  {
    id: 4,
    title: "Robotics Competition",
    description: "Annual robotics competition featuring teams from around the country competing in various challenges.",
    date: "2023-12-10",
    type: "Competition",
  },
  {
    id: 5,
    title: "Tech Career Fair",
    description: "Meet top employers in the tech industry and explore job opportunities.",
    date: "2023-11-15",
    type: "Career Fair",
  },
  {
    id: 6,
    title: "Open Source Hardware Summit",
    description: "A gathering of open source hardware enthusiasts, creators, and companies.",
    date: "2024-01-20",
    type: "Summit",
  },
];

export default function Events() {
  const { data: events = mockEvents, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    // Use mock data as fallback
    initialData: mockEvents,
    // Disable refetching temporarily to prevent rendering issues
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Sort events by date (upcoming first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
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
        Upcoming Events
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={itemVariants}
            className="h-full"
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border hover:border-primary/30">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {format(new Date(event.date), "MMMM d, yyyy")}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                    {event.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
