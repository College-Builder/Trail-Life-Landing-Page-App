import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

export default class Mailer {
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
}
