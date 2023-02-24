"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComposer = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../../constants");
class BaseComposer {
    constructor(dbManager) {
        this.dbManager = dbManager;
        this.createComposer = (handler) => {
            const composer = new telegraf_1.Composer();
            handler(composer);
            return composer;
        };
        this.checkBackText = (text, ctx) => {
            return text === ctx.translate(constants_1.LanguageTextKeys.backBtnText);
        };
        this.checkStartCommand = (text) => {
            return text === constants_1.LanguageTextKeys.startCommand;
        };
    }
}
exports.BaseComposer = BaseComposer;
