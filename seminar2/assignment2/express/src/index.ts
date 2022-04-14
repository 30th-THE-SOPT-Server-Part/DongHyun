import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.use('/api', require('./api'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! My name is Dong');
});

app.listen('8080', () => {
    console.log(
        `
        ##################
            port: 8080
        ##################
        `
    );
});