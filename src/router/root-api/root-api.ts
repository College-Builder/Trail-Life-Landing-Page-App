import express from 'express';
import GlobalModule from '../../global-module/global-module';
import Module from './module';

const rootApi = express.Router();

rootApi.post(
	'/send-email',
	Module.verifyPostBodyForEmailMiddleware,
	async (req, res) => {
		const { name, phone, email, message } = req.body;

		try {
			await Module.sendPj3TrailLifeCustomerEmail(name, email);
			await Module.sendPj3TrailLifeUaaEmail(name, phone, email, message);

			res.sendStatus(200);
		} catch (err: any) {
			GlobalModule.Middleware.handleMiddlewareError(res, err);
		}
	},
);

export default rootApi;
