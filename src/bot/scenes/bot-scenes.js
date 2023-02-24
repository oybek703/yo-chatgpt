"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotScenes = void 0;
const telegraf_1 = require("telegraf");
const change_lang_composer_1 = require("./composers/change-lang.composer");
const constants_1 = require("../constants");
const chatGPT_composer_1 = require("./composers/chatGPT.composer");
class BotScenes {
    constructor(bot, dbManger) {
        this.bot = bot;
        this.dbManger = dbManger;
        this.init = () => {
            this.stage = new telegraf_1.Scenes.Stage([this.changeLangScene(), this.chatGPTScene()]);
            this.bot.use(this.stage.middleware());
        };
        this.changeLangScene = () => {
            return new telegraf_1.Scenes.WizardScene(constants_1.changeLangWizardId, this.changeLangComposer.startSettings(), this.changeLangComposer.switchLang());
        };
        this.chatGPTScene = () => {
            return new telegraf_1.Scenes.WizardScene(constants_1.chatGPTWizardId, this.chatGPTComposer.startAsking(), this.chatGPTComposer.handleQuestion());
        };
        this.changeLangComposer = new change_lang_composer_1.ChangeLangComposer(dbManger);
        this.chatGPTComposer = new chatGPT_composer_1.ChatGPTComposer(dbManger);
    }
}
exports.BotScenes = BotScenes;
