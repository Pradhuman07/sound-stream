import mongoose from "mongoose";
import config from "../config/config.js";

function connectDB(){
    mongoose.connect(config.MONGODB_URL)
    .then(()=>{
        console.log("connected to MongoDB");        
    })
    .catch((err)=>{
        console.log("error connecting MongoDB" , err);        
    })
}

export default connectDB;