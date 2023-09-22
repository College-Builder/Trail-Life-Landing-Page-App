"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = exports.Mailer = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
class Mailer {
    static async sendEmail(source, to, subject, content) {
        const sesClient = new client_ses_1.SESClient({ region: process.env.AWS_SES_REGION });
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
        const sendEmailCommand = new client_ses_1.SendEmailCommand(params);
        return await sesClient.send(sendEmailCommand);
    }
}
exports.Mailer = Mailer;
class Module {
    static verifyName(name) {
        if (!name || name.length < 4) {
            throw { message: 'Por favor, forneça um nome válido' };
        }
        name = name.trim();
    }
    static verifyEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw { message: 'Por favor, forneça um email válido' };
        }
    }
    static verifyPhone(phone) {
        if (!phone || phone.replace(/\D/g, '').length !== 11) {
            throw { message: 'Por favor, forneça um número de telefone válido' };
        }
    }
    static verifyPostBodyForEmailMiddleware(req, res, next) {
        const { name, email, phone } = req.body;
        try {
            Module.verifyName(name);
            Module.verifyEmail(email);
            Module.verifyPhone(phone);
        }
        catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
        return next();
    }
}
exports.Module = Module;
