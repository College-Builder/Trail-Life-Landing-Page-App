"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const rootDirectory = (0, child_process_1.execSync)('pwd', { encoding: 'utf-8' }).trim();
const root = express_1.default.Router();
root.get('/', (_, res) => {
    res.sendFile(path_1.default.join(rootDirectory, 'views/root/index.html'));
});
exports.default = root;
