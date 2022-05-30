import { UserCreateDto } from "../interfaces/user/UserCreateDto"
import User from "../models/User"
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import bcrypt from 'bcryptjs';
import { UserSignInDto } from "../interfaces/user/UserSignInDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";

const createUser = async (userCreateDto: UserCreateDto) => {
    try {
        const existUser = await User.findOne({
            email: userCreateDto.email
        });

        if (existUser) {
            return null
        }
        const user = new User(userCreateDto);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(userCreateDto.password, salt);

        await user.save();

        const data = {
            _id: user._id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const signInUser = async (userSignInDto: UserSignInDto): Promise<PostBaseResponseDto | null | number> => {
    try {
        const user = await User.findOne({
            email: userSignInDto.email
        });

        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(user.password, userSignInDto.password);
        if (!isMatch) return 401;
        const data = {
            _id: user._id
        }
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}  

const updateUser = async (userId: string , userUpdateDto: UserUpdateDto) => {
    try {
        const updateUser = {
            name: userUpdateDto.name,
            phone: userUpdateDto.phone,
            email: userUpdateDto.email,
            age: userUpdateDto.age,
            school: userUpdateDto.school
        }

        await User.findByIdAndUpdate(userId, updateUser);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findUserById = async (userId: string) => {
    try {
        const data: UserResponseDto | null = await User.findById(userId);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (userId: string) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
}