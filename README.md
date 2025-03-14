# TaskTrackPro

A task tracking application with a React frontend and Express backend.

## Project Structure

This project uses a monorepo structure with both client and server code in the same repository:

- Client-side React code is in the `src` directory
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

1. Create a new Vercel project and link it to your GitHub repository.

2. Set up the following environment variables in the Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`
   - `SESSION_SECRET`: A secure random string for session encryption
   - `CLIENT_URL`: The URL of your deployed application

3. Deploy the project:
   ```bash
   vercel
   ```

## Important Notes

- The project is configured to work with Vercel's serverless functions
- API routes are prefixed with `/api`
- Authentication is handled using Passport.js with MongoDB session storage
- Make sure to set up proper CORS and cookie settings for production

## License

MIT
