import mongoose from "mongoose";
import { BlogInfo } from "../interfaces/Blog/BlogInfo";

const BlogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model<BlogInfo & mongoose.Document>("Blog", BlogSchema);