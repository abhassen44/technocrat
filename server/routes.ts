import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tutorials", async (_req, res) => {
    const tutorials = await storage.getTutorials();
    res.json(tutorials);
  });

  app.get("/api/tutorials/:id", async (req, res) => {
    const tutorial = await storage.getTutorialById(Number(req.params.id));
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
    const blog = await storage.getBlogById(Number(req.params.id));
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

  const httpServer = createServer(app);
  return httpServer;
}
