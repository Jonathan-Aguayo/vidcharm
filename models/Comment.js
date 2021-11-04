import { Email } from "@mui/icons-material";
import mongoose from "mongoose";

export default  UserSChema = new mongoose.Schema({
    datePosted: Date,
    body: String, 
    user: User,
    likes: Number
})