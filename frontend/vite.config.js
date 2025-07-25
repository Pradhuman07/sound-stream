import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {                                            // Proxy all /api requests to your backend server
      '/api': {
        target: 'http://localhost:3000',                // Your backend server URL
        changeOrigin: true,                             // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove /api prefix and write 'http://localhost:3000' when forwarding to backend
        secure: false,                                  // Allow insecure connections in development
      }
    }
  }
})

/*
How This Works:
• When your frontend makes a request to /api/auth/login
• Vite will proxy it to http://localhost:3000/auth/login
• This happens automatically and transparently
*/

/*
NOTE: For deployment, you won't need to change the Vite proxy configuration at all. Here's why:

1. The proxy configuration in vite.config.js is only used during development (when you run npm run dev).
2. When you deploy your frontend to Render:
    • The production build (npm run build) creates static files
    • These files don't use the Vite dev server or its proxy configuration
    • Instead, they'll make direct API calls to your backend URL

• In the next step, we'll create an API configuration file that will handle URLs differently for development and production. 
• It will look like : const API_URL = import.meta.env.VITE_API_URL || '/api';
Where:
      • In development: It uses /api which gets proxied by Vite to http://localhost:3000
      • In production: It uses the actual backend URL from environment variable VITE_API_URL

So to summarize: vite.config.js proxy settings: Only for development, no changes needed for deployment
*/

/*
Line 14:- The "secure" option is actually environment-dependent:

- In development (http://localhost): secure: false is fine because we're using HTTP
- In production (Render): secure should be true because you'll be using HTTPS

However, as I mentioned earlier, this entire proxy configuration in vite.config.js is only used during development. When you deploy to Render:

Your frontend will be served over HTTPS
Your backend will be served over HTTPS
The proxy configuration won't be used at all
*/