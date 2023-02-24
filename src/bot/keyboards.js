"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackKeyboard = exports.getLanguagesKeyboard = exports.getSettingsKeyboard = exports.getMainKeyboard = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("./constants");
const getMainKeyboard = (ctx) => telegraf_1.Markup.keyboard([
    [ctx.translate(constants_1.LanguageTextKeys.startChatBtnText)],
    [
        ctx.translate(constants_1.LanguageTextKeys.aboutBotBtnText),
        ctx.translate(constants_1.LanguageTextKeys.settingsBtnText)
    ]
]).resize();
exports.getMainKeyboard = getMainKeyboard;
const getSettingsKeyboard = (ctx) => telegraf_1.Markup.keyboard([
    [ctx.translate(constants_1.LanguageTextKeys.changeLanguageBtnText)],
    [ctx.translate(constants_1.LanguageTextKeys.backBtnText)]
]).resize();
exports.getSettingsKeyboard = getSettingsKeyboard;
const getLanguagesKeyboard = (ctx) => telegraf_1.Markup.keyboard([
    [ctx.translate(constants_1.LanguageTextKeys.enLangBtnText), ctx.translate(constants_1.LanguageTextKeys.ruLangBtnText)],
    [ctx.translate(constants_1.LanguageTextKeys.backBtnText)]
]).resize();
exports.getLanguagesKeyboard = getLanguagesKeyboard;
const getBackKeyboard = (ctx) => telegraf_1.Markup.keyboard([[ctx.translate(constants_1.LanguageTextKeys.backBtnText)]]).resize();
exports.getBackKeyboard = getBackKeyboard;
// export const getShareKeyboard = (ctx: BotContext) =>
//   Markup.inlineKeyboard([{ text: ctx.translate(LanguageTextKeys.shareText), switch_inline_query: '' }]).resize()
