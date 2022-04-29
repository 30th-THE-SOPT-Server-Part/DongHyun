import { Schema } from "express-validator";
import { UserCreateDto } from "./UserCreateDto";
import mongoose from "mongoose";

export interface UserResponseDto extends UserCreateDto {
    _id: mongoose.Schema.Types.ObjectId;
}