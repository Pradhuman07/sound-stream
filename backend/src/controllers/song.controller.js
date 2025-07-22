import { uploadAudioFileOnImageKit } from '../services/storage.service.js';
import songModel from '../models/song.model.js';

export async function uploadSong(req, res) {
    // console.log(req.file); // req.file contains the file uploaded by the user

    const audioFileFromImageKit = await uploadAudioFileOnImageKit(req.file, req.file.originalname);
    const { title, artist } = req.body;

    // console.log(audioFileFromImageKit);      // contains everything about the uploaded file i.e url + metadata
    // console.log(audioFileFromImageKit.url);  // we only need the url to store in the database

    const song = await songModel.create({
        title: title,
        artist: artist,
        audio: audioFileFromImageKit.url
    });

    res.status(201).json({
        message: "Song uploaded successfully",
        song
    })
}

export async function getAllSongs(req, res) {
    const songs = await songModel.find();

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });
}

export async function getSongById(req, res) {
    const { id } = req.params;

    try {
        const song = await songModel.findById(id);

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

export async function searchSongs(req, res) {
    const query = req.query.keyword;         // req.query is used to get the query parameters from the URL, so if we hit the endpoint with /search?keyword=love, then req.query.keyword will be 'love'

    // const songs = await songModel.find({
    //     title: {
    //         $regex: query,   
    //         $options: 'i'    // for case-insensitive search
    //     }
    // });
    // Note-1: if we don't use $regex, it will search for exact match only (but regex works for partial matches too)  
    // Note-2: Regex search is very slow (O(n) operation) that is why we uses atlas search for production apps   
    // query is the keyword we are searching for in the songs

    const songs = await songModel.find({
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