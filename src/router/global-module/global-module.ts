import { Response } from 'express';
import FastLog from 'ks-fastlog';
import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export default class GlobalModule {
	static async sendTemplateEmail(
		Source: string,
		ToAddresses: Array<string>,
		Template: string,
		TemplateData: object,
	) {
		const sesClient = new SESClient({
			region: process.env.AWS_SES_REGION,
		});

		const params = {
			Source,
			Destination: {
				ToAddresses,
			},
			Template,
			TemplateData: JSON.stringify(TemplateData),
		};

		const sendTemplatedEmailCommand = new SendTemplatedEmailCommand(params);

		return await sesClient.send(sendTemplatedEmailCommand);
	}

	static async handleMiddlewareError(res: Response, err: any) {
		res.status(500).json({
			message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
		});

		FastLog.log(err, 'error');

		try {
			await GlobalModule.sendTemplateEmail(
				process.env.AWS_SES_SOURCE_EMAIL!,
				process.env.AWS_SES_UAA_EMAIL!.split(',').map((item) => item.trim()),
				'college-builder--error-log-report-email',
				{
					'project-name': process.env.PROJECT_NAME,
					'project-hostname': process.env.PROJECT_HOSTNAME,
					'error-log': JSON.stringify(err, null, 2),
					'company-logo':
						'https://i.pinimg.com/originals/50/bd/c9/50bdc91f32650905e776d6751478928c.png',
				},
			);
		} catch (err) {
			console.log(err);
		}
	}
}
