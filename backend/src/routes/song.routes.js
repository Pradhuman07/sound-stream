import express from 'express';
import { uploadSong, getAllSongs, getSongById, searchSongs } from '../controllers/song.controller.js';
import multer from "multer";              // Express by default can not read file, so we use multer middleware to handle file uploads
import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const storage = multer.memoryStorage();          // Memory storage means RAM. It is used to store files in memory temporarily, which is suitable for small files like audio clips.
const upload = multer({ storage: storage });     // Jb frontend se file upload hoti h to wo imagekit pe jaane se pehle server pe store hota h temporarily (jb tk imagekit pe successfully upload nhi hojata), so we use memoryStorage to store the file in server's memory(i.e RAM, since we don't need to store it permanently on the server and will not be as RAM is very expensive)........Kb tk rhegi server pe ? Jb tk hmari post wli API response nhi de deti, tab tk file server pe memory me store hoti h, jaise hi response milta h, file delete ho jati h memory se

router.use((req, res, next) => {        // middleware to make all the below routes protected, so that only logged in users can access them

    const token = req.cookies.token;    // This line is used to get the token from the cookies in the request. It is used for authentication and authorization purposes.

    if (!token) {                       // If token is not present, return 401 Unauthorized status code with a message.
        return res.status(401).json({
            message: 'Unauthorized: No token found in cookies'
        });
    }

    // if token is present, we verify it using jwt.verify() method. This method takes the token and the secret key as arguments and returns the decoded payload if the token is valid.
    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);  // Verify the token using the secret key. If the token is valid, it will return the decoded payload. [Decoded Payload Content: The payload typically contains:User information (id, email, etc.), token metadata (expiration time, issued time) etc.]
        req.user = decoded;                                    // If the token is valid, we attach the decoded user information to the request object for further use in the route handlers.
        next();                                                // Call the next middleware or route handler(controller) automatically if the token is valid.
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });                             // If the token is invalid or expired, return 401 Unauthorized status code with a message.
    }

    // Note:- if token is invalid or expired, it will throw an error, that is why it is necessary to use try and catch here.
})

router.post('/upload', upload.single('audio'), uploadSong);   // upload.single('audio') means we are expecting a single file with the field name 'audio' in the request body(form).It is written before the controller function to handle the file upload before it reaches the controller.
router.get('/', getAllSongs);
router.get('/search', searchSongs);
router.get('/:id', getSongById);    // Note-2: This api should be written at the end of the file because it has a parameter ':id' which can match any string, so if we write it before the other routes, it will match all the requests and will not reach the other routes. So, we write it at the end to avoid this issue. // Note-1 This is a dynamic route, where :id is a placeholder for the song ID. It will match any URL like /song/12345, where 12345 is the song ID.          

export default router;