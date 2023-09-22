import express from 'express';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export class Mailer {
	static async sendEmail(
		source: string,
		to: Array<string>,
		subject: string,
		content: string,
	) {
		const sesClient = new SESClient({ region: process.env.AWS_SES_REGION });

		const params = {
			Source: source,
			Destination: {
				ToAddresses: to,
			},
			Message: {
				Subject: {
					Data: subject,
				},
				Body: {
					Html: {
						Data: content,
					},
				},
			},
		};

		const sendEmailCommand = new SendEmailCommand(params);

		return await sesClient.send(sendEmailCommand);
	}
}

export class Module {
	private static verifyName(name: string) {
		if (!name || name.length < 4) {
			throw { message: 'Por favor, forneça um nome válido' };
		}

		name = name.trim();
	}

	private static verifyEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || !emailRegex.test(email)) {
			throw { message: 'Por favor, forneça um email válido' };
		}
	}

	private static verifyPhone(phone: string) {
		if (!phone || phone.replace(/\D/g, '').length !== 11) {
			throw { message: 'Por favor, forneça um número de telefone válido' };
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
}
