import express from 'express';
import serverless from 'serverless-http';
import * as dotenv from 'dotenv';
import router from './router/router';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);

export const handler = serverless(app);

/*
const port = 2003;

app.listen(port, () => {
	console.clear();
	console.log(`http://localhost:${port}`);
});
*/
