"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = {
    QUEUE_NAME: process.env.QUEUE_NAME,
    SERVER_PORT: process.env.SERVER_PORT,
    PORT: process.env.PORT,
    SERVER_PORT_TCP: process.env.SERVER_PORT_TCP,
    MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,
    MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
    ACCESS_TOKEN_EXPIRATION_TIME: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    SECRET: process.env.SECRET,
    REFRESH_TOKEN_EXPIRATION_TIME: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    INITIALIZATION_VECTOR: process.env.INITIALIZATION_VECTOR,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    API_VERSION: process.env.API_VERSION,
    AWS_EMAIL_SOURCE: process.env.AWS_EMAIL_SOURCE,
};
//# sourceMappingURL=development.config.js.map