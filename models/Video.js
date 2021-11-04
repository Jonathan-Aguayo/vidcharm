import mongoose from "mongoose";
import UserSChema from './User.js'
const VideoSchema = new mongoose.Schema({
    title: String,
    url: String,
    channel: UserSChema,
    datePosted: Date,
    posterUrl: String,
    views: Number,
})
