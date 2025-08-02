import express from 'express'
import authRoutes from './routes/auth.routes.js';
import songRoutes from './routes/song.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.js';

const app = express()               // created an express app (server created)

// CORS configuration object
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Environment-specific allowed origins
        const allowedOrigins = process.env.NODE_ENV === 'production' 
            ? [config.FRONTEND_URL].filter(Boolean)  // Production: only frontend URL from environment
            : [
                config.FRONTEND_URL,
                'http://localhost:3000',  // For local development
                'http://localhost:5173',  // For Vite dev server
                'http://localhost:4173',  // For Vite preview
                'http://10.45.115.129:5173', // Your network IP
                'http://127.0.0.1:5173'   // Alternative localhost
              ].filter(Boolean);
        
        // In development, also allow any local network IP with port 5173
        const isLocalNetworkOrigin = process.env.NODE_ENV === 'development' && 
                                   origin && 
                                   (origin.includes(':5173') || origin.includes(':3000') || origin.includes(':4173')) &&
                                   (origin.startsWith('http://localhost') || 
                                    origin.startsWith('http://127.0.0.1') || 
                                    origin.match(/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/) ||
                                    origin.match(/^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/));
        
        if (allowedOrigins.includes(origin) || isLocalNetworkOrigin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,               // This allows cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods (Rest API methods)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers ['Content-Type' is needed for sending JSON data & 'Authorization' will be needed for sending JWT token]
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));         // Applies the CORS middleware with our configuration   // V. IMP> NOTE:- Must be placed BEFORE other middleware to ensure it handles requests first
app.use(express.json())             // middleware to parse (enable express to read) JSON data from request body
app.use(cookieParser())             // middleware to parse cookies from request

app.use('/auth', authRoutes)        // middleware to use auth routes
app.use('/song', songRoutes)      // middleware to use songs routes

export default app;