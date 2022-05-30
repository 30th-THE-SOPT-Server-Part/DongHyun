import { validationResult } from "express-validator"
import express, { Request, Response } from 'express';
import statusCode from "../modules/statusCode";
import responseMessage from "../modules/responseMessage";
import util from "../modules/util";
import { MovieCreateDto } from "../interfaces/movie/MovieCreateDto";
import MovieService from "../services/MovieService";
import { MovieCommentCreateDto } from "../interfaces/movie/MovieCommentCreateDto";
import { MovieCommentUpdateDto } from "../interfaces/movie/CommentUpdateDto";


const createMovie = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
    }

    const movieCreateDto: MovieCreateDto = req.body;

    try {
        const data = await MovieService.createMovie(movieCreateDto);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATE_MOVIE_SUCCESS));
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const addComent = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;
    try {
        const data = await MovieService.addMovieComment(movieId, movieCommentCreateDto);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATE_MOVIE_SUCCESS, data));
    
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }

}

const getMovie = async (req :Request, res: Response) => {
    const { movieId } = req.params; 
    
    try {
        const data = await MovieService.getMovie(movieId);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MOVIE_SUCCESS, data));
    
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST));
    }
    const commentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;

    try {
        const data = MovieService.updateMovieComment(movieId, commentId, req.body.user.id, commentUpdateDto);
        if(!data) res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.NOT_FOUND));
        res.status(statusCode.NOT_FOUND).send(util.success(statusCode.NO_CONTENT, responseMessage.UPDATE_COMMENT_SUCCESS, data));
    
    } catch (error) {
        console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

export default {
    createMovie,
    addComent,
    getMovie,
    updateMovieComment
}