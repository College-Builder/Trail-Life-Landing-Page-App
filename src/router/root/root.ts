import express from 'express';
import { execSync } from 'child_process';
import path from 'path';

const rootDirectory = execSync('pwd', { encoding: 'utf-8' }).trim();

const root = express.Router();

root.get('/', (_, res) => {
	res.sendFile(path.join(rootDirectory, 'views/root/index.html'));
});

export default root;
