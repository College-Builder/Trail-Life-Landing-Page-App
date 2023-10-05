"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_module_1 = __importDefault(require("../../global-module/global-module"));
class Module {
    static verifyName(name) {
        if (!name || name.length < 4 || name.length > 60) {
            global_module_1.default.Middleware.throwMiddlewareError(400, 'name', 'Por favor, forneça um nome válido.');
        }
        name = name.trim();
    }
    static verifyEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.length > 60 || !emailRegex.test(email)) {
            global_module_1.default.Middleware.throwMiddlewareError(400, 'email', 'Por favor, forneça um email válido.');
        }
    }
    static verifyPhone(phone) {
        if (!phone || phone.replace(/\D/g, '').length !== 13) {
            global_module_1.default.Middleware.throwMiddlewareError(400, 'phone', 'Por favor, forneça um número de telefone válido.');
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
exports.default = Module;
