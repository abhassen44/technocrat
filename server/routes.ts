import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import mongoose from "mongoose";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok',
      database: dbStatus
    });
  });

  app.get("/api/tutorials", async (_req, res) => {
    const tutorials = await storage.getTutorials();
    res.json(tutorials);
  });

  app.get("/api/tutorials/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const tutorial = await storage.getTutorialById(req.params.id);
    if (!tutorial) {
      res.status(404).json({ message: "Tutorial not found" });
      return;
    }
    res.json(tutorial);
  });

  app.get("/api/blogs", async (_req, res) => {
    const blogs = await storage.getBlogs();
    res.json(blogs);
  });

  app.get("/api/blogs/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    const blog = await storage.getBlogById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(blog);
  });

  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Add a simple test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working correctly!' });
  });

  const httpServer = createServer(app);
  return httpServer;
}