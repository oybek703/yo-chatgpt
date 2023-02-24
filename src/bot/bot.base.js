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
exports.BotBase = void 0;
require("colors");
const telegraf_1 = require("telegraf");
class BotBase {
    constructor() {
        this.token = process.env.BOT_TOKEN || '';
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.bot = new telegraf_1.Telegraf(this.token);
                this.bot.catch((err, ctx) => {
                    if (err instanceof Error)
                        console.log(`${err.message.red.underline.bold} \n ${err.stack}`);
                });
                console.log(`Bot started successfully!`.yellow.underline.bold);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(`Error while launching bot: ${e.message}`.red.underline.bold);
                }
            }
        });
    }
}
exports.BotBase = BotBase;
