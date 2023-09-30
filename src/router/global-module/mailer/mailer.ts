import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export default class Mailer {
	private static async sendTemplateEmail(
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

	static async sendPj3TrailLifeCustomerEmail(name: string, email: string) {
		await Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			[email],
			'pj3--trail-life--customer-email',
			{ name: 'This is the customer email' },
		);
	}

	static async sendPj3TrailLifeUaaEmail(
		name: string,
		phone: string,
		email: string,
		message: string,
	) {
		await Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			process.env.AWS_SES_UAA_EMAIL!.split(',').map((item) => item.trim()),
			'pj3--trail-life--uaa-email',
			{ name: 'This is the uaa email' },
		);
	}

	static async sendErrorLogReportEmail(err: any) {
		await Mailer.sendTemplateEmail(
			process.env.AWS_SES_SOURCE_EMAIL!,
			process.env.AWS_SES_IT_EMAIL!.split(',').map((item) => item.trim()),
			'college-builder--error-log-report-email',
			{
				'project-name': process.env.PROJECT_NAME,
				'project-hostname': process.env.PROJECT_HOSTNAME,
				'project-url': `https://${process.env.PROJECT_HOSTNAME}/${process.env.PROJECT_ENDPOINT}`,
				'error-log': JSON.stringify(err, null, 2),
				'company-logo': process.env.COMPANY_LOGO,
			},
		);
	}
}
