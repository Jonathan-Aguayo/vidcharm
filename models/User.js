import mongoose from "mongoose";

export default  UserSChema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    channelName: String, 
    created: Date, 
    email: String,
    profilepicurl: String,

})