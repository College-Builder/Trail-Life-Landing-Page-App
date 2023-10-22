import express from 'express';
import GlobalModule from '../../global-module/global-module';

export default class Module {
	private static verifyName(name: string) {
		if (!name || name.length < 4 || name.length > 60) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'name',
				'Por favor, forneça um nome válido.',
			);
		}

		name = name.trim();
	}

	private static verifyEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || email.length > 60 || !emailRegex.test(email)) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'email',
				'Por favor, forneça um email válido.',
			);
		}
	}

	private static verifyPhone(phone: string) {
		if (!phone || phone.replace(/\D/g, '').length !== 13) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'phone',
				'Por favor, forneça um número de telefone válido.',
			);
		}
	}

	static verifyPostBodyForEmailMiddleware(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		const { name, email, phone } = req.body;

		try {
			Module.verifyName(name);
			Module.verifyEmail(email);
			Module.verifyPhone(phone);
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}

		return next();
	}

	static async sendPj3TrailLifeCustomerEmail(name: string, email: string) {
		await GlobalModule.Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			[email],
			process.env.AWS_SES_CLIENT_EMAIL_TEMPLATE!,
			{ name: 'This is the customer email' },
		);
	}

	static async sendPj3TrailLifeUaaEmail(
		name: string,
		phone: string,
		email: string,
		message: string,
	) {
		await GlobalModule.Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			process.env.AWS_SES_UAA_EMAIL!.split(',').map((item) => item.trim()),
			process.env.AWS_SES_UAA_EMAIL_TEMPLATE!,
			{ name: 'This is the uaa email' },
		);
	}
}
