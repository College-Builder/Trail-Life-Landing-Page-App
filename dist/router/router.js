"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const root_1 = __importDefault(require("./root/root"));
const root_api_1 = __importDefault(require("./root-api/root-api"));
const router = express_1.default.Router();
router.use('/', root_1.default);
router.use('/api', (0, express_rate_limit_1.default)({
    windowMs: 24 * 60 * 60 * 1000,
    max: 2,
    handler: (_, res) => {
        res.status(429).json({
            message: 'Limite de envio de e-mails atingido. Por favor, tente novamente mais tarde.',
        });
    },
}));
router.use('/api', root_api_1.default);
exports.default = router;
