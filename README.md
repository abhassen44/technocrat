﻿# TechnoCrats

A powerful task tracking application built with a modern tech stack: **React (frontend)** and **Express (backend)**. Designed with developers in mind for seamless local development and hassle-free deployment to Vercel.

---

## 📂 Project Structure

This monorepo contains both client and server code:

```
/technocrat
├── client/       # React frontend
├── server/       # Express backend
├── package.json  # Root scripts & dependencies
```

---

## 🚀 Getting Started (Local Development)

```bash
# Install all dependencies
npm install

# Start both client and server in dev mode
npm run dev
```

> React app runs at: [http://localhost:5173](http://localhost:5173)
> API server runs at: [http://localhost:5000](http://localhost:5000)

---

## 🌍 Deploying to Vercel

### ✅ Prerequisites

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:

   ```bash
   vercel login
   ```

### 🚜 Deployment Steps

1. Link the project:

   ```bash
   vercel link
   ```

2. Set the required environment variables in the Vercel dashboard:

   | Key              | Description                         |
   | ---------------- | ----------------------------------- |
   | `MONGODB_URI`    | Your MongoDB connection string      |
   | `SESSION_SECRET` | A secure key for session encryption |
   | `NODE_ENV`       | `production`                        |
   | `CLIENT_URL`     | URL of your deployed frontend       |

3. Deploy:

   ```bash
   vercel --prod
   ```

---

## 🤔 Troubleshooting Deployment

If you face any issues, try the following:

1. **Build locally**:

   ```bash
   npm run build
   ```

2. **View logs**:

   ```bash
   vercel logs
   ```

3. **Run local build preview**:

   ```bash
   vercel build
   ```

4. **Set env vars inline**:

   ```bash
   vercel --env MONGODB_URI=xxx --env SESSION_SECRET=yyy
   ```

5. **Force redeploy**:

   ```bash
   vercel --force
   ```

---

## 🔍 Key Features

* ✅ Full-stack monorepo
* ✅ RESTful API with `/api` prefix
* ✅ Session-based Auth with Passport.js
* ✅ MongoDB session storage
* ✅ React 18.3.1 for enhanced compatibility
* ✅ Optimized for Vercel's serverless architecture

---

## 🌐 Live Demo

Add your deployed app link here (e.g., `https://tasktrackpro.vercel.app`)

---

## 📄 License

MIT License © [Your Name or Organization](https://github.com/abhassen44/technocrat)

---

## 🚀 Ready to contribute?

1. Fork the repo
2. Create your branch (`git checkout -b feature/feature-name`)
3. Commit your changes
4. Push and open a Pull Request

Happy Coding! ✨
