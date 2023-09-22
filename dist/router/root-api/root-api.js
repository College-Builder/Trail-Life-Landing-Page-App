"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const module_1 = require("./module");
const ks_fastlog_1 = __importDefault(require("ks-fastlog"));
const rootDirectory = (0, child_process_1.execSync)('pwd', { encoding: 'utf-8' }).trim();
const clientEmailContent = fs_1.default.readFileSync(path_1.default.join(rootDirectory, 'views/client-email/index.html'), 'utf8');
const rootApi = express_1.default.Router();
rootApi.post('/mail', module_1.Module.verifyPostBodyForEmailMiddleware, async (req, res) => {
    const { name, phone, email, message } = req.body;
    try {
        await module_1.Mailer.sendEmail(process.env.AWS_SES_SOURCE_EMAIL, [email], 'Trail Life: Vimos que você está interessado em nossos serviços.', clientEmailContent);
    }
    catch (err) {
        ks_fastlog_1.default.log(err.message, 'error');
        res.status(500).json({
            message: 'Oops, algo deu errado. Por favor, tente novamente mais tarde.',
        });
        return;
    }
    res.sendStatus(200);
});
exports.default = rootApi;
