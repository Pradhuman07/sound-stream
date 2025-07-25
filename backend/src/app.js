import express from 'express'
import authRoutes from './routes/auth.routes.js';
import songRoutes from './routes/song.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/config.js';

const app = express()               // created an express app (server created)

// CORS configuration object
const corsOptions = {
    origin: config.FRONTEND_URL, // This is where your React app will run by default with Vite
    credentials: true,               // This allows cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods (Rest API methods)
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers ['Content-Type' is needed for sending JSON data & 'Authorization' will be needed for sending JWT token]
};

app.use(cors(corsOptions));         // Applies the CORS middleware with our configuration   // V. IMP> NOTE:- Must be placed BEFORE other middleware to ensure it handles requests first
app.use(express.json())             // middleware to parse (enable express to read) JSON data from request body
app.use(cookieParser())             // middleware to parse cookies from request

app.use('/auth', authRoutes)        // middleware to use auth routes
app.use('/song', songRoutes)      // middleware to use songs routes

export default app;