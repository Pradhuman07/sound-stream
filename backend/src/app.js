import express from 'express'
import authRoutes from './routes/auth.routes.js';
import songsRoutes from './routes/songs.routes.js';
import cookieParser from 'cookie-parser';  

const app = express()               // created an express app (server created)

app.use(express.json())             // middleware to parse (enable express to read) JSON data from request body
app.use(cookieParser())              // middleware to parse cookies from request

app.use('/auth', authRoutes)        // middleware to use auth routes
app.use('/songs', songsRoutes)      // middleware to use songs routes

export default app;