import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { connectDB } from "./db/connection";
import { setupAuth } from "./auth";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS support
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL || true
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Add logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Track connection status to avoid reconnecting on each request
let isDbConnected = false;
let isSetup = false;

// Setup the application
async function setupApp() {
  if (isSetup) return;
  
  // Connect to MongoDB if not already connected
  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  // Setup authentication
  setupAuth(app);

  // Register routes
  const server = await registerRoutes(app);

  // API routes should be registered before the error handler
  // Add a test route to verify API is working
  app.get('/api/status', (req, res) => {
    res.json({ 
      status: 'ok', 
      environment: process.env.NODE_ENV,
      dbConnected: isDbConnected
    });
  });

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Server error:', err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Development setup - only in development mode
  if (process.env.NODE_ENV !== 'production') {
    await setupVite(app, server);
  } else {
    // In production, serve static files from the dist directory
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const distPath = path.resolve(__dirname, '../../dist/public');
      console.log('Serving static files from:', distPath);
      
      app.use(express.static(distPath));
      
      // For client-side routing, send index.html for all non-API routes
      app.get('*', (req, res, next) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(distPath, 'index.html'));
        } else {
          next();
        }
      });
    } catch (error) {
      console.error('Error setting up static file serving:', error);
    }
  }
  
  isSetup = true;
  
  // For local development only - not used in Vercel
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
  }
  
  return app;
}

// For local development
setupApp();

// Handler for Vercel serverless
export default async function handler(req: Request, res: Response) {
  try {
    await setupApp();
    return app(req, res);
  } catch (error) {
    console.error('Serverless handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}