import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import EventsLogo from "@/components/ui/EventsLogo";

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
    description: "Learn how to build and program IoT devices using ESP32 and Arduino.",
    date: "2023-12-05",
    type: "Workshop",
  },
  {
    id: 4,
    title: "Robotics Competition",
    description: "Watch teams compete in building and programming robots for various challenges.",
    date: "2024-01-15",
    type: "Competition",
  },
  {
    id: 5,
    title: "AI in Electronics Seminar",
    description: "Discover how artificial intelligence is transforming the electronics industry.",
    date: "2023-12-20",
    type: "Seminar",
  },
  {
    id: 6,
    title: "Circuit Design Workshop",
    description: "Hands-on workshop on designing and building electronic circuits.",
    date: "2024-01-10",
    type: "Workshop",
  },
];

// Fetch events from API
const fetchEvents = async (): Promise<Event[]> => {
  // In a real app, you would fetch from an API
  // const response = await fetch('/api/events');
  // return response.json();
  
  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 1000);
  });
};

export default function Events() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    // Use mock data to prevent rendering issues
    placeholderData: mockEvents,
  });

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
          <h2 className="text-2xl font-bold">Error loading events</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }

  // Sort events by date (most recent first)
  const sortedEvents = events ? [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ) : [];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section with EventsLogo */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <EventsLogo width={220} height={70} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Events Calendar</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Stay up to date with the latest workshops, meetups, and conferences in the tech community.
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      {event.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Date: </span>
                    <span className="ml-2">{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
