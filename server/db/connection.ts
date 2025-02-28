import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedDatabase } from './seed';

// Load environment variables
dotenv.config();

// Validate required environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const SEED_DB = process.env.SEED_DB || 'false'; // Default to 'false' if not set

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI environment variable is not defined. Make sure you have a .env file in the server directory.');
}

export async function connectDB() {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');

    await mongoose.connect(MONGODB_URI!);

    console.log('✅ Connected to MongoDB Atlas successfully');

    // Seed database in development mode
    if (process.env.NODE_ENV !== 'production' && SEED_DB === 'true') {
      try {
        await seedDatabase();
        console.log('🌱 Database seeded successfully');
      } catch (error) {
        console.error('❌ Error seeding database:', error);
      }
    }
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
}

// MongoDB event listeners for better debugging
mongoose.connection.on('error', (err) => console.error('⚠️ MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...'));
mongoose.connection.on('connected', () => console.log('🔗 MongoDB connected'));
mongoose.connection.on('reconnected', () => console.log('🔄 MongoDB reconnected'));
mongoose.connection.on('close', () => console.log('❌ MongoDB connection closed'));
