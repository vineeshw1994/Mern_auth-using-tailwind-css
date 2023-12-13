import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjbeLa0Xo8yTsn-wz0E7a5xdCNwcrYSlWZCw',
    }
},{timestamps:true})

const User = mongoose.model("User", userSchema);

export default User; 