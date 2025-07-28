import { uploadAudioFileOnImageKit, uploadPosterFileOnImageKit } from '../services/storage.service.js';
import { getSongById, getAllSongs, uploadSong, searchSongs } from '../dao/song.dao.js'; 
import config from '../config/config.js';

// export async function uploadSong(req, res) {        // Old version:- Only audio file upload, poster -> default value as provided in the schema/model

//     // console.log(req.file); // req.file contains the file uploaded by the user
//     // console.log(audioFileFromImageKit);      // contains everything about the uploaded file i.e url + metadata
//     // console.log(audioFileFromImageKit.url);  // we only need the url to store in the database

//     const audioFileFromImageKit = await uploadAudioFileOnImageKit(req.file, req.file.originalname);
//     const { title, artist } = req.body;

//     const song = await songModel.create({
//         title: title,
//         artist: artist,
//         audio: audioFileFromImageKit.url
//     });

//     res.status(201).json({
//         message: "Song uploaded successfully",
//         song
//     })
// }

// req.file contains the file uploaded by the user
// "audioFileFromImageKit" contains everything about the uploaded file i.e url + metadata
// but we only need the url to store in the database, i.e why we use audioFileFromImageKit.url to store in the database

export async function uploadSongController(req, res) {
    const { title, artist, securityPin } = req.body;

    // Verify security pin
    if (!securityPin || securityPin !== config.UPLOAD_SECURITY_PIN) {
        return res.status(403).json({
            message: "Invalid security pin"
        });
    }

    if (!req.files || !req.files.audio || !req.files.poster) {  
        return res.status(400).json({
            message: "Both audio and poster files are required"
        });
    }

    const audioFileFromImageKit = await uploadAudioFileOnImageKit(req.files.audio[0], req.files.audio[0].originalname);     
    const posterFileFromImageKit = await uploadPosterFileOnImageKit(req.files.poster[0], req.files.poster[0].originalname);

    const song = await uploadSong({
        title: title,
        artist: artist,
        audio: audioFileFromImageKit.url,
        poster: posterFileFromImageKit.url
    });

    res.status(201).json({
        message: "Song uploaded successfully",
        song
    })
}

export async function getAllSongsController(req, res) {
    const songs = await getAllSongs();

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });
}

export async function searchSongsController(req, res) {
    const query = req.query.keyword;         // req.query is used to get the query parameters from the URL, so if we hit the endpoint with /search?keyword=love, then req.query.keyword will be 'love'

    // const songs = await songModel.find({     // searching for songs with title only
    //     title: {
    //         $regex: query,   
    //         $options: 'i'    // for case-insensitive search
    //     }
    // });
    // Note-1: if we don't use $regex, it will search for exact match only (but regex works for partial matches too)  
    // Note-2: Regex search is very slow (O(n) operation) that is why we uses atlas search for production apps   
    // query is the keyword we are searching for in the songs

    const songs = await searchSongs({        // searching for songs with both title and artist
        $or: [
            {
                title: {
                    $regex: query,   // Search in title field
                    $options: 'i'    // case-insensitive search
                }
            },
            {
                artist: {
                    $regex: query,   // Search in artist field
                    $options: 'i'    // case-insensitive search
                }
            }
        ]
    })

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });
}

export async function getSongByIdController(req, res) {
    const { id } = req.params;

    try {
        const song = await getSongById(id);

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        res.status(200).json({
            message: "Song fetched successfully",
            song
        });
    }

    catch (error) {     // This will handle invalid ObjectId format
        return res.status(400).json({
            message: "Invalid song ID format"
        });
    }
}