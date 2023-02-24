"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./entities/user");
const question_1 = require("./entities/question");
const isDevelopment = process.env.NODE_ENV === 'development';
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    entities: [user_1.User, question_1.Question],
    synchronize: isDevelopment
});
