import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    }
})

const userModel = mongoose.model('User', userSchema);  // User -> collection name in MongoDB

export default userModel;