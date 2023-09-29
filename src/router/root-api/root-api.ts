import express from 'express';
import GlobalModule from '../global-module/global-module';
import Module from './module';

const rootApi = express.Router();

rootApi.post(
	'/send-email',
	Module.verifyPostBodyForEmailMiddleware,
	async (req, res) => {
		const { name, phone, email, message } = req.body;

		try {
			await GlobalModule.sendTemplateEmail(
				process.env.AWS_SES_SOURCE_EMAIL!,
				[email],
				'pj3--trail-life--customer-email',
				{ name: String(name + phone + email + message) },
			);

			await GlobalModule.sendTemplateEmail(
				process.env.AWS_SES_SOURCE_EMAIL!,
				process.env.AWS_SES_UAA_EMAIL!.split(',').map((item) => item.trim()),
				'pj3--trail-life--uaa-email',
				{ name: String(name + phone + email + message) },
			);

			res.sendStatus(200);
		} catch (err: any) {
			GlobalModule.handleMiddlewareError(res, err);
		}
	},
);

export default rootApi;
