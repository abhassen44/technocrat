# TaskTrackPro

A task tracking application with a React frontend and Express backend.

## Project Structure

This project uses a monorepo structure with both client and server code in the same repository:

- Client-side React code is in the `client` directory
- Server-side Express code is in the `server` directory

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will run on http://localhost:5173 with the API server on http://localhost:5000.

## Deployment to Vercel

### Prerequisites

1. Make sure you have the Vercel CLI installed:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

### Deployment Steps

1. Create a new Vercel project and link it to your GitHub repository:
   ```bash
   vercel link
   ```

2. Set up the following environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`
   - `SESSION_SECRET`: A secure random string for session encryption
   - `CLIENT_URL`: The URL of your deployed application

3. Deploy the project:
   ```bash
   vercel --prod
   ```

### Troubleshooting Deployment Issues

If you encounter deployment issues, try the following:

1. **Build locally first**:
   ```bash
   npm run build
   ```
   Check for any build errors and fix them before deploying.

2. **Check Vercel logs**:
   ```bash
   vercel logs
   ```
   This will show you detailed logs of your deployment.

3. **Inspect the build output**:
   ```bash
   vercel build
   ```
   This will run the build process locally and show you any issues.

4. **Override environment variables**:
   ```bash
   vercel --env MONGODB_URI=your-mongodb-uri --env SESSION_SECRET=your-secret
   ```

5. **Force a clean deployment**:
   ```bash
   vercel --force
   ```

## Important Notes

- The project is configured to work with Vercel's serverless functions
- API routes are prefixed with `/api`
- Authentication is handled using Passport.js with MongoDB session storage
- Make sure to set up proper CORS and cookie settings for production
- React version is set to 18.3.1 to avoid compatibility issues

## License

MIT
