import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-512x512-maskable.png'],
      devOptions: {
        enabled: true // Enable PWA in development
      },
      manifest: {
        name: 'SoundStream',
        short_name: 'SoundStream',
        description: 'A modern music streaming application with offline capabilities',
        theme_color: '#1f2937',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/?source=pwa',
        categories: ['music', 'entertainment'],
        lang: 'en',
        dir: 'ltr',
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'Play Music',
            short_name: 'Play',
            description: 'Start playing music',
            url: '/?shortcut=play',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Search Songs',
            short_name: 'Search',
            description: 'Search for songs',
            url: '/search?shortcut=search',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5173,
    proxy: {                                            // Proxy all /api requests to your backend server
      '/api': {
        target: 'http://localhost:3000',                // Your backend server URL
        changeOrigin: true,                             // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove /api prefix and write 'http://localhost:3000' when forwarding to backend
        secure: false,                                  // Allow insecure connections in development
      }
    }
  },
  preview: {
    host: '0.0.0.0', // Allow external connections for preview
    port: 4173
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