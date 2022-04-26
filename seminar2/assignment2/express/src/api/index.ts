import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/user', require('./user'));
router.use('/signup', require('./signup'));
router.use('/like', require('./like'));
router.use('/blog', require('./blog'));

module.exports = router;