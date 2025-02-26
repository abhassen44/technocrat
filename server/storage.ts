import { 
  type Tutorial, type Blog, type Event, type Project,
  type InsertTutorialSchema, type InsertBlogSchema,
  type InsertEventSchema, type InsertProjectSchema
} from "@shared/schema";

export interface IStorage {
  getTutorials(): Promise<Tutorial[]>;
  getTutorialById(id: number): Promise<Tutorial | undefined>;
  getBlogs(): Promise<Blog[]>;
  getBlogById(id: number): Promise<Blog | undefined>;
  getEvents(): Promise<Event[]>;
  getProjects(): Promise<Project[]>;
}

const mockTutorials: Tutorial[] = [
  {
    id: 1,
    title: "Getting Started with Arduino",
    description: "Learn the basics of Arduino programming",
    content: "Arduino is an open-source electronics platform...",
    level: "Beginner",
    category: "Arduino",
    imageUrl: "https://placehold.co/600x400"
  },
  // Add more mock tutorials
];

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Latest Trends in IoT",
    content: "The Internet of Things (IoT) continues to evolve...",
    category: "IoT",
    imageUrl: "https://placehold.co/600x400"
  },
  // Add more mock blogs
];

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Arduino Workshop 2024",
    description: "Hands-on workshop for Arduino enthusiasts",
    date: new Date("2024-06-15"),
    type: "Workshop"
  },
  // Add more mock events
];

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Smart Home Automation",
    description: "A DIY project for home automation using Arduino",
    imageUrl: "https://placehold.co/600x400",
    category: "IoT"
  },
  // Add more mock projects
];

export class MemStorage implements IStorage {
  async getTutorials(): Promise<Tutorial[]> {
    return mockTutorials;
  }

  async getTutorialById(id: number): Promise<Tutorial | undefined> {
    return mockTutorials.find(t => t.id === id);
  }

  async getBlogs(): Promise<Blog[]> {
    return mockBlogs;
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    return mockBlogs.find(b => b.id === id);
  }

  async getEvents(): Promise<Event[]> {
    return mockEvents;
  }

  async getProjects(): Promise<Project[]> {
    return mockProjects;
  }
}

export const storage = new MemStorage();
