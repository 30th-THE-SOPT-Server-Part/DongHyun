import { Router } from 'express';
import { body } from 'express-validator/check';
import { MovieController } from '../controllers';
import auth from '../middleware/auth';

const router = Router();

router.post('/', [
    body('title').notEmpty(),
    body('director').notEmpty()],MovieController.createMovie);

router.post('/:movieId/comment', [
    body('writer').notEmpty(),
    body('comment').notEmpty()], MovieController.addComent);

router.get('/:movieId', MovieController.getMovie);

router.put('/:movieId/comments/:commentId', [body('comment').notEmpty()], auth, MovieController.updateMovieComment);
export default router