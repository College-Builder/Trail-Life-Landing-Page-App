import { Response } from 'express';
import GlobalModule from '../global-module';
import FastLog from 'ks-fastlog';

export default class Middleware {
	static async handleMiddlewareError(res: Response, err: any) {
		res.status(500).json({
			message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
		});

		FastLog.log(err, 'error');

		GlobalModule.Mailer.sendErrorLogReportEmail(err).catch((_err) => {
			console.log(err, _err);
		});
	}
}
