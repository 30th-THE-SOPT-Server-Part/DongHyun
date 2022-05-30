import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    school: {
        name: { type: String },
        major: { type: String }
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);