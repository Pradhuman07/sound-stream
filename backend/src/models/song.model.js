import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    audio: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true
    }
})

const songModel = mongoose.model("songs", songSchema);

export default songModel;