import mongoose from 'mongoose';
import { seedDatabase } from './seed';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log('Connected to MongoDB Atlas successfully');

    // Seed database in development mode
    if (process.env.NODE_ENV !== 'production') {
      try {
        await seedDatabase();
        console.log('Database seeded successfully');
      } catch (error) {
        console.error('Error seeding database:', error);
      }
    }
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error);
    process.exit(1);
  }
}

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});