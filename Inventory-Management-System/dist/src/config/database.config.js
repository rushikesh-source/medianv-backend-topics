"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    entities: [user_entity_1.User],
    synchronize: false,
};
//# sourceMappingURL=database.config.js.map