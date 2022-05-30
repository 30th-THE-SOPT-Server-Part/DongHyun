//router index file
import { Router } from 'express';
import { body } from 'express-validator/check';
import { UserController } from '../controllers';

const router = Router();

router.post('/', UserController.createUser);
router.post('/signin', UserController.signInUser);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.findUserById);
router.delete('/:userId', UserController.deleteUser);

export default router