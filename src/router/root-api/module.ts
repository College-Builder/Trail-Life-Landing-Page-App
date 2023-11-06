import express from 'express';
import GlobalModule from '../../global-module/global-module';

class PrivateModule {
	static verifyName(name: string) {
		if (!name || name.length < 4 || name.length > 60) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'name',
				'Por favor, forneça um nome válido.',
			);
		}

		name = name.trim();
	}

	static verifyEmail(email: string) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || email.length > 60 || !emailRegex.test(email)) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'email',
				'Por favor, forneça um email válido.',
			);
		}
	}

	static verifyPhone(phone: string) {
		if (!phone || isNaN(Number(phone)) || phone.length !== 13) {
			GlobalModule.Middleware.throwMiddlewareError(
				400,
				'phone',
				'Por favor, forneça um número de telefone válido.',
			);
		}
	}
}

export default class Module {
	static verifyPostBodyForEmailMiddleware(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		const { name, email, phone } = req.body;

		try {
			PrivateModule.verifyName(name);
			PrivateModule.verifyPhone(phone);
			PrivateModule.verifyEmail(email);

			return next();
		} catch (err: any) {
			GlobalModule.Middleware.handleMiddlewareError(res, err);
		}
	}

	static async sendTrailLifeCustomerEmail(name: string, email: string) {
		await GlobalModule.Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			[email],
			process.env.AWS_SES_CLIENT_EMAIL_TEMPLATE!,
			{
				title: 'Recebemos seu email',
				name,
				message:
					'Obrigado por entrar em contato. Em breve um de nossos associados entrará em contato com você. Caso tenha mais alguma dúvida, sinta-se à vontade para entrar em contato pelos meios abaixo.',
			},
		);
	}

	static async sendTrailLifeUaaEmail(
		name: string,
		phone: string,
		email: string,
		message: string,
	) {
		await GlobalModule.Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			process.env.AWS_SES_UAA_EMAIL!.split(',').map((item) => item.trim()),
			process.env.AWS_SES_UAA_EMAIL_TEMPLATE!,
			{
				title: 'Novo cliente pedindo atendimento',
				name: 'Setor de Atendimento ao Cliente',
				message: `Recebemos uma nova solicitação de atendimento pelo site da Trail Life. O nome do novo cliente é ${name}, e seus contatos são: telefone (${phone}) e e-mail (${email}). A seguir, está a mensagem recebida de ${name}: "${message}"`,
			},
		);
	}
}
