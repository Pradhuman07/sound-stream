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
}, { timestamps: true })  // This will add createdAt and updatedAt fields automatically

const songModel = mongoose.model("songs", songSchema);

export default songModel;