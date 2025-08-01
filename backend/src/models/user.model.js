import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
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