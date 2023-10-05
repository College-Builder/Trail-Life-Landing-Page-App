"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const global_module_1 = __importDefault(require("../../global-module/global-module"));
const module_1 = __importDefault(require("./module"));
const rootApi = express_1.default.Router();
rootApi.post('/send-email', module_1.default.verifyPostBodyForEmailMiddleware, async (req, res) => {
    const { name, phone, email, message } = req.body;
    try {
        await global_module_1.default.Mailer.sendPj3TrailLifeCustomerEmail(name, email);
        await global_module_1.default.Mailer.sendPj3TrailLifeUaaEmail(name, phone, email, message);
        res.sendStatus(200);
    }
    catch (err) {
        global_module_1.default.Middleware.handleMiddlewareError(res, err);
    }
});
exports.default = rootApi;
