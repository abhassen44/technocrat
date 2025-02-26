import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  level: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true }
});

export const Tutorial = mongoose.model('Tutorial', tutorialSchema);
export const Blog = mongoose.model('Blog', blogSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Project = mongoose.model('Project', projectSchema);
