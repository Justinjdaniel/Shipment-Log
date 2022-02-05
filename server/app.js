import express, { json, urlencoded, static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import apiRouter from './routes/index';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(static(join(__dirname, 'public')));

app.use('/api', apiRouter);

export default app;
