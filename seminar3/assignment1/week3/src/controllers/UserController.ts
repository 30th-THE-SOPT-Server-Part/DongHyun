import express, { Request, Response } from "express";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import UserService from "../services/UserService";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";

/**
 * 
 * @route Post /user 
 * @desc Create User
 * @access Public 
 */
const createUser = async (req: Request, res: Response) => {
    const UserCreateDto: UserCreateDto = req.body; // UserCreate Dto = req.body 받아옴
    
    try {
        const data: PostBaseResponseDto = await UserService.createUser(UserCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        //서버 내부 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * 
 * @route Put /user/userId
 * @desc Update User
 * @access Public 
 */
const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        await UserService.updateUser(userId, userUpdateDto);
        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        //서버 내부 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 * 
 * @route Get /user/:userId
 * @desc Get user
 * @access Public 
 */
const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

    } catch (error) {
        console.log(error);
        //서버 내부 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await UserService.findUserById(userId);
        res.status(statusCode.NO_CONTENT);
    } catch (error) {
        console.log(error);
        //서버 내부 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser
}