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
exports.Handlers = void 0;
const constants_1 = require("./constants");
const i18n_class_1 = require("./locales/i18n.class");
const telegraf_1 = require("telegraf");
const bot_scenes_1 = require("./scenes/bot-scenes");
const keyboards_1 = require("./keyboards");
const bot_utils_1 = require("../utils/bot.utils");
class Handlers {
    constructor(bot, dbManager) {
        this.bot = bot;
        this.commands = [
            { command: constants_1.LanguageTextKeys.startCommand, description: 'Start bot' }
        ];
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setBotCommands();
            this.bot.use((0, telegraf_1.session)());
            this.scenes.init();
            this.bot.use(this.i18n);
            this.onStartCommand();
            this.onAskQuestion();
            this.onSettings();
            this.onNavigateBack();
            this.onAboutBot();
            yield this.bot.launch();
        });
        this.setBotCommands = () => this.bot.telegram.setMyCommands(this.commands);
        this.onStartCommand = () => {
            this.bot.start((ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield this.dbManager.saveUser((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from);
                yield ctx.replyWithHTML(ctx.translate(constants_1.LanguageTextKeys.helloText));
                return (0, bot_utils_1.backToMain)(ctx);
            }));
        };
        this.onAskQuestion = () => {
            this.bot.hears(i18n_class_1.I18nClass.textInLocales(constants_1.LanguageTextKeys.startChatBtnText), ctx => ctx.scene.enter(constants_1.chatGPTWizardId));
        };
        this.onSettings = () => {
            this.bot.hears(i18n_class_1.I18nClass.textInLocales(constants_1.LanguageTextKeys.settingsBtnText), (ctx) => {
                const settingsKeyboard = (0, keyboards_1.getSettingsKeyboard)(ctx);
                return ctx.reply(ctx.translate(constants_1.LanguageTextKeys.chooseSettingsText), settingsKeyboard);
            });
            this.bot.hears(i18n_class_1.I18nClass.textInLocales(constants_1.LanguageTextKeys.changeLanguageBtnText), ctx => ctx.scene.enter(constants_1.changeLangWizardId));
        };
        this.onNavigateBack = () => {
            this.bot.hears(i18n_class_1.I18nClass.textInLocales(constants_1.LanguageTextKeys.backBtnText), ctx => (0, bot_utils_1.backToMain)(ctx));
        };
        this.onAboutBot = () => {
            this.bot.hears(i18n_class_1.I18nClass.textInLocales(constants_1.LanguageTextKeys.aboutBotBtnText), ctx => ctx.reply(ctx.translate(constants_1.LanguageTextKeys.aboutBotText)));
        };
        if (dbManager)
            this.dbManager = dbManager;
        this.i18n = i18n_class_1.I18nClass.getInstance();
        this.scenes = new bot_scenes_1.BotScenes(bot, this.dbManager);
    }
}
exports.Handlers = Handlers;
