import songModel from "../models/song.model.js";

export async function uploadSong(songData) {
    return await songModel.create(songData);
}

export async function getAllSongs() {
    return await songModel.find().sort({ createdAt: -1 });  // -1 for descending order (newest first)
}

export async function searchSongs(query) {
    return await songModel.find(query);
}

export async function getSongById(songId) {
    return await songModel.findById(songId);
}