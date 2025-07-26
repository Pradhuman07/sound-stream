import express from 'express';
import { uploadSongController, getAllSongsController, getSongByIdController, searchSongsController } from '../controllers/song.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from "multer";              // Express by default can not read file, so we use multer middleware to handle file uploads

const router = express.Router();

const storage = multer.memoryStorage();          // Memory storage means RAM. It is used to store files in memory temporarily, which is suitable for small files like audio clips.
const upload = multer({ storage: storage });     // Jb frontend se file upload hoti h to wo imagekit pe jaane se pehle server pe store hota h temporarily (jb tk imagekit pe successfully upload nhi hojata), so we use memoryStorage to store the file in server's memory(i.e RAM, since we don't need to store it permanently on the server and will not be as RAM is very expensive)........Kb tk rhegi server pe ? Jb tk hmari post wli API response nhi de deti, tab tk file server pe memory me store hoti h, jaise hi response milta h, file delete ho jati h memory se

// router.post('/upload', upload.single('audio'), uploadSong);   // Old version:Only taking audio upload and poster taking the default value from schema // upload.single('audio') means we are expecting a single file with the field name 'audio' in the request body(form).It is written before the controller function to handle the file upload before it reaches the controller.

router.post('/upload',                      // api
    authMiddleware,                        // middleware to check if user is authenticated
    upload.fields([                         // middleware ( multer middleware to handle multiple file uploads with field names 'audio' and 'poster')
        { name: 'audio', maxCount: 1 },
        { name: 'poster', maxCount: 1 }
    ]), 
    uploadSongController                           // controller
);   

router.get('/', authMiddleware, getAllSongsController);

router.get('/search', authMiddleware, searchSongsController);

router.get('/:id', authMiddleware, getSongByIdController);    // Note-2: This api should be written at the end of the file because it has a parameter ':id' which can match any string, so if we write it before the other routes, it will match all the requests and will not reach the other routes. So, we write it at the end to avoid this issue. // Note-1 This is a dynamic route, where :id is a placeholder for the song ID. It will match any URL like /song/12345, where 12345 is the song ID.          

export default router;