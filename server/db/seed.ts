import { Tutorial, Blog, Event, Project } from './models';

export async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([
      Tutorial.deleteMany({}),
      Blog.deleteMany({}),
      Event.deleteMany({}),
      Project.deleteMany({})
    ]);

    // Add sample tutorials
    await Tutorial.create([
      {
        title: "Getting Started with Arduino",
        description: "Learn the basics of Arduino programming",
        content: "Arduino is an open-source electronics platform...",
        level: "Beginner",
        category: "Arduino",
        imageUrl: "https://placehold.co/600x400"
      },
      {
        title: "Advanced Sensor Integration",
        description: "Master sensor integration with Arduino",
        content: "In this advanced tutorial, we'll explore...",
        level: "Advanced",
        category: "Sensors",
        imageUrl: "https://placehold.co/600x400"
      }
    ]);

    // Add sample blogs
    await Blog.create([
      {
        title: "Latest Trends in IoT",
        content: "The Internet of Things (IoT) continues to evolve...",
        category: "IoT",
        imageUrl: "https://placehold.co/600x400"
      },
      {
        title: "Understanding Microcontrollers",
        content: "Microcontrollers are the heart of embedded systems...",
        category: "Electronics",
        imageUrl: "https://placehold.co/600x400"
      }
    ]);

    // Add sample events
    await Event.create([
      {
        title: "Arduino Workshop 2024",
        description: "Hands-on workshop for Arduino enthusiasts",
        date: new Date("2024-06-15"),
        type: "Workshop"
      },
      {
        title: "IoT Conference",
        description: "Annual IoT developers conference",
        date: new Date("2024-07-20"),
        type: "Conference"
      }
    ]);

    // Add sample projects
    await Project.create([
      {
        title: "Smart Home Automation",
        description: "A DIY project for home automation using Arduino",
        imageUrl: "https://placehold.co/600x400",
        category: "IoT"
      },
      {
        title: "Weather Station",
        description: "Build your own weather monitoring station",
        imageUrl: "https://placehold.co/600x400",
        category: "Sensors"
      }
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
