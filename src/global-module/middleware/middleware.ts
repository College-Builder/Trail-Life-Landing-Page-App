import { Response } from 'express';
import GlobalModule from '../global-module';

export default class Middleware {
	static throwMiddlewareError(
		status: number,
		label: string | null,
		message: string,
	) {
		throw {
			status,
			label,
			message,
			timestamp: new Date(),
		};
	}

	static handleMiddlewareError(res: Response, err: any) {
		console.error(err);

		res.status(500).json({
			message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
		});
	}
}
