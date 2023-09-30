import express from 'express';

const root = express.Router();

root.get('/', (_, res) => {
	res.render('root');
});

export default root;
