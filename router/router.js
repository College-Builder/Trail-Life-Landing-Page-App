"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const root_1 = __importDefault(require("./root/root"));
const root_api_1 = __importDefault(require("./root-api/root-api"));
const router = express_1.default.Router();
router.use('/', root_1.default);
router.use('/api', root_api_1.default);
exports.default = router;
