import * as dotenv from 'dotenv';
import express from 'express';
import router from './router/router';
import path from 'path';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(path.join(__dirname, '../views/root')));

app.use('/', router);

const port = 2003;

app.listen(port, () => {
	console.clear();
	console.log(`http://localhost:${port}`);
});
