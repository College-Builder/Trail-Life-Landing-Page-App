import * as dotenv from 'dotenv';
import express from 'express';
import router from './router/router';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/trail-life', router);

const port = 2003;

app.listen(port, () => {
	console.clear();
	console.log(`http://localhost:${port}`);
});
