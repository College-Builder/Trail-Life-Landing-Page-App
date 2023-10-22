import express from 'express';
import root from './root/root';
import rootApi from './root-api/root-api';

const router = express.Router();

router.use('/', root);

router.use('/api', rootApi);

export default router;
