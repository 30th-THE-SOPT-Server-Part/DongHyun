import express, { Request, response, Response } from "express";
import statusCode from "../modules/statusCode";
import responseMessage from "../modules/responseMessage";
import util from "../modules/util";
import { ReviewCreateDto } from "../interfaces/review/ReviewCreateDto";
import { ReviewService } from "../services";

const { validationResult } = require('express-validator');

const createReview = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
    }
    const ReviewCreateDto: ReviewCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await ReviewService.createReview(movieId, ReviewCreateDto);

        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATE_REVIEW_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const getReviews = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    
    try {
        const data = await ReviewService.getReviews(movieId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createReview,
    getReviews
}

