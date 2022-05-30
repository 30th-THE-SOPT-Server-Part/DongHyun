import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import responseMessage from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import config from '../config';


export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(' ').reverse()[0];

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NULL_VALUE));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.body.user = (decoded as any).user;
        next();
    } catch (error: any) {
        console.log(error);

        if (error.name === 'TokenExpiredError') {
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVAILED_TOKEN));
        }
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}