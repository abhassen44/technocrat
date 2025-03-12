import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useState } from "react";
import EventsLogo from "@/components/ui/EventsLogo";
import { Calendar, Clock, MapPin, Filter } from "lucide-react";

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

// Define color scheme for different event types
const eventTypeColors = {
  "Meetup": { bg: "bg-blue-100", text: "text-blue-700", hover: "hover:bg-blue-200" },
  "Hackathon": { bg: "bg-purple-100", text: "text-purple-700", hover: "hover:bg-purple-200" },
  "Workshop": { bg: "bg-green-100", text: "text-green-700", hover: "hover:bg-green-200" },
  "Competition": { bg: "bg-red-100", text: "text-red-700", hover: "hover:bg-red-200" },
  "Seminar": { bg: "bg-amber-100", text: "text-amber-700", hover: "hover:bg-amber-200" },
  "Conference": { bg: "bg-indigo-100", text: "text-indigo-700", hover: "hover:bg-indigo-200" },
  "default": { bg: "bg-gray-100", text: "text-gray-700", hover: "hover:bg-gray-200" }
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
  const [filter, setFilter] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
  
  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    // Use mock data to prevent rendering issues
    placeholderData: mockEvents,
  });

  // Get unique event types for filter
  const eventTypes = events ? Array.from(new Set(events.map(event => event.type))) : [];

  // Filter and sort events
  const filteredEvents = events 
    ? events.filter(event => filter ? event.type === filter : true)
    : [];
  
  // Sort events by date (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

  // Handle card toggle
  const toggleCard = (id: string | number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Get color for event type
  const getEventTypeColor = (type: string) => {
    return eventTypeColors[type as keyof typeof eventTypeColors] || eventTypeColors.default;
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section with EventsLogo */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-white">
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
            <p className="text-xl max-w-2xl">
              Stay up to date with the latest workshops, meetups, and conferences in the tech community.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-2">
            <Filter size={18} className="mr-2 text-gray-500" />
            <h3 className="font-medium">Filter by event type:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Events
            </button>
            {eventTypes.map((type) => {
              const colors = getEventTypeColor(type);
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === type 
                      ? 'bg-blue-600 text-white' 
                      : `${colors.bg} ${colors.text} ${colors.hover} `
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">
          {filter ? `${filter} Events` : "Upcoming Events"}
          <span className="text-lg font-normal text-gray-500 ml-3">
            ({sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'})
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => {
            const colors = getEventTypeColor(event.type);
            const isExpanded = expandedCard === event.id;
            
            return (
              <motion.div 
                key={event.id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`h-full border-l-4 transition-all duration-300 ${
                    isExpanded ? 'shadow-xl' : 'hover:shadow-md'
                  }`}
                  style={{ borderLeftColor: colors.text.replace('text-', '').replace('-700', '-500') }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {event.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={"${isDarkTheme ? 'text-gray-300' : 'text-gray-700} mb-4"}>
                      {isExpanded 
                        ? event.description 
                        : `${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}`
                      }
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar size={16} className="mr-2 text-gray-500" />
                        <span className="font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}">
                          {format(new Date(event.date), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                      
                  
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <button
                        onClick={() => toggleCard(event.id)}
                        className={`text-sm font-medium ${colors.text} hover:underline`}
                      >
                        {isExpanded ? 'Show less' : 'Show more'}
                      </button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                      >
                        Register
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {sortedEvents.length === 0 && (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-medium text-gray-500 mb-2">No events found</h3>
              <p className="text-gray-400">
                {filter ? `There are no ${filter} events scheduled at this time.` : 'There are no upcoming events.'}
              </p>
              {filter && (
                <button
                  onClick={() => setFilter(null)}
                  className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                >
                  View all events
                </button>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}