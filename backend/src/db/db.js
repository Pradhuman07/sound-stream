import mongoose from "mongoose";

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/sound-stream")
    .then(()=>{
        console.log("connected to MongoDB");        
    })
    .catch((err)=>{
        console.log("error connecting MongoDB" , err);        
    })
}

export default connectDB;