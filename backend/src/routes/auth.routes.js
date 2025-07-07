import express from 'express';
import {registerUser, loginUser} from '../controllers/auth.controller.js';  // make sure to use {} to import named exports

const router = express.Router();

router.post('/register', registerUser)      // "/register" & not just "register" // Otherwise error while sending request from frontend , error->Cannot POST /register
router.post('/login', loginUser)


export default router;


// Routes are like the paths in your app.
// They tell the server what to do when someone visits a specific URL.

// Tip :- Whenever you create route.js file, just do 4 things:
            // 1. Import express
            // 2. Create a router using express.Router()
            // 3. Export the router at the end of the file

            // 4. Then create routes (with their methods like get, post, put, delete etc. &&&&& route name and controller as arguments.)