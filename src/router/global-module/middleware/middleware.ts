import { Response } from 'express';
import FastLog from 'ks-fastlog';
import Mailer from '../mailer/mailer';

export default class Middleware {
	static async handleMiddlewareError(res: Response, err: any) {
		res.status(500).json({
			message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
		});

		FastLog.log(err, 'error');

		Mailer.sendErrorLogReportEmail(err).catch((_err) => {
			console.log(err, _err);
		});
	}
}
