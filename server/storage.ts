import { Tutorial, Blog, Event, Project } from './db/models';

export interface IStorage {
  getTutorials(): Promise<any[]>;
  getTutorialById(id: string): Promise<any | undefined>;
  getBlogs(): Promise<any[]>;
  getBlogById(id: string): Promise<any | undefined>;
  getEvents(): Promise<any[]>;
  getProjects(): Promise<any[]>;
}

export class MongoDBStorage implements IStorage {
  async getTutorials() {
    return await Tutorial.find().lean();
  }

  async getTutorialById(id: string) {
    return await Tutorial.findById(id).lean();
  }

  async getBlogs() {
    return await Blog.find().lean();
  }

  async getBlogById(id: string) {
    return await Blog.findById(id).lean();
  }

  async getEvents() {
    return await Event.find().lean();
  }

  async getProjects() {
    return await Project.find().lean();
  }
}

export const storage = new MongoDBStorage();