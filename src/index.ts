import express from 'express';
import serverless from 'serverless-http';
import * as dotenv from 'dotenv';
import router from './router/router';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*/home-page', router);

export const handler = serverless(app);
