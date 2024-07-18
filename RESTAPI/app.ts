import fs from 'node:fs';
import { join } from 'node:path';

import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';

import connect_DB from "./dbConnection/connect_db";
import ErrorWithStatus from './types/error';
import { usersRouter } from './user/router.user';
import coursesRouter from './courses/router.courses';
import { checkAndVerifyToken } from './authentication/checkAndVerifyToken';
import { checkcounter } from './user/checkcounter';
const app = express();
connect_DB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    const accessLogStream = fs.createWriteStream(join(__dirname, 'access.log'), { flags: 'a' });
    app.use(morgan('combined', { stream: accessLogStream }));
} else {
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(cors());

app.use("/users",checkcounter, usersRouter);

app.use("/courses", checkAndVerifyToken, coursesRouter);

app.all("*", (req, res, next) => { throw new ErrorWithStatus("Route not found", 404); });
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorWithStatus) {
        res.status(error.status).send(error.message);
    } else if (error instanceof Error) {
        res.status(500).send(error.message);
    } else {
        res.status(500).send("An unknown error occured");
    }
});

app.listen(3000, () => console.log("Server is running at port 3000"))


