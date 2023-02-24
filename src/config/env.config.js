"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvConfig = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
function getEnvConfig() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const appRoot = (0, path_1.join)(__dirname, '../', '../');
    const enfFilePath = (0, path_1.join)(appRoot, isDevelopment ? '.development.env' : '.env');
    (0, dotenv_1.config)({ path: enfFilePath });
}
exports.getEnvConfig = getEnvConfig;
