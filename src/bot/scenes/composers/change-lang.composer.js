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
exports.ChangeLangComposer = void 0;
const base_composer_1 = require("./base.composer");
const filters_1 = require("telegraf/filters");
const constants_1 = require("../../constants");
const keyboards_1 = require("../../keyboards");
const i18n_class_1 = require("../../locales/i18n.class");
const bot_utils_1 = require("../../../utils/bot.utils");
class ChangeLangComposer extends base_composer_1.BaseComposer {
    constructor() {
        super(...arguments);
        this.showLanguagesKeyboard = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const languagesKeyboard = (0, keyboards_1.getLanguagesKeyboard)(ctx);
            yield ctx.reply(ctx.translate(constants_1.LanguageTextKeys.chooseLanguageText), languagesKeyboard);
        });
        this.startSettings = () => {
            return this.createComposer(composer => {
                composer.use(i18n_class_1.I18nClass.getInstance());
                composer.on((0, filters_1.message)('text'), (ctx) => __awaiter(this, void 0, void 0, function* () {
                    yield this.showLanguagesKeyboard(ctx);
                    return ctx.wizard.next();
                }));
            });
        };
        this.switchLang = () => {
            return this.createComposer(composer => {
                composer.use(i18n_class_1.I18nClass.getInstance());
                composer.on((0, filters_1.message)('text'), (ctx) => __awaiter(this, void 0, void 0, function* () {
                    const { text } = ctx.message;
                    if (this.checkStartCommand(text)) {
                        yield (0, bot_utils_1.backToMain)(ctx);
                        return ctx.scene.leave();
                    }
                    if (this.checkBackText(text, ctx)) {
                        yield this.showLanguagesKeyboard(ctx);
                        return;
                    }
                    const ruText = ctx.translate(constants_1.LanguageTextKeys.ruLangBtnText);
                    const enText = ctx.translate(constants_1.LanguageTextKeys.enLangBtnText);
                    const existingLanguages = [ruText, enText];
                    if (existingLanguages.includes(text)) {
                        let newLang = yield ctx.i18n.getLocale();
                        switch (text) {
                            case ruText:
                                newLang = 'ru';
                                break;
                            case enText:
                                newLang = 'en';
                                break;
                        }
                        yield ctx.i18n.setLocale(newLang);
                        yield (0, bot_utils_1.backToMain)(ctx);
                        return ctx.scene.leave();
                    }
                    return ctx.reply(ctx.translate(constants_1.LanguageTextKeys.invalidLangWarn));
                }));
            });
        };
    }
}
exports.ChangeLangComposer = ChangeLangComposer;
