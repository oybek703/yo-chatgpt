"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_manager_1 = require("./database/database-manager");
const env_config_1 = require("./config/env.config");
const bot_base_1 = require("./bot/bot.base");
const handlers_1 = require("./bot/handlers");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, env_config_1.getEnvConfig)();
        const dbManager = new database_manager_1.DatabaseManager();
        yield dbManager.init();
        const botBase = new bot_base_1.BotBase();
        yield botBase.start();
        const handlers = new handlers_1.Handlers(botBase.bot, dbManager);
        yield handlers.init();
    });
}
;
(() => __awaiter(void 0, void 0, void 0, function* () { return yield start(); }))();
