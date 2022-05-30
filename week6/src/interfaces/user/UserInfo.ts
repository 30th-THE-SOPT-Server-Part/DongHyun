import mongoose from "mongoose";
import { SchoolInfo } from "../school/SchoolInfo";

export interface UserInfo {
    name : string;
    phone: string;
    email: string;
    age: string;
    password: string;
    school: SchoolInfo;
}