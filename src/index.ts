import express from 'express';
import serverless from 'serverless-http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as dotenv from 'dotenv';
import router from './router/router';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*/home-page', router);

app.get("*", (req, res, next) => {
      createProxyMiddleware({
            target: 'https://collegebuilder.easyvirtual.net/404',
            changeOrigin: true,
            secure: false, 
      })(req, res, next);
});

export const handler = serverless(app);
