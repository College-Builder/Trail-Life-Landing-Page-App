import express from 'express';
import rateLimit from 'express-rate-limit';
import root from './root/root';
import rootApi from './root-api/root-api';

const router = express.Router();

router.use('/', root);

router.use(
	'/api',
	rateLimit({
		windowMs: 24 * 60 * 60 * 1000,
		max: 10,
		handler: (_, res) => {
			res.status(429).json({
				message:
					'Limite de envio de emails atingido. Por favor, tente novamente mais tarde.',
			});
		},
	}),
);
router.use('/api', rootApi);

export default router;
