import mongoose from 'mongoose';
import { seedDatabase } from './seed';

const MONGODB_URI = 'mongodb://localhost:27017/lastminuteengineers';

export async function connectDB() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log('Connected to MongoDB successfully');

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
    console.error('MongoDB connection error:', error);
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