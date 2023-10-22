import { Response } from 'express';

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
		if (err.label && err.status && err.status !== 500) {
			return res.status(err.status).json(err);
		}

		console.error(err);

		res.status(500).json({
			message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
		});
	}
}
