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
exports.ChatGPTComposer = void 0;
const base_composer_1 = require("./base.composer");
const filters_1 = require("telegraf/filters");
const constants_1 = require("../../constants");
const keyboards_1 = require("../../keyboards");
const i18n_class_1 = require("../../locales/i18n.class");
const bot_utils_1 = require("../../../utils/bot.utils");
const question_1 = require("../../../database/entities/question");
const chatGPT_class_1 = require("../../../chatGPT.class");
class ChatGPTComposer extends base_composer_1.BaseComposer {
    constructor() {
        super(...arguments);
        this.startAsking = () => {
            return this.createComposer(composer => {
                composer.use(i18n_class_1.I18nClass.getInstance());
                composer.on((0, filters_1.message)('text'), (ctx) => __awaiter(this, void 0, void 0, function* () {
                    const backKeyboard = (0, keyboards_1.getBackKeyboard)(ctx);
                    yield ctx.reply(ctx.translate(constants_1.LanguageTextKeys.askQuestionText), backKeyboard);
                    return ctx.wizard.next();
                }));
            });
        };
        this.handleQuestion = () => {
            return this.createComposer(composer => {
                composer.use(i18n_class_1.I18nClass.getInstance());
                composer.on((0, filters_1.message)('text'), (ctx) => __awaiter(this, void 0, void 0, function* () {
                    const { text } = ctx.message;
                    if (this.checkBackText(text, ctx) || this.checkStartCommand(text)) {
                        yield (0, bot_utils_1.backToMain)(ctx);
                        return ctx.scene.leave();
                    }
                    const { message_id } = yield ctx.reply(ctx.translate(constants_1.LanguageTextKeys.pleaseWait));
                    const question = new question_1.Question();
                    question.text = text;
                    question.telegramUserId = ctx.from.id;
                    question.askedAt = new Date();
                    const chatGptApi = yield new chatGPT_class_1.ChatGPTClass().getApi();
                    const { text: apiResponseText } = yield chatGptApi.sendMessage(text, {
                        timeoutMs: 2 * 60 * 1000
                    });
                    question.answerText = apiResponseText;
                    yield ctx.deleteMessage(message_id);
                    yield ctx.reply(apiResponseText, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: ctx.translate(constants_1.LanguageTextKeys.shareText),
                                        switch_inline_query: apiResponseText
                                    }
                                ]
                            ]
                        }
                    });
                    question.answeredAt = new Date();
                    yield this.dbManager.saveQuestion(question);
                    yield ctx.reply(ctx.translate(constants_1.LanguageTextKeys.moreQuestionText));
                    return;
                }));
            });
        };
    }
}
exports.ChatGPTComposer = ChatGPTComposer;
