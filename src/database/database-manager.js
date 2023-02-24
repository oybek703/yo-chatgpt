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
exports.DatabaseManager = void 0;
require("colors");
const connection_1 = require("./connection");
const user_1 = require("./entities/user");
const question_1 = require("./entities/question");
class DatabaseManager {
    constructor() {
        this.db = connection_1.dataSource;
        this.userRepository = this.db.getRepository(user_1.User);
        this.questionRepository = this.db.getRepository(question_1.Question);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.initialize();
                console.log(`Successfully connected to database!`.blue.underline);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(`Error while connecting to database: ${e.message}`.red.underline);
                }
            }
        });
    }
    // TODO fix any type later
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findOne({ where: { telegramUserId: user.id } });
            if (!existingUser) {
                const newUser = new user_1.User();
                newUser.userName = user.username;
                newUser.telegramUserId = user.id;
                newUser.lastName = user.last_name;
                newUser.firstName = user.first_name;
                yield this.userRepository.save(newUser);
            }
            else {
                if (existingUser.userName !== user.username) {
                    existingUser.userName = user.username;
                    yield this.userRepository.save(existingUser);
                }
            }
        });
    }
    getUserByTelegramId(telegramUserId) {
        return this.userRepository.findOneBy({ telegramUserId });
    }
    saveQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuestion = new question_1.Question();
            newQuestion.text = question.text;
            newQuestion.telegramUserId = question.telegramUserId;
            newQuestion.answerText = question.answerText;
            newQuestion.askedAt = question.askedAt;
            newQuestion.answeredAt = question.answeredAt;
            yield this.questionRepository.save(newQuestion);
        });
    }
}
exports.DatabaseManager = DatabaseManager;
