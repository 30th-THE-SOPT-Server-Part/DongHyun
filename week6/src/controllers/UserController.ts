import express, { Request, Response} from 'express';
import util from "../modules/util";
import statusCode from "../modules/statusCode";
import responseMessage from "../modules/responseMessage";
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import { UserService } from '../services';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import getToken from '../modules/jwtHandler';
import { validationResult } from 'express-validator';
import { UserSignInDto } from '../interfaces/user/UserSignInDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';

const createUser = async (req: Request, res: Response) => {
    const userCreateDto: UserCreateDto = req.body;
    
    try {
        const result = await UserService.createUser(userCreateDto);
        if (!result) {
            return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, responseMessage.DUPLICATED));
        }

        const accessToken = getToken(result._id);

        const data = {
            _id: result._id,
            accessToken
        }

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATED_USER_SUCCESS, data));

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const signInUser = async (req: Request, res: Response) => {
    const error = validationResult(req);

    if (error) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
    }

    const userSignInDto: UserSignInDto = req.body;

    try {
        const result = await UserService.signInUser(userSignInDto);

        if (!result) {
            return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
        } else if (result === 401) {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVAILED_PASSWORD))
        }

        const accessToken = getToken((result as PostBaseResponseDto)._id);
        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }

}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userUpdateDto: UserUpdateDto = req.body;
    const { userId } = req.params;

    try {
        await UserService.updateUser(userId , userUpdateDto);

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const findUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const data: UserResponseDto | null = await UserService.findUserById(userId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        await UserService.deleteUser(userId);
        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser
}