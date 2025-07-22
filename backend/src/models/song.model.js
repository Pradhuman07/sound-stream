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
        default: "https://downloadr2.apkmirror.com/wp-content/uploads/2023/05/48/646f71798f43f.png",
    }
})

const songModel = mongoose.model("songs", songSchema);

export default songModel;