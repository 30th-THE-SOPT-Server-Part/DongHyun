import express, { Request, Response, Router } from 'express';
import { request } from 'http';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        status: 200,
        message: '유저 블로그 조회 성공',
        address: 'https://velog.io/@donglee99'
    });
});

module.exports = router;