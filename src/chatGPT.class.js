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
exports.ChatGPTClass = void 0;
class ChatGPTClass {
    constructor() {
        this.getApi = () => __awaiter(this, void 0, void 0, function* () {
            if (this.instance)
                return this.instance;
            const apiKey = process.env.CHATGPT_API_KEY;
            const { ChatGPTAPI } = yield eval("import('chatgpt')");
            if (!apiKey)
                throw new Error('ChatGPT API key is not provided or invalid! ');
            return new ChatGPTAPI({ apiKey });
        });
    }
}
exports.ChatGPTClass = ChatGPTClass;
