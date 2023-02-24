"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nClass = void 0;
const i18n_1 = require("@grammyjs/i18n");
const path_1 = require("path");
class I18nClass {
}
exports.I18nClass = I18nClass;
_a = I18nClass;
I18nClass.textInLocales = (text) => {
    const locales = I18nClass.botI18N.locales;
    return locales.map(locale => I18nClass.botI18N.translate(locale, text));
};
I18nClass.getInstance = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const localesDir = (0, path_1.resolve)(__dirname, `${isDevelopment ? '../' : (0, path_1.join)(process.cwd(), '/src/bot/')}locales`);
    if (!_a.botI18N) {
        _a.botI18N = new i18n_1.I18n({
            defaultLocale: 'en',
            useSession: true,
            directory: localesDir,
            fluentBundleOptions: {
                useIsolating: false
            }
        });
    }
    return _a.botI18N;
};
